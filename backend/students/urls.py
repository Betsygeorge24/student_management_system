from django.urls import path
from .views import login_view, student_list_create_view, student_retrieve_update_delete_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('students/', student_list_create_view, name='students-list-create'),
    path('students/<int:pk>/', student_retrieve_update_delete_view, name='student-detail'),
]
