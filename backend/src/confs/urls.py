#from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include


urlpatterns = [
    # React frontend
    path('', TemplateView.as_view(template_name='base.html')),
]
