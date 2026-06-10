from django.db import migrations


def create_default_data(apps, schema_editor):
    Student = apps.get_model('students', 'Student')
    User = apps.get_model('auth', 'User')

    user, created = User.objects.get_or_create(
    username='admin',
    defaults={
        'email': 'admin@example.com',
        'is_staff': True,
        'is_superuser': True,
    }
)

    user.set_password('adminpass')
    user.is_staff = True
    user.is_superuser = True
    user.save()

    if not Student.objects.exists():
        Student.objects.create(name='Maria Rivera', email='maria.rivera@example.com', age=15, grade='10')
        Student.objects.create(name='David King', email='david.king@example.com', age=17, grade='12')
        Student.objects.create(name='Sophia Turner', email='sophia.turner@example.com', age=14, grade='9')


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_data),
    ]
