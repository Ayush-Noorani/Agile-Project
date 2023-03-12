from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import app, db, socketio
from flask_socketio import emit

from webapp import bcrypt
from webapp import db
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import json
from flask import send_file
collection = db.notifications


@app.route("/notification/list", methods=["GET"])
@jwt_required()
def get_notification_list():
    id = get_jwt_identity()
    notifications = list(db.notifications.find({"user_id": ObjectId(id)}))
    for notification in notifications:
        notification["id"] = str(notification["_id"])
        notification.pop("_id")
    return {"notifications": notifications}


@app.route('/notification/read')
@jwt_required()
def notification_read():
    id = get_jwt_identity()
    db.notification.update_many({"user_id": ObjectId(id)}, {'$set': {
        'read': True
    }})


@socketio.on('notification-list')
def handle_notification():
    id = get_jwt_identity()
    pipline = [

        {
            '$match': {'user_id': ObjectId(id)}
        },
        {
            "$lookup": {
                "from": "projects",
                "localField": "reference_id",
                "foreignField": "project_id",
                "as": "project"
            }
        },
        {
            "$lookup": {
                "from": "tasks",
                "localField": "reference_id",
                "foreignField": "task_id",
                "as": "task"
            }
        },
        {
            "$unwind": "$user"
        },
        {
            "$unwind": {
                "path": "$project",
                "preserveNullAndEmptyArrays": True
            }
        },
        {
            "$unwind": {
                "path": "$task",
                "preserveNullAndEmptyArrays": True
            }
        },
        {
            "$project": {
                "_id": 0,
                "notification_id": "$_id",
                "user_id": "$user.user_id",
                "user_name": "$user.name",
                "user_email": "$user.email",
                "message": 1,
                "type": 1,
                "read": 1,
                "reference_id": 1,
                "project_name": "$project.name",
                "project_description": "$project.description",
                "task_name": "$task.name",
                "task_description": "$task.description"
            }
        }
    ]
    notifications = list(collection.aggregate(pipline))

    emit('notification', notifications, broadcast=True)
