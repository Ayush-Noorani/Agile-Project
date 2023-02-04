from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
from bson import ObjectId

collection = db.projects


@app.route("/project/list", methods=["GET"])
def get_project_list():

    projects = db.projects.find()
    return {"projects": list(projects)}


@app.route("/project/create", methods=["POST"])
def create_project():
    data = request.get_json()
    db.projects.insert_one(data)
    return {"status": "success"}


@app.route("/project/delete/<id>", methods=["DELETE"])
def delete_project(id):
    db.projects.delete_one({"_id": ObjectId(id)})
    return {"status": "success"}


@app.route("/project/get/<id>", methods=["GET"])
def get_project(id):
    project = db.projects.find_one({"_id": ObjectId(id)})
    return {"project": project}


@app.route("/project/update", methods=["POST"])
def update_project():
    data = request.get_json()
    db.projects.update_one({"_id": ObjectId(data["id"])}, {"$set": data})
    return {"status": "success"}
