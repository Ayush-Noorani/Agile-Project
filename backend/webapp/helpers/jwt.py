
from flask_jwt_extended import create_access_token, set_access_cookies
from flask import jsonify
from datetime import timedelta

def generateToken(id):
    print("Token generation")
    access_token = create_access_token(
        identity=id, expires_delta=timedelta(days=30))
    resp = jsonify({'_id': id, 'token': access_token})
    set_access_cookies(resp, access_token)
    return access_token


