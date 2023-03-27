
import codecs


def decode_base64(img):

    if img != '':
        return codecs.encode(img, 'base64')

    return ""
