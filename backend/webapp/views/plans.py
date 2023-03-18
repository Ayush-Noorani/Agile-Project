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

    ]
    plans = list(collection.find())
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
    data['status'] = 0
    data['created_at'] = datetime.now()
    data['updated_at'] = datetime.now()
    date['created_by'] = ObjectId(get_jwt_identity())
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
    collection.update_one({'_id': ObjectId(data['id'])}, {
                          '$set': {'status': value}})
    return {'message': 'plan status updated'}, 200
