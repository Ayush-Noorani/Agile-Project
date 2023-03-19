from webapp import app
from flask import request
from pymongo import MongoClient
from flask_jwt_extended import jwt_required, get_jwt_identity

from webapp.helpers.jwt import generateToken
from webapp import bcrypt
from webapp import db
from bson import ObjectId


collection = db.user_details
# from webapp.models.user_model import user_model
# make an end point private by
# import
# from flask_jwt_extended jwt_required get_jwt_identity
# to generate token import
# from webapp.helpers.jwt import generateToken


@app.route('/')
def root():
    return {'message': 'Hello, World!'}, 200


@app.route("/user/info")
@jwt_required()
def user_info():
    id = get_jwt_identity()
    data = collection.find_one({'_id': ObjectId(id)}, {
        "_id": 0, 'email': 1, 'username': 1, 'roles': 1, '_id': 1, 'color': 1})
    data.pop("_id")
    return data, 200


@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']
    record = collection.find_one(
        {"email" if '@' in name else 'username': name}, {"_id": 1, "password": 1, 'email': 1, 'username': 1, 'roles': 1, '_id': 1, 'color': 1})
    print("data")

    if (record and bcrypt.check_password_hash(record['password'], password)):
        return {"data": "User found - Login successful", "token": generateToken(str(record['_id'])), 'username': record['username'], 'email': record['email'], 'roles': record['roles'], 'id': str(record['_id'])}, 200
    else:
        return {"message": "Invalid Credentials - Login Failed"}, 400


@app.route('/user/register', methods=['POST'])
def register():
    data = request.get_json()
    data['password'] = bcrypt.generate_password_hash(data['password'])
    data['roles'] = ['user']
    is_registered = collection.insert_one(data)
    if (is_registered):
        return {"data": "Registered", "token": generateToken(str(is_registered.inserted_id))}, 200
    else:
        return {"message": "Invalid Details"}, 400


@app.route('/user/update-details', methods=['POST'])
@jwt_required()
def updateDetails():
    data = request.get_json()
    username = data['username']
    if (username == '' or username == None):
        return {'message': 'Username cannot be empty'}, 304
    else:
        password = bcrypt.generate_password_hash(data['password'])
        record = collection.find_one({"email": data['email']})
        if (record and bcrypt.check_password_hash(record['password'], password)):
            return {"message": "New password and Old password cannot be the same"}, 304
        else:
            result = collection.update_one({"email": data['email']}, data)
            newData = collection.find_one({"email": data['email']})
            return {"message": "User details updated successfully", "data": newData}, 200

# save image route


@app.route('/user/save-image/<id>', methods=['PUT'])
@jwt_required()
def saveImage(id):
    img = request.files['img']
    img.save(app.config["UPLOAD_FOLDER"]+"\\profile\\" +
             str(id)+"."+"png")
    return {}, 200
#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#    , return jsonify(logged_in_as=current_user)
