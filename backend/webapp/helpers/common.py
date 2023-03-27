
import codecs


def decode_base64(img):

    if img != '':
        return str(codecs.encode(img, 'base64'))

    return ""
