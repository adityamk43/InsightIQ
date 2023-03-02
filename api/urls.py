from django.contrib import admin
from django.urls import path
from .views import generateAnswerView

urlpatterns = [
    path('answer/', generateAnswerView.as_view(), name="answer"),
    path('answer/', generateAnswerView.as_view(), name='qa-list'),
]
