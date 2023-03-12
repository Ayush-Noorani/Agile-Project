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
        "created_by": creator_id
    }
    for user_id in user_ids:
        notification['user_id'] = user_id

        collection.insert_one(notification)
