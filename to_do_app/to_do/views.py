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
            todos = ToDo.objects.all().filter(user_name = str(request.user))                    
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
            todo_id = request.POST['todo_id']            
            todo_data = request.POST['todo_data']

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
            todo_id = request.POST['todo_id']            
            todos = ToDo.objects.filter(todo_id=todo_id).delete()                
            return api_response({"response":"sucess"})
        except Exception as e:                     
            HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class save_to_do(RetrieveUpdateDestroyAPIView):    
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)    
    def post(self, request):
        try:            
            todo_title = request.POST['todo_title']
            todo_data = request.POST['todo_data']
            todo_value = ToDo(user_name=request.user,
                         todo_id=str(request.user) +str(datetime.now()),
                         todo_title=todo_title,
                         todo_data = todo_data,
                        )          
            todo_value.save()                                                      
            return api_response({"response":"sucess"})
        except Exception as e:            
            HttpResponse(str(e),status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        