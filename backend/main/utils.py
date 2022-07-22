from django.conf import settings
from kavenegar import KavenegarAPI, APIException


def send_sms(phone_number: str, code: str) -> None:
    api = KavenegarAPI(settings.KAVENEGAR_TOKEN)
    params = {
        'receptor': phone_number,
        'template': 'verifyParchin',
        'token': code,
    }
    response = api.verify_lookup(params)
