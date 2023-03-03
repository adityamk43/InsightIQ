from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# Generate Token Manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)

        # run this by removing raise_exception=True to see error on console
        # print(serializer.errors)

        # in case if raise_exception=True doesn't work then this will return as error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)

            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        # We use context to send extra data which is logged in user data
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user})

        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)

        # in case if raise_exception=True doesn't work then this will return as error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)

        # it may not be necessay to use is_valid in if condition similary we were sending serialzers.erros as 400 bad request which is aso not necessary as using raise_exception=True will automatically generate and return error if data is not valid!!
        # but since we have used it in if in previous views, we are using it in if here also to maintain consistency
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset Link send. Please check you Email'}, status=status.HTTP_200_OK)

        # in case if raise_exception=True doesn't work then this will return as error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})

        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset Successfully'}, status=status.HTTP_200_OK)

        # in case if raise_exception=True doesn't work then this will return as error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# From my understanding from internet, I have learned that tokens can't be destroyed between the lifespan of token creation(signed) and token expiration. Only Refresh Token can be blacklisted so that it cannot generate new access token, so hence this function is deprecated since, it made no sense to blaclist refresh token since, we are not using refresh token and only using access token in this project!!
# class LogoutAPIView(APIView):
#     renderer_classes=[UserRenderer]

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             access_token = request.data["access_token"]

#             # RefreshToken(access_token).blacklist()
#             RefreshToken(refresh_token).blacklist()

#             return Response({"msg": "Logout Done Successfully!"}, status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response({"msg": str(e)}, status=status.HTTP_400_BAD_REQUEST)
