from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime
#import hashlib

# Create your models here.
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    def __str__(self):
        return self.department_name

class Teacher(models.Model):
    instructor_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE)
    def __str__(self):
        return self.first_name + " " + self.last_name

class ClassModel(models.Model):
    # class_id = models.AutoField(primary_key=True)
    class_code = models.CharField(primary_key=True, max_length=15)
    class_name = models.CharField(max_length=50)
    units = models.IntegerField(default=1, validators=[
                                MaxValueValidator(6), MinValueValidator(1)])
    prerequisite = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE)
    is_major = models.BooleanField()
    # students = models.ManyToManyField(
    #     Student, through='ClassList',  through_fields=('class_code', 'student_id'))
    def __str__(self):
        return self.class_code



class IPS(models.Model):
    course_code = models.CharField(primary_key=True, max_length=10)
    course_name = models.CharField(max_length=100)
    subjects = models.ManyToManyField(
        ClassModel, through="CurriculumClasses",  through_fields=('course_code','class_code'))
    def __str__(self):
        return self.course_code

class CurriculumClasses(models.Model):
    course_code = models.ForeignKey(IPS, on_delete=models.CASCADE)
    class_code = models.ForeignKey(ClassModel, on_delete=models.CASCADE)
    year = models.IntegerField(default=1, validators=[
                                MaxValueValidator(5), MinValueValidator(1)])
    sem = models.IntegerField(default=1, validators=[
                                MaxValueValidator(2), MinValueValidator(0)])
    def __str__(self):
        return self.class_code.class_code + " is added to " + self.course_code.course_code

class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    course_code = models.ForeignKey(IPS, on_delete=models.CASCADE)
    birthday = models.DateField(help_text='MM/DD/YYYY')
    age = models.PositiveIntegerField(default=18, editable=False)
    year_level = models.PositiveIntegerField(default=1, validators=[
                                MaxValueValidator(7), MinValueValidator(1)])
    is_regular = models.BooleanField(default=True)
    is_enlisted = models.BooleanField(default=False)
    password = models.CharField(max_length=128, default='')
    # classes = models.ManyToManyField(
    #     ClassList, through='ClassList',  through_fields=('student_id','class_code'))
    def save(self, *args, **kwargs):
        self.age = int((datetime.now().date() - self.birthday).days / 365.25)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.first_name + " " + self.last_name

    #def set_password(self, password):
    #    self.password = hashlib.sha256(password.encode('utf-8')).hexdigest()

    #def check_password(self, password):
    #    return self.password == hashlib.sha256(password.encode('utf-8')).hexdigest()

class Class(models.Model):
    class_id = models.AutoField(primary_key=True)
    class_code = models.ForeignKey(ClassModel, on_delete=models.CASCADE)
    # student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    class_section = models.CharField(max_length=4)
    room = models.CharField(max_length=15)
    max_slots= models.IntegerField(default=1, validators=[
                                MaxValueValidator(99), MinValueValidator(0)])
    available_slots= models.IntegerField(default=-1, editable=False)
    #avaible slots = pre computed
    instructor_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=20, choices=(("MTh", "Mondays & Thursdays"), ("TF", "Tuesdays & Fridays"), ("W", "Wednesdays"),
                                                          ("Sat", "Saturday")))
    start_time = models.TimeField(help_text='HH:MM')
    minutes_per_session = models.PositiveIntegerField(validators=[
                                MaxValueValidator(300), MinValueValidator(0)])
    school_year = models.CharField(max_length=20, choices=(("21", "2021-2022"), ("22", "2022-2023"), ("23", "2023-2024"),
                                                          ("24", "2024-2025")))
    sem = models.IntegerField(default=1, validators=[
                                MaxValueValidator(2), MinValueValidator(0)])
    language = models.CharField(max_length=10, choices=(("E", "Eng"), ("F", "Fil")))
    students = models.ManyToManyField(
        Student, through='ClassList',  through_fields=('class_id', 'student_id'))
    
    def save(self, *args, **kwargs):
        if(self.available_slots == -1):
            self.available_slots = self.max_slots
        return super().save(*args, **kwargs)
    def __str__(self):
        return self.class_code.class_code + " - "  + self.class_section

class ClassList(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    is_void = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if(self.is_void == False):
            c = Class.objects.get(class_id=self.class_id.class_id)
            if(c.available_slots > 0):
                c.available_slots -= 1
                c.save()
            else:
                self.student_id = 0
                self.class_id = 0
        return super().save(*args, **kwargs)
    
    def delist(self):
        if(self.is_void == False):
            self.is_void = True
            self.save()
            c = Class.objects.get(class_id=self.class_id.class_id)
            c.available_slots += 1
            c.save()
        

    
    def __str__(self):
        return self.student_id.last_name + " added to " + self.class_id.class_code.class_code +  " - " + self.class_id.class_section




