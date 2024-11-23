from rest_framework import serializers

class MostRequestedLabTestSerializer(serializers.Serializer):
    uuid = serializers.CharField(source='lab_test_id')
    name = serializers.CharField(source='lab_test__name')
    category = serializers.CharField(source='lab_test__category__name')
    total_requests = serializers.IntegerField()
