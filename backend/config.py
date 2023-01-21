import os
from webapp import app
import datetime
app.config['SECRET_KEY']='' #secret key
app.config['MONGO_URI']='' #uri
app.config['JWT_ACCESSS_TOKEN_EXPIRES']=datetime.timedelta(days=300)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['JWT_COOKOE_SECURE']=False
app.config['UPLOAD_EXTENSIONS'] = ['jpg', 'png', 'gif','jpeg']
app.config['UPLOAD_FOLDER'] =os.path.join(os.path.dirname(app.instance_path), 'static')


app.config['JWT_TOKEN_LOCATION']=['headers']
app.config['JWT_SESSION_COOKIE']=False
app.config['MONGODB_SETTINGS']={
    'db':'portfolio',
    'host':'localhost',
    'port':'27017'
}
