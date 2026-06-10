from django.db import migrations


def reset_admin_password(apps, schema_editor):
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


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_create_default_data'),
    ]

    operations = [
        migrations.RunPython(reset_admin_password),
    ]