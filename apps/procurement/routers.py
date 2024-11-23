from rest_framework.routers import DefaultRouter
from .supplier.views import SupplierViewSet
from .purchase_requisition.views import PurchaseRequisitionViewSet
from .purchase_order.views import PurchaseOrderViewSet
from .receiving_purchase.views import ReceivingPurchaseOrderViewSet
from .account_payable.views import AccountPayableViewSet, PaymentsToSupplierViewSet, DebtsToSuppliersViewSet

router = DefaultRouter()

router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'purchase-requisition', PurchaseRequisitionViewSet, basename='purchase-requisition')
router.register(r'purchase-order', PurchaseOrderViewSet, basename='purchase-order')
router.register(r'receiving-purchase', ReceivingPurchaseOrderViewSet, basename='receiving-purchase')
router.register(r'account-payable', AccountPayableViewSet, basename='account-payable')
router.register(r'account-payable-payments', PaymentsToSupplierViewSet, basename='account-payable-payments')
router.register(r'debt-to-suppliers', DebtsToSuppliersViewSet, basename='debts-to-suppliers')

urlpatterns = router.urls