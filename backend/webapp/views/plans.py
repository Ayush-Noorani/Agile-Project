from webapp.helpers.common import decode_base64
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
    status = request.args.get('status')
    id = request.args.get('id')
    print(id)
    pipeline = [
        {'$match': {
            '$and': [

                {'project': ObjectId(id)},

                {'status': {
                    '$ne': '3'
                } if status != 'inactive' else '3', }]}
         },
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
    if 'status' in params.keys() and params['status'] != 'active':
        pipeline[0]['$match']['$and'].append({
            'status': '3'
        })
    print(pipeline)
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
    check_plan = db.plans.find_one(
        {'_id': ObjectId(data['id'])}, {'status': 1, '_id': 1, 'project': 1})
    if check_plan['status'] != '3':
        if (value == '1'):
            check_if_plan_started = collection.find_one({
                '_id': {'$ne': ObjectId(data['id'])},
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
            projects['tasks']['toDo'] = tasks
            db.projects.update_one({
                '_id': projects['_id'],
            }, {
                '$set': {
                    'tasks': projects['tasks']
                }
            })
        if value == '3':
            project = db.projects.find_one(
                {'_id': ObjectId(check_plan['project'])}, {'tasks': 1, 'columns': 1})
            db.plans.update_one({'_id': ObjectId(data['id'])}, {
                '$set': {'status': value, 'tasks': project['tasks'],
                         'columns': project['columns']}})
            for k, v in project['tasks'].items():
                project['tasks'][k] = []
            print(project['tasks'])
            db.projects.update_one({'_id': ObjectId(check_plan['project'])}, {
                '$set': {'tasks': project['tasks']}
            })

        else:
            collection.update_one({'_id': ObjectId(data['id'])}, {
                '$set': {'status': value}})
        return {'message': 'plan status updated'}, 200
    return {'message': 'plan already marked as completed cannot change status now.'}, 200


@app.route('/plan/retroSpection/<plan_id>')
@jwt_required()
def retro_spection(plan_id):

    plan = list(collection.aggregate([
        {
            '$match':     {
                '_id': ObjectId(plan_id)
            }
        },
        {"$lookup": {
            "from": "projects",
            "localField": "project",
            "foreignField": "_id",
            "as": "project"
        }},


    ]))[0]
    tasks_dict = {}
    print(len(plan['project']))
    plan['project'] = plan['project'][0]
    plan['project'].pop('img')
    plan['project'].pop('members')
    plan['project'].pop('tasks')
    plan['project']['created_by'] = str(plan['project']['created_by'])
    plan['id'] = str(plan['_id'])
    plan.pop('_id')
    plan.pop('created_by')
    plan['project']['id'] = str(plan['project']['_id'])
    plan['project'].pop('_id')
    print(plan, str(plan['project']['created_by']))
    for task_status in plan["tasks"].keys():
        task_pipeline = [
            {"$match": {
                "_id": {"$in":  plan["tasks"][task_status]}}},
            {"$lookup": {
                "from": "user_details",
                "localField": "assignedTo",
                "foreignField": "_id",
                "as": "assigned_user"
            }},
            {"$lookup": {
                "from": "user_details",
                "localField": "reportTo",
                "foreignField": "_id",
                "as": "reporter_user"
            }},
            {"$project": {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "taskName": 1,
                "description": 1,
                'summary': 1,
                "status": 1,
                "created_at": 1,
                "updated_at": 1,
                'plan': 1,
                "project": 1,

                "priority": 1,
                'section': 1,
                "due_date": 1,
                "assigned_user_id": {"$arrayElemAt": ["$assigned_user._id", 0]},
                "reporter_user_id": {"$arrayElemAt": ["$reporter_user._id", 0]},
            }},
            {"$lookup": {
                "from": "user_details",
                "localField": "assigned_user_id",
                "foreignField": "_id",
                "as": "assigned_user"
            }},
            {"$lookup": {
                "from": "user_details",
                "localField": "reporter_user_id",
                "foreignField": "_id",
                "as": "reporter_user"
            }},
            {"$project": {
                "_id": 0,
                "id": 1,
                "taskName": 1,
                "description": 1,
                "status": 1,
                "created_at": 1,
                "project": 1,
                "summary": 1,
                'plan': 1,
                "updated_at": 1,
                "due_date": 1,
                "section": 1,
                "priority": 1,
                "assigned_user.username": 1,
                "assigned_user.color": 1,
                "assigned_user.name": 1,
                "reporter_user.color": 1,
                "reporter_user.username": 1,
                "reporter_user.name": 1

            }}
        ]

        results = list(db.tasks.aggregate(task_pipeline))
        for i in results:
            i['assignee'] = i['assigned_user']
            i['reportTo'] = i['reporter_user']
            for x in i['assignee']:
                if 'img' in x.keys():
                    x['img'] = decode_base64(x['img'])
                else:
                    x['img'] = ''
            for x in i['reporter_user']:
                if 'img' in x.keys():
                    x['img'] = decode_base64(x['img'])
                else:
                    x['img'] = ''
                i.pop('assigned_user')
            i.pop('reporter_user')
            if i['plan'] != 'backLog':
                i['plan'] = str(i['plan'])
        tasks_dict[task_status] = results
    plan['tasks'] = tasks_dict
    print(plan, 'heere')
    return plan, 200

# @app.route("/plan/retroSpection/")
# @jwt_required()
# def retro_spection():
#     project_id = request.args.get('project_id')
#     # user_id=get_jwt_identity()
#     pipe_line = [
#         {
#             '$match': {'project': ObjectId(project_id)}
#         }, {
#             '$lookup': {
#                 'from': 'projects',
#                 'localField': 'project',
#                 'foreignField': '_id',
#                 'as': 'project'
#             }
#         },
#         {'$unwind': '$project'}

#     ]
#     plans = list(collection.aggregate(pipe_line))
#     for i in plans:
#         i['id'] = str(i['_id'])
#         i.pop('_id')
#         i['project']['id'] = str(i['project']['_id'])
#         i['project'].pop('_id')
#         i['project']['members'] = [str(j) for j in i['project']['members']]
#         for j in i['project']['tasks'].keys():
#             j['project']['tasks'][j] = [str(x)
#                                         for x in j['project']['tasks'][j]]

#     return {
#         'data': plans
#     }, 200
