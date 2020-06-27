from rest_framework import serializers
from .models import ToDo


class ToDoSerializer(serializers.ToDoSerializer):    

    class Meta:
        model = ToDo
        fields = ('user_name','todo_title','todo_data')
