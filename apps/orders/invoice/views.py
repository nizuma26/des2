import json

from django.db import transaction

from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response

from .serializers import InvoiceSerializer, InvoiceListSerializer, OrderToBillSerializer
from ..models import OrderInvoice, Order, Patient, Affiliation
from ..choices import INVOICE_STATUS_CHOICES

MODULE_NAME = "Factura"
MODULE_NAME_PLURAL = "Facturas"

class OrderInvoiceViewSet(ModelViewSet):
    serializer_class = InvoiceSerializer

    def get_queryset(self, pk=None, state=None):

        queryset = OrderInvoice.objects.select_related('order').order_by('-invoice_date')

        if state is not None:
            return queryset.filter(status=state)
        
        elif pk is not None:
            return get_object_or_404(OrderInvoice, pk)
        
        return queryset
    
    def list(self, request):
        param = request.query_params.get('status', None)
        data = {}
        
        if param is None:
            data = self.get_queryset()

        elif any(param.capitalize() in tup for tup in INVOICE_STATUS_CHOICES):
            data = self.get_queryset(state=param.capitalize())
        
        else:
            return Response({"error": "el valor proporcionado en el parametro 'state' no es valido"})
        
        serializer = InvoiceListSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        data = request.data
        data['orders'] = json.loads(data['orders'])

        # if data == "Contado" and order.balance > 0:
        #     return Response(
        #         {"error": "Debe pagar totalmente la orden para generar la factura"},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response(
                    {'message': f'{MODULE_NAME} generada exitosamente!', 'data': serializer.data}, 
                    status=status.HTTP_201_CREATED
                )   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='search-client')
    def search_client(self, request):

        filter_by = request.query_params.get("filter-by", "")
        data = []
        try:
            if filter_by == "Persona":
                patients = Patient.objects.filter(is_active=True).values("id", "cedula", "names", "last_names", "address", "phone_number")
                for i in patients:
                    item = {
                        "id": i['id'],
                        "client_name": i['names'] + i['last_names'],
                        "ci_or_rif": i['cedula'],
                        "phone_number": i['phone_number'],
                        "address": i['address'],
                    }
                    data.append(item)

            elif filter_by == "Empresa":
                companies = Affiliation.objects.filter(is_active=True).values("id", "rif", "name", "phone_number", "address")
                for i in companies:
                    item = {
                        "id": i['id'],
                        "client_name": i['name'],
                        "ci_or_rif": i['rif'],
                        "phone_number": i['phone_number'],
                        "address": i['address'],
                    }
                    data.append(item)
            return Response(data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['GET'], url_path='order-to-bill')
    def order_to_bill(self, request):

        filter_by = request.query_params.get("filter_by", "")
        client_id = request.query_params.get("client_id", None)
        start_date = request.query_params.get("start_date", None)
        end_date = request.query_params.get("end_date", None)
        queryset = Order.objects.prefetch_related('order_detail').filter(is_invoiced=False)

        if start_date is not None and end_date is not None:
            queryset = queryset.filter(order_date__range=[start_date, end_date])

        data = []
        try:
            if filter_by == "Persona" and client_id is not None:
                orders = queryset.filter(patient_id=int(client_id))
                serializer = OrderToBillSerializer(orders, many=True)
                data = serializer.data

            elif filter_by == "Empresa" and client_id is not None:
                orders = queryset.filter(affiliation_id=int(client_id))
                serializer = OrderToBillSerializer(orders, many=True)
                print("DATA: ", serializer.data)
                data = serializer.data

            return Response(data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
