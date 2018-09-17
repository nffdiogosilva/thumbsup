import json

from knox.models import AuthToken
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from django.urls import reverse


class LoginAPIViewTestCase(APITestCase):
    url = reverse('login')

    def setUp(self):
        self.thanos = {
            'username': 'purplesack',
            'email': 'purplesack@tirans.com',
            'password': 'infinitystones'
        }
        self.user = User.objects.create_user(self.thanos['username'], self.thanos['email'], self.thanos['password'])

    def test_authentication_without_password(self):
        """
        Assert response status code is 400 when password is not sent on request.
        """
        response = self.client.post(self.url, {'username': self.thanos['username']})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self):
        """
        Assert response status code is 400 when password is not valid.
        """
        response = self.client.post(self.url, {'username': self.thanos['username'], 'password': 'gamora'})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_registered_user(self):
        """
        Assert response status code is 200 when user data is valid.
        """
        response = self.client.post(self.url, self.thanos)
        self.assertEqual(200, response.status_code)
        self.assertTrue('token' in json.loads(response.content))


class LogoutAPIViewTestCase(APITestCase):
    url = reverse('logout')

    def setUp(self):
        peter_quill = {
            'username': 'star_lord',
            'email': 'star_lord@guardians.com',
            'password': 'gamora',
        }
        user = User.objects.create_user(peter_quill['username'], peter_quill['email'], peter_quill['password'])
        self.token = AuthToken.objects.create(user=user)

    def test_logout(self):
        """
        Assert logout is done properly when all data necessary is given.
        """
        self.assertTrue(AuthToken.objects.all().exists())

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.post(self.url)
        
        self.assertEqual(204, response.status_code)
        self.assertFalse(AuthToken.objects.all().exists())

    def test_logout_with_no_credentials(self):
        """
        Assert response status code is 401 when credentials (Authentication Token) are not given.
        """
        self.assertTrue(AuthToken.objects.all().exists())
        
        response = self.client.post(self.url)
        
        self.assertEqual(401, response.status_code)
        self.assertTrue(AuthToken.objects.all().exists())


class RegistrationAPIViewTestCase(APITestCase):
    url = reverse('register')

    def setUp(self):
        self.ironman = {
            'username': 'ironman',
            'email': 'ironman@avengers.com',
            'password': 'im_ironman',
            'confirm_password': 'im_ironman'
        }
        self.captainamerica = {
            'username': 'captainamerica',
            'email': 'captainamerica@avengers.com',
            'password': 'ilovebucky',
            'confirm_password': 'ilovebucky'
        }

    def test_invalid_mismatch_passwords(self):
        """
        Assert request don't create user when there's passwords that mismatch.
        """
        self.ironman['confirm_password'] = 'im_not_ironman'
        response = self.client.post(self.url, self.ironman)
        self.assertEqual(400, response.status_code)
        self.assertFalse(User.objects.filter(email=self.ironman['email']).exists())

    def test_user_registration(self):
        """
        Assert request can create a user when there's valid data.
        """
        response = self.client.post(self.url, self.captainamerica)
        self.assertEqual(201, response.status_code)
        self.assertTrue(User.objects.filter(email=self.captainamerica['email']).exists())

    def test_unique_user_registration(self):
        """
        Assert that no user can be registered twice.
        """
        self.assertFalse(User.objects.filter(email=self.ironman['email']).exists())
        
        response = self.client.post(self.url, self.ironman)
        self.assertEqual(201, response.status_code)

        self.assertTrue(User.objects.filter(email=self.ironman['email']).exists())

        # Try and register the same user again
        response = self.client.post(self.url, self.ironman)
        self.assertEqual(400, response.status_code)
