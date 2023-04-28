from webapp.helpers.common import decode_base64
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
from datetime import datetime

collection = db.notifications

# type
# 1 - assigned to a project
# 2 - updated project information
# 3 - assigned to a task
# 4 - updated task information


def create_notification(user_ids, message, type, creator_id, reference):
    notification = {
        "user_id": None,
        "message": message,
        "type": type,
        "read": False,
        "reference": reference,
        "created_at": datetime.now(),
        "created_by": creator_id,
    }
    for user_id in user_ids:
        notification["user_id"] = user_id

        collection.insert_one(notification)


def get_notfication(id):
    query = [
        {
            "$match": {
                "user_id": ObjectId(id),
            }
        },
        {
            "$lookup": {
                "from": "user_details",
                "localField": "created_by",
                "foreignField": "_id",
                "as": "created_by_user",
            }
        },
        {
            "$lookup": {
                "from": "projects",
                "localField": "reference",
                "foreignField": "_id",
                "as": "project",
            }
        },
        {
            "$lookup": {
                "from": "tasks",
                "localField": "reference",
                "foreignField": "_id",
                "as": "task",
            }
        },
        {"$sort": {"created_at": -1}},
    ]

    notifications = collection.aggregate(query)
    messagelist = []

    if notifications.alive:
        user = db.user_details.find_one({"_id": ObjectId(id)})
        for notification in notifications:
            message = f"{notification['message']} (by {notification['created_by_user'][0]['name']})\n"
            message_obj = {
                "type": notification["type"],
                "read": notification["read"],
                "created_at": str(notification["created_at"]),
                "created_by": {
                    "name": notification["created_by_user"][0]["name"],
                    "id": str(notification["created_by_user"][0]["_id"]),
                    "username": notification["created_by_user"][0]["username"],
                    "color": notification["created_by_user"][0]["color"],
                },
            }
            if notification["type"] == 1 or notification["type"] == 2:
                message_obj["reference"] = {
                    "name": notification["project"][0]["name"],
                    "id": str(notification["project"][0]["_id"]),
                    "img": notification["project"][0]["img"],
                    # "link": "/project/tasks" + str(notification["project"][0]["_id"]),
                }
                message += f"  in project {notification['project'][0]['name']}\n"
            elif notification["type"] == 3 or notification["type"] == 4:
                print({"$flatten": {"tasks": [notification["task"][0]["_id"]]}})
                plan = db.plan.find(
                    {"$flatten": {"tasks": [notification["task"][0]["plan"]]}}
                )

                message_obj["reference"] = {
                    "name": notification["task"][0]["taskName"],
                    "id": str(notification["task"][0]["_id"]),
                    # 'link': '/project/tasks'+str(plan['project'])
                }

                message += f"  in task {notification['task'][0]['taskName']} \n"
            message += "\n"
            message_obj["message"] = message
            messagelist.append(message_obj)

    return messagelist
