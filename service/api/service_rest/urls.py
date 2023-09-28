from django.urls import path
from .views import api_list_technicians, api_show_technicians, api_list_appointments, api_show_appointments,api_finish_appointment, api_cancel_appointment


urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", api_show_technicians, name="api_show_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_show_appointments,name="api_show_appointments"),
    path("appointments/<int:id>/finish/",api_finish_appointment, name="api_finish_appointment"),
    path("appointments/<int:id>/cancel/",api_cancel_appointment, name="api_cancel_appointment")

]
