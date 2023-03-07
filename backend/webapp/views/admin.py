from webapp import app
from flask import request
from bson import ObjectId
from webapp.helpers.jwt import generateToken
from flask_jwt_extended import jwt_required, get_jwt_identity
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


@app.route('/admin/users/update/<id>', methods=['POST'])
@jwt_required()
def role_update(id):
    data = request.get_json()
    collection.update({
        '_id': ObjectId(id)
    }, {
        '$set': {'roles': data['roles']}
    })
    return {}, 200
