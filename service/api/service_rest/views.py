from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Appointment, Technician
from .encoder import TechnicianListEncoder, TechnicianDetailEncoder, AppointmentListEncoder, AppointmentDetailEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians}, encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician, encoder=TechnicianDetailEncoder, safe=False
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technicians(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician, encoder=TechnicianDetailEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician listed"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.filter(id=id).update(**content)
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician, encoder=TechnicianDetailEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician listed"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments}, encoder=AppointmentListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician listed"},
                status=404,
            )
        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment, encoder=AppointmentDetailEncoder, safe=False
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointments(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment, encoder=AppointmentDetailEncoder, safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No appointment listed"},
                status=404,
            )
    elif request.method == "DELETE":
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            Appointment.objects.filter(id=id).update(**content)
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment, encoder=AppointmentDetailEncoder, safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No appointment listed"},
                status=404,
            )

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.finished()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "No appointment listed"},
            status=404,
        )

@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.cancelled()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "No appointment listed"},
            status=404,
        )
