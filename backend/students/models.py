from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=180)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    grade = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"
