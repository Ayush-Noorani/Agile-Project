# type:ignore

import codecs
from webapp.helpers.common import decode_base64
from webapp import app
from flask import request
from pymongo import MongoClient
from flask_jwt_extended import jwt_required, get_jwt_identity

from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
from bson import ObjectId
from werkzeug.datastructures import FileStorage


collection = db.user_details
# from webapp.models.user_model import user_model
# make an end point private by
# import
# from flask_jwt_extended jwt_required get_jwt_identity
# to generate token import
# from webapp.helpers.jwt import generateToken


@app.route("/")
def root():
    return {"message": "Hello, World!"}, 200


@app.route("/user/info")
@jwt_required()
def user_info():
    id = get_jwt_identity()
    data = collection.find_one(
        {"_id": ObjectId(id)},
        {"email": 1, "username": 1, "roles": 1, "_id": 1, "color": 1, "name": 1},
    )
    data["id"] = str(data["_id"])
    data.pop("_id")

    if "img" in data.keys() and data["img"] != "":
        base64_data = codecs.encode(data["img"], "base64")

        data["img"] = base64_data.decode("utf-8")
    else:
        data["img"] = ""
    return data, 200


@app.route("/user/login", methods=["POST"])
def login():
    data = request.get_json()
    name = data["name"]
    password = data["password"]
    record = collection.find_one(
        {"email" if "@" in name else "username": name},
        {
            "_id": 1,
            "password": 1,
            "email": 1,
            "username": 1,
            "roles": 1,
            "_id": 1,
            "color": 1,
        },
    )
    print("data")

    if record and bcrypt.check_password_hash(record["password"], password):
        return {
            "data": "User found - Login successful",
            "token": generateToken(str(record["_id"])),
            "username": record["username"],
            "email": record["email"],
            "roles": record["roles"],
            "id": str(record["_id"]),
        }, 200
    else:
        return {"message": "Invalid Credentials - Login Failed"}, 400


@app.route("/user/register", methods=["POST"])
def register():
    data = request.get_json()

    check_if_already_exists = collection.find_one({"email": data["email"]})
    data["active"] = False
    if check_if_already_exists:
        return {"message": "Email already exists!"}, 403
    data["password"] = bcrypt.generate_password_hash(data["password"])
    data["roles"] = ["user"]

    is_registered = collection.insert_one(data)
    if is_registered:
        return {
            "data": "Registered",
            "token": generateToken(str(is_registered.inserted_id)),
            "insertedID": str(is_registered.inserted_id),
        }, 200
    else:
        return {"message": "Invalid Details"}, 400


@app.route("/user/update-details", methods=["POST"])
@jwt_required()
def updateDetails():
    data = request.form("data")
    img = request.files["img"]
    username = data["username"]

    if isinstance(img, FileStorage):
        data["img"] = img.stream.read()  # type: ignore
    elif len(data["img"] > 0):
        data["img"] = ""
    if username == "" or username == None:
        return {"message": "Username cannot be empty"}, 304
    else:
        password = bcrypt.generate_password_hash(data["password"])
        record = collection.find_one({"email": data["email"]})
        if record and bcrypt.check_password_hash(record["password"], password):
            return {"message": "New password and Old password cannot be the same"}, 304
        else:
            result = collection.update_one({"email": data["email"]}, data)
            newData = collection.find_one({"email": data["email"]})
            return {
                "message": "User details updated successfully",
                "data": newData,
            }, 200


# save image route


@app.route("/user/save-image/<id>", methods=["PUT"])
@jwt_required()
def saveImage(id):
    img = request.files["img"]
    img.save(app.config["UPLOAD_FOLDER"] + "\\profile\\" + str(id) + "." + "png")
    return {}, 200


#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#    , return jsonify(logged_in_as=current_user)


@app.route("/user/get-dashboard", methods=["GET"])
@jwt_required()
def get_user_dashboard():
    print("dashboard")
    user_id = get_jwt_identity()
    projects = list(
        db.projects.aggregate(
            [
                {
                    "$match": {
                        "$or": [
                            {"members": {"$in": [ObjectId(user_id)]}},
                            {"created_by": ObjectId(user_id)},
                        ]
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "members_count": {"$size": "$members"},
                        "category": 1,
                        "tasks": 1,
                        "name": 1,
                        "startDate": 1,
                        "columns": 1,
                        "endDate": 1,
                        "img": 1,
                        "created_by": 1,
                    }
                },
            ]
        )
    )
    for project in projects:
        project["status"] = {
            "completed_tasks": len(project["tasks"]["done"]),
            "remaining_tasks": sum(
                [
                    len(project["tasks"][task])
                    for task in project["tasks"].keys()
                    if task != "done"
                ]
            ),
        }
        if "created_by" in project.keys():
            project["created_by"] = str(project["created_by"])
        project["id"] = str(project["_id"])
        project.pop("_id")
        if "img" in project.keys() and project["img"] != "" and project["img"] != None:
            project["img"] = decode_base64(project["img"])
        for task_status, value in project["tasks"].items():
            if len(value) > 0:
                task_pipeline = [
                    {"$match": {"_id": {"$in": project["tasks"][task_status]}}},
                    {
                        "$lookup": {
                            "from": "user_details",
                            "localField": "assignedTo",
                            "foreignField": "_id",
                            "as": "assigned_user",
                        }
                    },
                    {
                        "$lookup": {
                            "from": "user_details",
                            "localField": "reportTo",
                            "foreignField": "_id",
                            "as": "reporter_user",
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "id": {"$toString": "$_id"},
                            "taskName": 1,
                            "description": 1,
                            "summary": 1,
                            "status": 1,
                            "created_at": 1,
                            "updated_at": 1,
                            "plan": 1,
                            "project": 1,
                            "priority": 1,
                            "section": 1,
                            "due_date": 1,
                            "assigned_user_id": {
                                "$arrayElemAt": ["$assigned_user._id", 0]
                            },
                            "reporter_user_id": {
                                "$arrayElemAt": ["$reporter_user._id", 0]
                            },
                        }
                    },
                    {
                        "$lookup": {
                            "from": "user_details",
                            "localField": "assigned_user_id",
                            "foreignField": "_id",
                            "as": "assigned_user",
                        }
                    },
                    {
                        "$lookup": {
                            "from": "user_details",
                            "localField": "reporter_user_id",
                            "foreignField": "_id",
                            "as": "reporter_user",
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "id": 1,
                            "taskName": 1,
                            "description": 1,
                            "status": 1,
                            "created_at": 1,
                            "project": 1,
                            "summary": 1,
                            "plan": 1,
                            "updated_at": 1,
                            "due_date": 1,
                            "section": 1,
                            "priority": 1,
                            "assigned_user.username": 1,
                            "assigned_user.color": 1,
                            "assigned_user.name": 1,
                            "reporter_user.color": 1,
                            "reporter_user.username": 1,
                            "reporter_user.name": 1,
                        }
                    },
                ]

                results = list(db.tasks.aggregate(task_pipeline))
                for i in results:
                    i["assignee"] = i["assigned_user"]
                    i["reportTo"] = i["reporter_user"]
                    for x in i["assignee"]:
                        if "img" in x.keys():
                            x["img"] = decode_base64(x["img"])
                        else:
                            x["img"] = ""
                    for x in i["reportTo"]:
                        if "img" in x.keys():
                            x["img"] = decode_base64(x["img"])
                        else:
                            x["img"] = ""
                        i.pop("assigned_user")
                    i.pop("reporter_user")
                    if i["plan"] != "backLog":
                        i["plan"] = str(i["plan"])
                project["tasks"][task_status] = results
    return {"projects": list(projects)}, 200
