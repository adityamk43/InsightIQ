from django.db import models

# Create your models here.

# question answer model
class QA(models.Model):
    question=models.CharField(max_length=1000);
    answer=models.CharField(max_length=5000);

    def __str__(self):
        return  "Q: " +self.question + "\nA: " + self.answer