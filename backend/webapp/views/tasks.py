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
from flask import send_file
collection = db.tasks
projects_col = db["projects"]
tasks_col = db["tasks"]


@app.route("/task/list/<id>", methods=["GET"])
def get_task_list(id):

    project = projects_col.find_one(
        {"_id": ObjectId(id)})

    tasks_dict = {}

    for task_status in project["tasks"].keys():
        print(project["tasks"][task_status])
        task_pipline = pipeline = [
            {"$match":            {"_id": {"$in": project["tasks"][task_status]}},
             },
            {"$lookup": {
                "from": "users_details",
                "localField": "assigned",
                "foreignField": "_id",
                "as": "assigned_users"
            }},
            {"$lookup": {
                "from": "users_details",
                "localField": "reporter",
                "foreignField": "_id",
                "as": "reporter_user"
            }},
            {"$project": {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "description": 1,
                "status": 1,
                "created_at": 1,
                "updated_at": 1,
                "due_date": 1,
                "assigned_users": 1,
                "reporter_user": 1,
                "reportinTo": {"$arrayElemAt": ["$reporter_user", 0]},
                "assignedTo": {"$arrayElemAt": ["$assigned_users", 0]}

            }}
        ]
        results = list(db.tasks.aggregate(task_pipline))
        tasks_dict[task_status] = results

    return tasks_dict, 200


@app.route("/task/create", methods=["POST"])
@jwt_required()
def create_task():
    data = json.loads(request.form["data"])
    print(data)
    data['created_by'] = get_jwt_identity()
    img = request.files['img']
    if (img):
        data['img'] = True
    else:
        data['img'] = False
    id = db.tasks.insert_one(data).inserted_id
    img = request.files['img']
    if (img):
        img.save(app.config["UPLOAD_FOLDER"]+"\\task\\" +
                 str(id)+"."+img.filename.split(".")[1])

    return {"status": "success", "id": str(id)}


@app.route("/task/update/sequence/<id>", methods=["PUT"])
@jwt_required()
def update_task_sequence(id):
    data = request.get_json()
    for key in data.keys():
        data[key] = list(map(lambda x: ObjectId(x), data[key]))
    db.projects.update_one({"_id": ObjectId(id)}, {"$set": {'tasks': data}})
    return {"status": "success"}


@app.route("/task/<id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    db.tasks.delete_one({"_id": ObjectId(id)})
    return {"status": "success"}


@app.route("/task/get/<id>", methods=["GET"])
@jwt_required()
def get_task(id):
    task = db.tasks.find_one({"_id": ObjectId(id)})
    task["id"] = str(task["_id"])
    task.pop("_id")
    return {"task": task}


@app.route("/task/<id>", methods=["PUT"])
@jwt_required()
def update_task(id):
    data = json.loads(request.form["data"])
    print(data)
    img = request.files['img']
    if (img):
        data['img'] = True
    else:
        data['img'] = False
    db.tasks.update_one({"_id": ObjectId(id)}, {"$set": data})
    img = request.files['img']
    if (img):
        img.save(app.config["UPLOAD_FOLDER"]+"\\task\\" +
                 str(id)+"."+img.filename.split(".")[1])
    return {"status": "success"}

# assign task to user


@app.route("/task/assign", methods=["POST"])
@jwt_required()
def assign_task():
    data = json.loads(request.form["data"])
    print(data)
    id = db.tasks.update_one({"_id": ObjectId(data['task_id'])}, {
                             "$set": {"assigned_to": data['user_id']}})
    return {"status": "success", "id": str(id)}

# unassign task from user


@app.route("/task/unassign", methods=["POST"])
@jwt_required()
def unassign_task():
    data = json.loads(request.form["data"])
    print(data)
    id = db.tasks.update_one({"_id": ObjectId(data['task_id'])}, {
                             "$set": {"assigned_to": None}})
    return {"status": "success", "id": str(id)}

# Path: backend\webapp\views\user.py
