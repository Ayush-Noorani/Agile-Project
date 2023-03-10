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

import json
from flask import send_file
collection = db.projects

# collection
# project-stores project related information
# project_logger-stores logs related to project
# user_prokects stores information related to id of all proejects assigned to a user


@app.route("/project/list", methods=["GET"])
@jwt_required()
def get_project_list():
    id = get_jwt_identity()
    projects = list(db.projects.find(
        {"$or": [{"created_by": ObjectId(get_jwt_identity())}, {"members": {"$in": [ObjectId(id)]}}]}, {"_id": 1, "title": 1, "description": 1, "img": 1, "members": 1, "created_by": 1, "created_at": 1, "updated_at": 1, 'columns': 1}))
    for project in projects:

        project["id"] = str(project["_id"])
        project['members'] = len(project['members'])
        project.pop("_id")
        project.pop('created_by')
    print(projects)
    return {"projects": projects}


@app.route("/project/column/update/<id>", methods=["PUT"])
@jwt_required()
def save_columns(id):
    data = request.get_json()
    print(data)
    db.projects.update_one({"_id": ObjectId(id)}, {
                           "$set": {"columns": data['columns']}})
    return {"status": "success"}


@app.route("/project/create", methods=["POST"])
@jwt_required()
def create_project():
    data = json.loads(request.form["data"])
    print(data)

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
    for i in default_columns:
        data['tasks'][i]['value'] = []
    data['columns'] = default_columns
    id = db.projects.insert_one(data).inserted_id
    img = request.files['img']
    if (img):
        img.save(app.config["UPLOAD_FOLDER"]+"\\project\\" +
                 str(id)+"."+"png")
    create_notification(
        data['members'], "You have been assigned to a project by", 1, ObjectId(data['created_by']), id)

    # db.project_logger.insert_one({"created_by":ObjectId(get_jwt_identity()),"project_id":ObjectId(id),"logs":[]})
    return {"status": "success", "id": str(id)}


@app.route("/project/column/<id>", methods=["PUT"])
@jwt_required()
def get_project_column(id):
    data = request.get_json()
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
    print(app.config["UPLOAD_FOLDER"]+"\\"+path+"\\"+id)
    return send_file(app.config["UPLOAD_FOLDER"]+"\\"+path+"\\"+id, mimetype='image/gif')


@app.route("/project/members/<id>", methods=["GET"])
@jwt_required()
def get_project_members(id):
    print(id)
    pipeline = [
        {"$match": {"_id": ObjectId(id)}},
        {'$project': {'members': 1, '_id': 0}},
        {'$unwind': '$members'},
        {'$lookup': {'from': 'user_details', 'localField': 'members',
                     'foreignField': '_id', 'as': 'members'}},
        {'$unwind': '$members'},
        {'$project': {'members._id': 1, 'members.username': 1,
                      'members.roles': 1, 'members.img': 1}}
    ]
    members = list(db.projects.aggregate(pipeline))
    print(members)
    result = []
    for member in members:
        member = member['members']
        member["id"] = str(member["_id"])
        member.pop("_id")
        result.append(member)
    return {"members": result}


@ app.route("/search/members/<text>", methods=["GET"])
@ jwt_required()
def search_project_members(text):
    roles = ['user', 'lead', 'developer', 'tester', 'admin']
    members = []
    if (text == "*"):
        print("in")
        members = list(db.user_details.find({"roles": {"$in": roles}},  {
            '_id': 1, "username": 1, "roles": 1, "img": 1}))
    else:
        members = list(db.user_details.find({"roles": {"$in": roles}, 'username': "/" + text + "/"}, {
            '_id': 1, "username": 1, "roles": 1, "img": 1}))
    for member in members:

        member["id"] = str(member["_id"])
        member.pop("_id")
    return {"members": members}


@ app.route("/project/get/<id>", methods=["GET"])
@ jwt_required()
def get_project(id):
    print(id)
    project = db.projects.find_one({"_id": ObjectId(id)})
    project["id"] = id
    project.pop("_id")
    project['members'] = [str(member) for member in project['members']]
    return {"project": project}


@ app.route("/project/<id>", methods=["PUT"])
@ jwt_required()
def update_project(id):
    data = json.loads(request.form["data"])
    img = request.files['img']
    user_id = get_jwt_identity()
    if (img) and data['img'] != True:
        data['img'] = True
        img.save(app.config["UPLOAD_FOLDER"]+"\\project\\" +
                 str(id)+"."+"png")
    elif data['img'] == False:
        data['img'] = False
    print(data)
    data['members'] = [ObjectId(member) for member in data['members']]
    data.pop("id")
    db.projects.update_one({"_id": ObjectId(id)}, {"$set": data})
    create_notification(
        data['members'], "Project Information is updated", 2, ObjectId(user_id), ObjectId(id))
    return {"status": "success"}


@ app.route("/project/assign", methods=["POST"])
@ jwt_required()
def assign_project():
    data = request.get_json()
    db.projects.update({'_id': ObjectId(data['_d'])}, {
                       "$push": {"members": ObjectId(data['user_id'])}})
    return {"status": "success"}


@ app.route("/project/unassign", methods=["POST"])
@ jwt_required()
def unassign_project():
    data = request.get_json()
    db.projects.update({'_id': ObjectId(data['_d'])}, {
                       "$pull": {"members": ObjectId(data['user_id'])}})
    return {"status": "success"}

# Path: backend\webapp\views\user.py
