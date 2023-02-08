# script to  format the database
from pymongo import MongoClient


client = MongoClient("mongodb+srv://ayush:ayush@msc-sem-4.ix9cnu7.mongodb.net/?retryWrites=true&w=majority")
db = client.Users
# delete all collections in the database
#db.drop_collection('users')
db.drop_collection('projects')

#db['users']
db['projects']
