from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import app, db, socketio
from flask_socketio import emit
import jwt

from webapp import bcrypt
from webapp import db
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import json
from flask import send_file
from webapp.helpers.notification import get_notfication
collection = db.notifications


@app.route("/notifications/list", methods=["GET"])
@jwt_required()
def get_notification_list():
    id = get_jwt_identity()
    data = get_notfication(id)
    return {'notifications': data}, 200


@app.route('/notification/read')
@jwt_required()
def notification_read():
    id = get_jwt_identity()
    db.notifications.update_many({"user_id": ObjectId(id)}, {'$set': {
        'read': True
    }})
    return {'message': 'success'}, 200


@socketio.on('notification-list')
def handle_notification(token):
    if token:
        decoded = jwt.decode(
            token, app.config["SECRET_KEY"], algorithms=["HS256"])
        user_id = decoded["sub"]
        data = get_notfication(user_id)
        emit('notification', data, broadcast=True)
