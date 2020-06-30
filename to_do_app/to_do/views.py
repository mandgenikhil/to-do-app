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

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from django.http import JsonResponse, HttpResponse
from .models import ToDo
import json
from .permissions import IsOwnerOrReadOnly, IsAuthenticated
from datetime import datetime


def api_response(response):
    return HttpResponse(json.dumps(response), content_type="application/json",status=status.HTTP_200_OK)


class to_do(RetrieveUpdateDestroyAPIView):    
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)    
    def get(self, request):        
        try:
            print("user name = ",request.user)
            todos = ToDo.objects.all().filter(user_name = str(request.user)).order_by('-created_at')                  
            result_list = []
            for val in todos:
                result_list.append({
                    "user_name":val.user_name,
                    "todo_id":val.todo_id,
                    "todo_title":val.todo_title,
                    "todo_data":val.todo_data,
                    "created_at":str(val.created_at),
                    "updated_at":str(val.updated_at)
                })
        
            return api_response({"response":result_list})
        except Exception as e:            
            return HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class edit_to_do(RetrieveUpdateDestroyAPIView):    
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)    
    def post(self, request):
        try:        
            received_json_data=json.loads(request.body)    
            todo_id = received_json_data['todo_id']            
            todo_data = received_json_data['todo_data']

            todo_value = ToDo.objects.get(user_name=request.user,
                            todo_id=str(todo_id)                         
                            )

            todo_value.todo_data =  todo_data                       

            todo_value.save()                                        
            return api_response({"response":"sucess"})
        except Exception as e:
            print("Exception due to = ",e)            
            HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class delete_to_do(RetrieveUpdateDestroyAPIView):    
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)    
    def post(self, request):
        try:            
            received_json_data=json.loads(request.body)
            todo_id = received_json_data['todo_id']            
            todos = ToDo.objects.filter(todo_id=todo_id).delete()                            
            return api_response({"response":"sucess"})
        except Exception as e:                     
            HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class save_to_do(RetrieveUpdateDestroyAPIView):    
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)    
    def post(self, request):
        try:            
            print("headers = ",request.headers)
            received_json_data=json.loads(request.body)
            print("json data = ",received_json_data)
            todo_title = received_json_data['todo_title']
            print("todo_title = ",todo_title)
            todo_data = received_json_data['todo_data']
            print("todo_data = ",todo_data)
            todo_value = ToDo(user_name=request.user,
                         todo_id=str(request.user) +str(datetime.now()),
                         todo_title=todo_title,
                         todo_data = todo_data,
                        )          
            todo_value.save()                                                      
            return api_response({"response":"sucess"})
        except Exception as e:            
            print("Exception = ",e)
            HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

    def post(self, request, *args, **kwargs):
        received_json_data=json.loads(request.body)
        
        if "key" in received_json_data  and received_json_data['key']  == "test123!@#":
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
        else :

            content = {"message":"please provide valid key"}
            
            return Response(content,
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        )

        

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        complete_signup(self.request._request, user, None, None)
        return user
