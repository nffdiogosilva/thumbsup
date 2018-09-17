from django.views.generic import TemplateView
from django.urls import path, include


urlpatterns = [
    # ReST API
    path('api/', include('apiauth.urls')),

    # React frontend
    path('', TemplateView.as_view(template_name='base.html')),
]
