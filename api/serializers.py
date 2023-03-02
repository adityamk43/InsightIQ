from rest_framework import serializers
from .models import QA

# QA serializer
class QASerializer(serializers.ModelSerializer):
    q_id=serializers.IntegerField(source="id", read_only=True)
    class Meta:
        model=QA
        fields=('q_id', 'question', 'answer')