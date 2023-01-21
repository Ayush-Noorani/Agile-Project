from webapp import app
# make an end point private by
# import
# from flask_jwt_extended jwt_required get_jwt_identity
#to generate token import 
# from webapp.helpers.jwt import generateToken





@app.route('/')
def root():
    return {'message': 'Hello, World!'},200



#  example
# @app.route('/api/v1/private', methods=['GET'])
# @jwt_required()
# def private():
#     current_user = get_jwt_identity() //get user identity
#     return jsonify(logged_in_as=current_user), 200