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


@app.route('/test/delete')
def delete():
    collection.delete_many({})
    return {'message': 'Hello, World!'}, 200


#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#    , return jsonify(logged_in_as=current_user)
