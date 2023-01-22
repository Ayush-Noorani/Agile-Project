from webapp import app
from flask import request
from pymongo import MongoClient

client = MongoClient(app.config['MONGO_URI'])
db = client.Users
collection = db.user_details
# from webapp.models.user_model import user_model
# make an end point private by
# import
# from flask_jwt_extended jwt_required get_jwt_identity
#to generate token import 
# from webapp.helpers.jwt import generateToken





@app.route('/')
def root():
    return {'message': 'Hello, World!'},200

@app.route('/user/login', methods=['POST'])
def login():
    data=request.get_json()
    username = data['username']
    password = data['password']
    print(username, password)
    record = collection.find_one({"username": username, "password": password})
    if(record):
        return {"message": "User found - Login successful"},200
    else:
        return {"message": "No such user found - Login Failed"},400 


@app.route('/user/register', methods=['POST'])
def register():
    data=request.get_json()
    isRegistered = collection.insert_one(data)
    if(isRegistered):
        return {"message":"Registered"},200
    else:
        return {"message":"Failed"},400

    



#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#    , return jsonify(logged_in_as=current_user)