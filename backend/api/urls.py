from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('<int:id>', views.getstudentDetails),
    path('schedules/', views.getClassSchedules),
    path('student/<int:id>', views.getStudentData),
    path('student/enlisted/<int:id>', views.markEnlisted),
    path('delist/', views.delistOnClass),
    path('classes/', views.getClasses),
    path('add/classlist', views.addClassList),
    path('api/login/', views.login),
    path('auto-enlist/<int:id>', views.autoEnlist),


]
