from rest_framework import serializers

from apps.orders.models import Patient, PatientAffiliation

# ------------------------------------------------

class PatientSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Patient
        fields = "__all__"

    def create(self, validated_data):

        affiliations = self.initial_data.get('affiliations', [])

        patient = Patient.objects.create(**validated_data)

        if len(affiliations) > 0:
            self.save_affiliations(patient, affiliations)

        return patient
    
    def update(self, instance, validated_data):

        affiliations = self.initial_data.get('affiliations', [])

        patient = super().update(instance, validated_data)

        if len(affiliations) > 0:
            self.save_affiliations(patient, affiliations, update=True)

        return patient
    
    def save_affiliations(self, patient, affiliations, update=False):
        
        if update:
            patient.affiliations.all().delete()

        patient_affiliation_list = []

        for i in affiliations:
            patient_affiliation = PatientAffiliation(
                patient=patient,
                affiliation_id=i["id"]
            )
            patient_affiliation_list.append(patient_affiliation)
        
        PatientAffiliation.objects.bulk_create(patient_affiliation_list)

class PatientListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = (
            "id", 
            "full_name", 
            "cedula", 
            "birthdate", 
            "email", 
            "gender", 
            "phone_number"
        )

class PatientAffiliationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientAffiliation
        exclude = ("is_active")

    def to_representation(self, instance):
        return {
            "id": instance.affiliation.id,
            "name": instance.affiliation.name,
            "concept": instance.affiliation.concept,
            "value": instance.affiliation.value,
            "price_type": instance.affiliation.price_type
        }

class PatientRetrieveSerializer(serializers.ModelSerializer):

    affiliations = PatientAffiliationSerializer(many=True)

    class Meta:
        model = Patient
        fields = (
            "id", 
            "names", 
            "last_names", 
            "cedula", 
            "email", 
            "birthdate",
            "phone_number",
            "address",
            "gender",
            "is_active",
            "affiliations"

        )