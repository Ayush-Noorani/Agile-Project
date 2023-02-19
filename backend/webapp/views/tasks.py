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


@app.route("/task/list/<id>", methods=["GET"])
@jwt_required()
def get_task_list(id):
    user_id = get_jwt_identity()
    tasks = list(db.tasks.find({'project_id': ObjectId(id)}))
    for task in tasks:

        task["id"] = str(task["_id"])
        task.pop("_id")

    return {"tasks": tasks}


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


@app.route("/task/<id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    db.tasks.delete_one({"_id": ObjectId(id)})
    return {"status": "success"}


@app.route("/task/<id>", methods=["GET"])
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
