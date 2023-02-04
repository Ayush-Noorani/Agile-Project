# script to  format the database
from flask_pymongo import PyMongo
from pymongo import MongoClient


import config
client = MongoClient(app.config['MONGO_URI'])
db = client.Users
# delete all collections in the database
db.drop_collection('users')
db.drop_collection('projects')

db['users']
db['projects']
