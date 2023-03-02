from rest_framework import serializers
from .models import QA
from account.models import User

# QA serializer


class QASerializer(serializers.ModelSerializer):
    q_id = serializers.IntegerField(source="id", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="user",
        write_only=True
    )

    class Meta:
        model = QA
        fields = ('user_id', 'q_id', 'question', 'answer')
