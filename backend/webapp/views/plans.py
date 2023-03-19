from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import json
from datetime import datetime
from flask import send_file
from webapp.helpers.notification import create_notification

collection = db.plans


@app.route('/plans/list', methods=['GET'])
@jwt_required()
def list_plans():

    pipeline = [
        {
            '$lookup': {
                'from': 'projects',
                'localField': 'project',
                'foreignField': '_id',
                'as': 'projectInfo'
            }
        },
        {
            '$unwind': '$projectInfo'
        },
        {
            '$project': {

                'projectName': '$projectInfo.name',
                'project': 1,
                'planName': 1,
                'startDate': 1,
                'endDate': 1,
                '_id': 1,
                'status': 1
            }
        },
        {
            '$sort': {
                'startDate': -1
            }
        }
    ]
    params = request.args.to_dict()
    if params:
        pipeline = [
            {
                '$match': params
            }
        ]+pipeline
    plans = list(collection.aggregate(pipeline))
    for i in plans:
        i['id'] = str(i['_id'])
        i.pop('_id')
        i['project'] = str(i['project'])

    return {'plans': plans}, 200


@app.route('/plans/create', methods=['POST'])
@jwt_required()
def create_plan():
    data = request.get_json()
    if not data['project']:
        return {'message': 'project is required'}, 400
    data['status'] = "0"
    data['created_at'] = datetime.now()
    data['updated_at'] = datetime.now()
    data['created_by'] = ObjectId(get_jwt_identity())
    data['project'] = ObjectId(data['project'])
    plan = collection.insert_one(data)

    return {'plan': str(plan.inserted_id)}, 200


@app.route('/plans/update', methods=['POST'])
@jwt_required()
def update_plan():
    data = request.get_json()

    if not data['id']:
        return {'message': 'id is required'}, 400
    data['updated_at'] = datetime.now()
    data['project'] = ObjectId(data['project'])
    collection.update_one({'_id': ObjectId(data['id'])}, {'$set': data})
    return {'message': 'plan updated'}, 200


@app.route('/plans/delete', methods=['POST'])
@jwt_required()
def delete_plan():
    data = request.get_json()
    if not data['id']:
        return {'message': 'id is required'}, 400
    collection.delete_one({'_id': ObjectId(data['id'])})
    return {'message': 'plan deleted'}, 200


@app.route('/plan/status/<value>', methods=['POST'])
@jwt_required()
def set_plan_status(value):
    data = request.get_json()

    if not data['id']:
        return {'message': 'id is required'}, 400
    if (value == '1'):
        check_if_plan_started = collection.find_one({
            'project': ObjectId(data['projectId']), 'status': "1",
            'endDate': {
                '$gt': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
            }
        })

        if check_if_plan_started:
            return {'message': 'Plan has already started cannot have two plans running simulataneously'}, 400
        check_startDate = collection.find_one({
            '_id': ObjectId(data['id']),
            'startDate': {
                '$lte': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
            }
        })
        if not check_startDate:
            return {'message': 'Plan cannot be started before of its  startDate'}, 400
        tasks = db.tasks.find({
            'plan': ObjectId(data['id'])
        }, {'_id': 1})
        projects = db.projects.find_one({
            "_id": check_startDate['project']
        })
        tasks = [ObjectId(i['_id']) for i in tasks if ObjectId(
            i['_id']) not in projects['tasks']['toDo']]
        projects['tasks']['toDo'] = tasks+projects['tasks']['toDo']
        db.projects.update_one({
            '_id': projects['_id'],
        }, {
            '$set': {
                'taks': projects['tasks']
            }
        })
    collection.update_one({'_id': ObjectId(data['id'])}, {
                          '$set': {'status': value}})
    return {'message': 'plan status updated'}, 200
