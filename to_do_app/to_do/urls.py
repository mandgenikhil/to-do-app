from django.urls import include, path, re_path
from . import views


urlpatterns = [    
    path('api/v1/to_do', 
        views.to_do.as_view(),
        name='to_do'
    ),
    path('api/v1/edit_to_do', 
        views.edit_to_do.as_view(),
        name='edit_to_do'
    ),
    path('api/v1/delete_to_do', 
        views.delete_to_do.as_view(),
        name='delete_to_do'
    ),
    path('api/v1/save_to_do', 
        views.save_to_do.as_view(),
        name='save_to_do'
    ),    
    path('api/v1/register', 
        views.RegisterView.as_view(),
        name='register'
    ),
]