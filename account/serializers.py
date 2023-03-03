from rest_framework import serializers
from .models import User
from xml.dom import ValidationErr
from django.core.exceptions import ValidationError
# imports necessary for sending reset pass email
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util


class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this bcz we need confirm password field in our Registration Request
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match")

        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        # to get logged in user
        user = self.context.get('user')

        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match")

        user.set_password(password)
        user.save()
        return attrs


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            # this function doesn't takes integer and takes bytes
            # using urlsafe so that we can use uid later on
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded UID: ', uid)

            token = PasswordResetTokenGenerator().make_token(user)
            print("Password Reset Token: ", token)

            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Password Reset Link: ', link)

            # Send Email Code
            body = 'Click the below following Link to Reset your Password\n'+link
            data = {
                'email_subject': 'Reset your password',
                'body': body,
                'to_email': user.email
            }

            Util.send_email(data)

            return attrs
        else:
            raise ValidationError('You are not a Registered User')


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')

            # to get uid and token
            uid = self.context.get('uid')
            token = self.context.get('token')

            if password != password2:
                raise serializers.ValidationError(
                    "Password and Confirm Password doesn't match")

            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationError('Token is not Valid or is Expired')

            user.set_password(password)
            user.save()
            return attrs
        
        except DjangoUnicodeDecodeError as indentifier:
            if not  PasswordResetTokenGenerator.check_token(user, token):
                raise ValidationError('Token is not Valid or is Expired')
