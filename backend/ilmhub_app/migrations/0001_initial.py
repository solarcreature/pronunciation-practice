# Generated by Django 4.1.5 on 2023-02-08 20:35

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=32, unique=True)),
                ('password', models.CharField(max_length=32)),
                ('is_active', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
                ('admin', models.BooleanField(default=False)),
                ('first_name', models.TextField(verbose_name='First Name')),
                ('last_name', models.TextField(verbose_name='Last Name')),
                ('role', models.TextField(blank=True, choices=[('Student', 'Student'), ('Parent', 'Parent'), ('Teacher', 'Teacher'), ('Content Creator', 'Content Creator')], null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('audio', models.TextField()),
                ('has_image', models.BooleanField(default=False)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ilmhub_app.chapter')),
            ],
        ),
        migrations.CreateModel(
            name='Tab',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='chapter',
            name='tab',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ilmhub_app.tab'),
        ),
        migrations.CreateModel(
            name='ContentCreator',
            fields=[
            ],
            options={
                'verbose_name_plural': 'Content Creators',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('ilmhub_app.user',),
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
            ],
            options={
                'verbose_name_plural': 'Parents',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('ilmhub_app.user',),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
            ],
            options={
                'verbose_name_plural': 'Students',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('ilmhub_app.user',),
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
            ],
            options={
                'verbose_name_plural': 'Teachers',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('ilmhub_app.user',),
        ),
        migrations.CreateModel(
            name='StudentLesson',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.TextField(choices=[('Assigned', 'Assigned'), ('Completed', 'Completed'), ('Confirmed', 'Confirmed')])),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ilmhub_app.lesson')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ilmhub_app.student')),
            ],
            options={
                'verbose_name': 'Student-Lesson',
                'verbose_name_plural': 'Student-Lessons',
            },
        ),
        migrations.CreateModel(
            name='ParentStudent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Users_Parent', to='ilmhub_app.parent')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Users_Student', to='ilmhub_app.student')),
            ],
            options={
                'verbose_name': 'Parent-Student',
                'verbose_name_plural': 'Parent-Students',
            },
        ),
        migrations.AddConstraint(
            model_name='studentlesson',
            constraint=models.UniqueConstraint(fields=('student', 'lesson'), name='Unique Student-Lesson Combination'),
        ),
        migrations.AddConstraint(
            model_name='parentstudent',
            constraint=models.UniqueConstraint(fields=('parent', 'student'), name='Unique Parent-Student Combination'),
        ),
    ]
