from unittest.mock import patch, MagicMock

from django.test import TestCase
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_201_CREATED


class LoginWithSmsTest(TestCase):
    @patch('main.utils.send_sms')
    def test_token_should_be_returned_when_auth_code_is_sent(self, mocked_send_sms):
        resp = self.client.post("/api/login/request-code/",
                                data={
                                    'recaptcha': 'test',
                                    'phone_number': '+989120001122',
                                })
        phone_number, auth_code = mocked_send_sms.call_args.args
        self.assertEqual(resp.status_code, HTTP_202_ACCEPTED)
        resp = self.client.post("/api/login/submit-code/",
                                data={
                                    'recaptcha': 'test',
                                    'phone_number': '+989120001122',
                                    'auth_code': auth_code,
                                })
        self.assertEqual(resp.status_code, HTTP_201_CREATED, resp.content)
        self.assertTrue('token' in resp.data)

    @patch('main.utils.send_sms')
    def test_sms_is_not_sent_to_invalid_phone_number(self, mocked_send_sms: MagicMock):
        self.client.post("/api/login/request-code/",
                         data={
                             'recaptcha': 'test',
                             'phone_number': '123456',
                         })
        mocked_send_sms.assert_not_called()
