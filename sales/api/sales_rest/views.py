from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Salespeople, Customer, Sale
import decimal

# Create your views here.


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "import_href",
    ]


class SalesPeopleListEncoder(ModelEncoder):
    model = Salespeople
    properties = ["first_name", "last_name", "employee_id", "id"]


class SalesPeopleDetailEncoder(ModelEncoder):
    model = Salespeople
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "phone_number", "address", "id"]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number"]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salespeople", "customer", "price", "id"]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salespeople", "customer", "price", "id"]
    encoders = {
        "automobile": AutomobileVOListEncoder(),
        "salespeople": SalesPeopleDetailEncoder(),
        "customer": CustomerDetailEncoder()
    }

    def get_extra_data(self, o):
        extra_data = {}
        if hasattr(o, 'price') and isinstance(o.price, decimal.Decimal):
            extra_data["price"] = str(o.price)
        return extra_data


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salespeople.objects.all()
        return JsonResponse(
            {"salespeople": salespeople}, encoder=SalesPeopleListEncoder
        )
    else:
        content = json.loads(request.body)
        salespeople = Salespeople.objects.create(**content)
        return JsonResponse(
            salespeople, encoder=SalesPeopleDetailEncoder, safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salespeople(request, id):
    if request.method == "GET":
        try:
            salespeople = Salespeople.objects.get(id=id)
            return JsonResponse(
                salespeople, encoder=SalesPeopleDetailEncoder, safe=False
            )
        except Salespeople.DoesNotExist:
            return JsonResponse(
                {"message": "No salespeople listed"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Salespeople.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Salespeople.objects.filter(id=id).update(**content)
        salespeople = Salespeople.objects.get(id=id)
        return JsonResponse(
            salespeople, encoder=SalesPeopleDetailEncoder, safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer}, encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer, encoder=CustomerDetailEncoder, safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No customer listed"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales}, encoder=SaleDetailEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_id = content["automobile"]
            automobile = AutomobileVO.objects.get(id=automobile_id)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "No Automobile"},
                status=404,
            )
        try:
            salespeople_id = content["salespeople"]
            salespeople = Salespeople.objects.get(id=salespeople_id)
            content["salespeople"] = salespeople
        except Salespeople.DoesNotExist:
            return JsonResponse(
                {"message": "No Salespeople"},
                status=404,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No Customer"},
                status=404,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale, encoder=SaleDetailEncoder, safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale, encoder=SaleListEncoder, safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No sale listed"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale, encoder=SaleListEncoder, safe=False
        )
