from pymongo import MongoClient

from flask import Flask
from flask_pymongo import PyMongo
import gridfs

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)

import config
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
# mongodb_client = PyMongo(app)
# db=mongodb_client.db
# #file storage part
# fs=gridfs.GridFS(db)

CORS(app)
socketio = SocketIO(app)


socketio = SocketIO(app, cors_allowed_origins='*')
client = MongoClient(app.config['MONGO_URI'])
db = client.Users

# all models,view,forms are imported here
# model


# views
# all end points need to be  inside view folder
# create a file for end points related to a particular model
#example: user.py
import webapp.views.test
import webapp.views.project
import webapp.views.user

# forms
