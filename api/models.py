from django.db import models
from django.conf import settings
# Create your models here.

# question answer model
class QA(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question=models.CharField(max_length=1000);
    answer=models.CharField(max_length=5000);

    def __str__(self):
        return  "U: " + self.user + "\nQ: " +self.question + "\nA: " + self.answer