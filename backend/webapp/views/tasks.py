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

        task_pipeline = [
            {"$match": {"_id": {"$in": project["tasks"][task_status]}}},
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
                "summary":1,
                "status": 1,
                "created_at": 1,
                "updated_at": 1,
                "priority": 1,
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
                "summary":1,
                "status": 1,
                "created_at": 1,
                "updated_at": 1,
                "due_date": 1,
                "priority": 1,

                "assigned_user.username": 1,
                "reporter_user.username": 1
            }}
        ]
        results = list(db.tasks.aggregate(task_pipeline))
        tasks_dict[task_status] = results
    print(tasks_dict)
    return tasks_dict, 200

# save columns


@app.route("/task/create/<projectId>", methods=["POST"])
@jwt_required()
def create_task(projectId):
    data = request.form
    parsedData = {}
    for key in data.keys():
        parsedData[key] = data[key]
    parsedData.pop("id")

    print(data)
    print(parsedData)
    
    reportTo = parsedData["reportTo"].split(",")
    assignedTo = parsedData["assignedTo"].split(",")
    
    parsedData["reportTo"] = [ObjectId(user)
                              for user in reportTo]
    parsedData["assignedTo"] = [ObjectId(user)
                              for user in assignedTo]
    taskID = db.tasks.insert_one(parsedData).inserted_id
    db.projects.update_one({"_id": ObjectId(projectId)}, {
                           "$push": {"tasks."+data["status"]: taskID}})

    return "hello world", 200
# route for update


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


@app.route("/task/update/<id>", methods=["PUT"])
@jwt_required()
def update_task(id):
    # data = json.loads(request.form["data"])

    data = request.form
    parsedData = {}
    for key in data.keys():
        parsedData[key] = data[key]
    parsedData.pop("id")

    reportTo = parsedData["reportTo"].split(",")
    assignedTo = parsedData["assignedTo"].split(",")
    
    parsedData["reportTo"] = [ObjectId(user)
                              for user in reportTo]
    parsedData["assignedTo"] = [ObjectId(user)
                              for user in assignedTo]
    
    response=db.tasks.update_one({"_id": ObjectId(id)}, {"$set": parsedData})
    print(response.modified_count)

    return {"status": "success"}

# assign task to user


@ app.route("/task/assign", methods=["POST"])
@ jwt_required()
def assign_task():
    data = json.loads(request.form["data"])
    print(data)
    id = db.tasks.update_one({"_id": ObjectId(data['task_id'])}, {
        "$set": {"assigned_to": data['user_id']}})
    return {"status": "success", "id": str(id)}

# unassign task from user


@ app.route("/task/unassign", methods=["POST"])
@ jwt_required()
def unassign_task():
    data = json.loads(request.form["data"])
    print(data)
    id = db.tasks.update_one({"_id": ObjectId(data['task_id'])}, {
        "$set": {"assigned_to": None}})
    return {"status": "success", "id": str(id)}

# Path: backend\webapp\views\user.py
