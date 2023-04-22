
import codecs
from bson import ObjectId


def decode_base64(img):

    if img != '':
        base_64 = str(codecs.encode(img, 'base64'))

        return base_64

    return ""


def convert_data_to_str(obj):
    new_obj = obj.copy()
    for key, value in new_obj.items():
        if key == '_id' and isinstance(value, ObjectId):
            obj['id'] = str(value)
            obj.pop('_id')
        elif key != '_id' and isinstance(value, ObjectId):
            obj[key] = str(value)
        elif isinstance(value, dict):
            obj[key] = convert_data_to_str(value)
        elif isinstance(value, list):
            data = []
            for item in value:
                if isinstance(item, dict):
                    data.append(convert_data_to_str(item))
                else:
                    data.append(item)
            obj[key] = data
        elif isinstance(value, bytes):
            obj[key] = decode_base64(value)
    return obj
