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
