from webapp import app
from flask import request
from pymongo import MongoClient
from webapp.helpers.jwt import generateToken
from webapp import bcrypt
client = MongoClient(app.config['MONGO_URI'])
db = client.Users
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


@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']
    print(name, password)
    record = collection.find_one(
        {"email" if '@' in name else 'username': name}, {"_id": 1, "password": 1})

    if(record and bcrypt.check_password_hash(record['password'], password)):
        return {"data": "User found - Login successful", "token": generateToken(str(record['_id']))}, 200
    else:
        return {"message": "Invalid Credentials - Login Failed"}, 400


@app.route('/user/register', methods=['POST'])
def register():
    data = request.get_json()
    data['password'] = bcrypt.generate_password_hash(data['password'])
    is_registered = collection.insert_one(data)
    if(is_registered):
        return {"data": "Registered", "token": generateToken(str(is_registered.inserted_id))}, 200
    else:
        return {"message": "Invalid Details"}, 400


#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#    , return jsonify(logged_in_as=current_user)
