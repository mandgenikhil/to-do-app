from django.db import models
 
class ToDo(models.Model):
    todo_id = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    todo_title = models.CharField(max_length=100)
    todo_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    