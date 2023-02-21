from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
collection = db.user_details


@app.route('/admin/users', methods=['GET'])
def get_users():
    users = list(collection.find({},
                                 {'roles': 1, 'username': 1, 'email': 1, 'dob': 1, 'name': 1, '_id': 1}))

    for user in users:
        user['id'] = str(user['_id'])
        user.pop("_id")
    print(users)
    return {'users': users}, 200
