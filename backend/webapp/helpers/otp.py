import random
import math

def generateOtp():
    digits = '0123456789'
    OTP = ""
    for i in range(5):
        OTP += digits[math.floor(random()*10)]
    return OTP,'''<h3>Dear user, <br /> Your OTP is <b>'''+OTP+'''</b> </h3><br /><hr> <h3>Regards,<br />{}</h3>'''

