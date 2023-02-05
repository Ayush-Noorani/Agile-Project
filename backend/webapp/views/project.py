from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
from bson import ObjectId
from flask_jwt_extended import jwt_required,get_jwt_identity
import requests
import json
from flask import send_file
collection = db.projects


@app.route("/project/list", methods=["GET"])
@jwt_required()
def get_project_list():
    id=get_jwt_identity()
    projects =list( db.projects.find({"$or":[{"created_by":id},{"members":{"$in":[id]}}]}))
    for project in projects:
    
        project["id"]=str(project["_id"])
        project.pop("_id")
    return {"projects":projects }


@app.route("/project/create", methods=["POST"])
@jwt_required()
def create_project():
    data =json.loads(request.form["data"])
    print(data)
    data['created_by']=get_jwt_identity()
    id=db.projects.insert_one(data).inserted_id
    img = request.files['img']
    if(img):
        img.save(app.config["UPLOAD_FOLDER"]+"\\project\\"+str(id)+"."+img.filename.split(".")[1])

    return {"status": "success","id":str(id)}


@app.route("/project/<id>", methods=["DELETE"])
@jwt_required()
def delete_project(id):
    db.projects.delete_one({"_id": ObjectId(id)})
    return {"status": "success"}

@app.route("/image/<path>/<id>", methods=["GET"])
def get_image(path,id):
    return send_file(app.config["UPLOAD_FOLDER"]+"\\"+path+"\\"+id, mimetype='image/gif')
@app.route("/project/<id>", methods=["GET"])
@jwt_required()
def get_project(id):
    project = db.projects.find_one({"_id": ObjectId(id)})
    return {"project": project}


@app.route("/project/<id>", methods=["PUT"])
@jwt_required()
def update_project(id):
    data = request.get_json()
    db.projects.update_one({"_id": ObjectId(id)}, {"$set": data})
    return {"status": "success"}

