import bcrypt


salt=bcrypt.gensalt()

def hash_value(value):
    return bcrypt.hashpw(bytes(value,'utf-8'),salt)
def check_has_value(value,hash):
    if bcrypt.checkpw(bytes(value,'utf-8'),hash):
        return True
    else:
        return False
