from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def get_api_url(self):
        return reverse("api_show_technicians", kwargs={"id": self.id})


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE
    )

    def cancelled(self):
        status = "cancelled"
        self.status = status
        self.save()

    def finished(self):
        status = "finished"
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_show_appointments", kwargs={"id": self.id})

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = "created"
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    def __str__(self):
        return self.vin


class AccountVO(models.Model):
    employee_id=models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    is_active = models.BooleanField(null=True)
    updated = models.DateTimeField()
