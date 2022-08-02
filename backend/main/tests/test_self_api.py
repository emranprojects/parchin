from django.test import TestCase
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from main.models.user import User


class SelfUserAPITest(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(phone_number='+989121234567')
        self.client.force_login(self.user)

    def test_can_update_name(self):
        resp: Response = self.client.put("/api/users/self/", {
            "first_name": "emran"
        }, content_type="application/json")
        self.assertEqual(resp.status_code, HTTP_200_OK, resp.content)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "emran")

    def test_cant_update_phone_number(self):
        self.client.put("/api/users/self/", {
            "phone_number": "+989359876543"
        }, content_type="application/json")
        self.user.refresh_from_db()
        self.assertEqual(self.user.phone_number, "+989121234567")

    def test_can_delete_self(self):
        self.client.delete("/api/users/self/")
        with self.assertRaises(User.DoesNotExist):
            self.user.refresh_from_db()
