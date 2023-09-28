from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician, AccountVO

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]

    def get_extra_data(self, o):
        count = AccountVO.objects.filter(employee_id=o.employee_id)
        return {"has_account": len(count) > 0}


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["vin", "customer", "reason", "date_time","technician", "status"]
    encoders = {"technician": TechnicianDetailEncoder()}


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["vin", "customer", "reason", "date_time","technician", "status", "id"]
    encoders = {"technician": TechnicianDetailEncoder()}