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
                                 {'roles': 1, 'username': 1, 'email': 1, 'dob': 1, 'name': 1, '_id': 1, 'active': 1}))

    for user in users:
        user['id'] = str(user['_id'])
        user.pop("_id")
    return {'users': users}, 200


@app.route('/admin/user/update/<id>', methods=['POST'])
@jwt_required()
def role_update(id):
    data = request.get_json()
    collection.update({
        '_id': ObjectId(id)
    }, {
        '$set': {'roles': data['roles']}
    })
    return {}, 200


@app.route('/admin/user/delete/<id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    try:
        collection.delete_one({
            '_id': ObjectId(id)
        })
    except Exception as e:
        return {'message': 'User not found'}, 404
    return {}, 200


@app.route('/admin/user/activate/<id>', methods=['POST'])
@jwt_required()
def activate_user(id):
    try:
        collection.update({
            '_id': ObjectId(id)
        }, {
            '$set': {'active': True}
        })
    except Exception as e:
        return {'message': 'User not found'}, 404
    return {}, 200


@app.route('/admin/user/deactivate/<id>', methods=['POST'])
@jwt_required()
def deactivate_user(id):
    try:
        collection.update({
            '_id': ObjectId(id)
        }, {
            '$set': {'active': False}
        })
    except Exception as e:
        return {'message': 'User not found'}, 404
    return {}, 200
