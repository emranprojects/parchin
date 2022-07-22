from django.conf import settings
from kavenegar import KavenegarAPI


def send_sms(phone_number: str, content: str) -> None:
    api = KavenegarAPI(settings.KAVENEGAR_TOKEN)
    params = {
        'sender': settings.KAVENEGAR_SENDER_NUMBER,
        'receptor': phone_number,
        'message': content
    }
    response = api.sms_send(params)
