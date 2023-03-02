from django.contrib import admin
from .models import QA

# Register your models here.
# class QAModelAdmin(admin.ModelAdmin):
#     list_display=('user_id', 'id', 'question', 'answer')
#     list_filter=('user_id', 'id', 'question')
#     search_fields=('user_id', 'question', 'id')
    
#     class Meta:
#         model=QA

# admin.register(QA, QAModelAdmin)