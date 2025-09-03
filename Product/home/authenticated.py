from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed



class FakeUser:
    def __init__(self, user_id):
        self.id = user_id
        self.is_authenticated = True

class MicroserviceJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")
        return FakeUser(user_id)