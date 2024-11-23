from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['image'] = user.image.url
        token['laboratory_id'] = user.laboratory_id
        token['laboratory_name'] = user.get_laboratory
        token['cash_register_name'] = user.get_cash_register
        token['is_superuser'] = user.is_superuser
        return token














