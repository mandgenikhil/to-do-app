from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from rest_auth.models import TokenModel
from rest_auth.views import LoginView
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from django.contrib.auth.models import User

import os
from django.views.static import serve
from django.shortcuts import render
# from chatbot.settings import LOGOUT_URL
from django.conf.urls import url

def home(request):
    return render(request,'/Dashboard/Home')

    
def index(request):
    """Method to serve the default index.html React Page.

    Args:
        request: HttpRequest Object.
        page: The page user is trying to visit.

    Returns:
        Static index.html page content.
    """
    if request.method == 'GET':        
        return render(request, 'build/index.html')
        # session = get_user_session(request, is_debug=True)               
        

    
    


def static_file_handler(request, folder, file):
    """Method to serve static files.
    The default static file middleware does not work in Azure Web App.

    Args:
        request: HttpRequest Object
        folder: Folder where the static file is stored (for e.g. media, js, css)
        file: Actual file name.

    Returns:
        The static file content.
    """
    if request.method == 'GET':
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        print("Base Dir = ",BASE_DIR)
        REACT_TEMPLATE_PATH = os.path.join(BASE_DIR, 'to_do_app', 'templates')        
        static_file_path = os.path.join(REACT_TEMPLATE_PATH, "build", "static", folder, file)

        print("static_file_path = ",static_file_path)
        
        return serve(request, os.path.basename(static_file_path), os.path.dirname(static_file_path))

sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters('password1', 'password2')
)


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = register_permission_classes()
    token_model = TokenModel

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(RegisterView, self).dispatch(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        content = {
            "details": "Registered"
        }
        return Response(content,
                        status=status.HTTP_201_CREATED,
                        headers=headers)

    def perform_create(self, serializer):
        user = serializer.save(self.request)

        complete_signup(self.request._request, user, None, None)
        return user


class CustomLoginView(LoginView):
    
    def get_response(self):
        orginal_response = super().get_response()

        custom_response = {"user": {
            "username": self.user.username,
            "email": self.user.email
        }}
        
        orginal_response.data.update(custom_response)
        return orginal_response