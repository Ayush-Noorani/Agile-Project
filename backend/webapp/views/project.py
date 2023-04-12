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
from webapp.helpers.notification import create_notification
from werkzeug.datastructures import FileStorage
import json
from flask import send_file
import codecs

collection = db.projects

# collection
# project-stores project related information
# project_logger-stores logs related to project
# user_prokects stores information related to id of all proejects assigned to a user


@app.route("/project/list", methods=["GET"])
@jwt_required()
def get_project_list():
    id = get_jwt_identity()
    pipeline = [

        {
            '$lookup': {
                'from': 'user_details',
                'localField': 'members',
                'foreignField': '_id',
                'as': 'members'
            }
        },
        {
            '$project': {
                'title': 1,
                'description': 1,
                'img': 1,
                'name': 1,
                'lead': 1,
                'columns': 1,
                'created_at': 1,
                'members._id': 1,
                'members.username': 1,
                'tasks': 1,
                'members.color': 1,
                'startDate': 1,
                'endDate': 1,
                'members_count': {'$size': '$members'},
                'members.email': 1,
                'members.name': 1,
                'members.roles': 1,
                'members.img': 1
            }

        }
    ]
    projects = list(db.projects.aggregate(pipeline))
    for project in projects:
        project['status'] = {
            "completed_tasks": len(project["tasks"]["done"]),

            "remaining_tasks": sum([len(project["tasks"][task]) for task in project["tasks"].keys() if task != "done"])
        }
        if project['lead'] != '':
            project['lead'] = str(project['lead'])
        if 'img' in project.keys() and project['img'] != '' and project['img'] != None:
            print("converting project")
            project['img'] = decode_base64(project['img'])
        else:
            project['img'] = ''
        project["id"] = str(project["_id"])
        for i in project['members']:
            i['id'] = str(i['_id'])
            if 'img' in i.keys():
                i['img'] = decode_base64(i['img'])
            else:
                i['img'] = ''
            i.pop('_id')
            if 'columns' in i.keys():
                for j in i['columns']:
                    if len(project['tasks'][j['value']]) > 0:
                        j['fixed'] = True
        project.pop("_id")
        for k, v in project['tasks'].items():
            project['tasks'][k] = [str(x) for x in v]
    return {"projects": projects}


@app.route("/project/column/update/<id>", methods=["PUT"])
@jwt_required()
def save_columns(id):
    data = request.get_json()
    current_project = db.projects.find_one(
        {"_id": ObjectId(id)}, {'columns': 1, 'tasks': 1})
    missing_elements = [x for x in data['columns']
                        if x['value'] not in current_project['columns'].keys()]

    for i in missing_elements:
        current_project['tasks'][i['value']] = []
    done_project = current_project['tasks']['done']
    current_project['tasks'].pop('done')
    current_project['tasks']['done'] = done_project
    db.projects.update_one({"_id": ObjectId(id)}, {
                           "$set": {"columns": data['columns'],
                                    'tasks': current_project['tasks']}, })
    return {"status": "success"}


@app.route("/project/create", methods=["POST"])
@jwt_required()
def create_project():
    data = json.loads(request.form["data"])

    data['created_by'] = ObjectId(get_jwt_identity())
    img = request.files['img']
    data['members'] = [ObjectId(member['id']) for member in data['members']]
    if (img):
        data['img'] = True
    else:
        data['img'] = False

    default_columns = [
        {
            "label": "To Do",
            "value": "toDo"
        },
        {
            "label": "In Progress",
            "value": "inProgress"
        },
        {
            "label": "Done",
            "value": "done"
        }
    ]
    if isinstance(img, FileStorage):
        data['img'] = img.stream.read()  # type: ignore
    elif len(data['img'] > 0):
        data['img'] = ''

    data['tasks']={}
    for i in default_columns:
        data['tasks'][i['value']] = []
    data['columns'] = default_columns
    if data['lead'] != "":
        data['lead'] = ObjectId(data['lead'])
    id = db.projects.insert_one(data).inserted_id

    create_notification(
        data['members'], "You have been assigned to a project by", 1, ObjectId(data['created_by']), id)

    # db.project_logger.insert_one({"created_by":ObjectId(get_jwt_identity()),"project_id":ObjectId(id),"logs":[]})
    return {"status": "success", "id": str(id)}


@app.route("/project/column/<id>", methods=["PUT"])
@jwt_required()
def get_project_column(id):
    data = request.get_json()
    tasks = db.projects.find_one({"_id": ObjectId(id)}, {'tasks': 1})['tasks']
    for i in data['columns']:
        if i['value'] not in tasks.keys():
            tasks[i['value']] = []

    db.projects.update_one({"_id": ObjectId(id)}, {
                           "$set": {"columns": data['columns']}})
    return {"status": "success"}


@app.route("/project/<id>", methods=["DELETE"])
@jwt_required()
def delete_project(id):
    db.projects.delete_one({"_id": ObjectId(id)})
    return {"status": "success"}


@app.route("/image/<path>/<id>", methods=["GET"])
def get_image(path, id):
    return send_file(app.config["UPLOAD_FOLDER"]+"\\"+path+"\\"+id, mimetype='image/gif')


@app.route("/project/members/<id>", methods=["GET"])
@jwt_required()
def get_project_members(id):
    pipeline = [
        {"$match": {"_id": ObjectId(id)}},
        {'$project': {'members': 1, '_id': 0}},
        {'$unwind': '$members'},
        {'$lookup': {'from': 'user_details', 'localField': 'members',
                     'foreignField': '_id', 'as': 'members'}},
        {'$unwind': '$members'},
        {'$project': {'members._id': 1, 'members.username': 1, 'members.name': 1,
                      'members.roles': 1, 'members.img': 1, 'members.color': 1}}
    ]
    members = list(db.projects.aggregate(pipeline))
    result = []
    for member in members:
        member = member['members']
        member["id"] = str(member["_id"])
        member.pop("_id")
        member['img'] = decode_base64(member['img'])

        result.append(member)
    return {"members": result}


@ app.route("/search/members/<text>", methods=["GET"])
@ jwt_required()
def search_project_members(text):
    roles = ['user', 'lead', 'developer', 'tester', 'admin']
    members = []
    if (text == "*"):
        members = list(db.user_details.find({"roles": {"$in": roles}},  {
            '_id': 1, "username": 1, "roles": 1, "img": 1, 'members.color': 1, 'members.name': 1, 'members.img': 1}))
    else:
        members = list(db.user_details.find({"roles": {"$in": roles}, 'username': "/" + text + "/"}, {
            '_id': 1, "username": 1, "roles": 1, "img": 1, 'members.color': 1, 'members.name': 1, 'members.img': 1}))
    for member in members:
        if 'img' in member.keys():
            member['img'] = decode_base64(member['img'])

        member["id"] = str(member["_id"])
        member.pop("_id")
    return {"members": members}


@ app.route("/project/get/<id>", methods=["GET"])
@ jwt_required()
def get_project(id):
    project = db.projects.find_one({"_id": ObjectId(id)})
    pipeline = [
        {'$match': {'_id': ObjectId(id)}},
        {'$lookup': {'from': 'user_details', 'localField': 'members',
                     'foreignField': '_id', 'as': 'members'}},

        {
            '$project': {
                'members._id': 1,
                'members.username': 1,
                'members.name': 1,
                'members.roles': 1,
                'members.img': 1,
                'members.color': 1,
                'members.color': 1,
                'created_by': 1,
                'name': 1,

                'description': 1,
                'img': 1,
                'lead': 1,
                'category': 1,
                'startDate': 1,
                'endDate': 1,
                'columns': 1,

            }
        }
    ]
    project = list(db.projects.aggregate(pipeline))[0]
    project["id"] = id
    project.pop("_id")
    if project['img'] != '' and project['img'] != None:
        base64_data = codecs.encode(project['img'], 'base64')

        project['img'] = base64_data.decode("utf-8")
    for member in project['members']:
        member["id"] = str(member["_id"])
        member.pop("_id")
    project['created_by'] = str(project['created_by'])
    return {"project": project}


@ app.route("/project/<id>", methods=["PUT"])
@ jwt_required()
def update_project(id):
    data = json.loads(request.form["data"])
    img = request.files['img'] if 'img' in request.files.keys() else False
    user_id = get_jwt_identity()

    if isinstance(img, FileStorage):
        data['img'] = img.stream.read()  # type: ignore
    elif 'img' in data.keys() and len(data['img']) > 0:
        data['img'] = ''
    data['members'] = [ObjectId(member) for member in data['members']]
    data.pop("id")
    if data['lead'] != "":
        data['lead'] = ObjectId(data['lead'])
    print('insert')
    db.projects.update_one({"_id": ObjectId(id)}, {"$set": data})
    print('done')

    # create_notification(
    #     data['members'], "Project Information is updated", 2, ObjectId(user_id), ObjectId(id))
    return {"status": "success"}


@ app.route("/project/unassign/<id>", methods=["POST"])
@ jwt_required()
def unassign_project(id):
    data = request.get_json()
    db.projects.update({'_id': ObjectId(id)}, {
                       "$pull": {"members": ObjectId(data['user_id'])}})
    return {"status": "success"}


@ app.route("/project/assign/<id>", methods=["POST"])
@ jwt_required()
def assign_project(id):
    data = request.get_json()
    db.projects.update({'_id': ObjectId(id)}, {
                       "$push": {"members": ObjectId(data['user_id'])}})
    return {"status": "success"}

# Path: backend\webapp\views\user.py
