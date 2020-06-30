"""to_do_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url,re_path
from .views import CustomLoginView
from . import views

urlpatterns = [
    path("", views.index),
    path("static/<str:folder>/<str:file>", views.static_file_handler),    
    url(r'^', include('to_do.urls')),
    url(r'^rest-auth/login/', CustomLoginView.as_view()),        
    re_path(r'^/*', views.index)    
]
