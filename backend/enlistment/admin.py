from django.contrib import admin
from .models import Department, Teacher, ClassModel, IPS, CurriculumClasses, Student, Class, ClassList

# Register your models here.
class DepartmentAdmin(admin.ModelAdmin):
    model = Department

class TeacherAdmin(admin.ModelAdmin):
    model = Teacher

class ClassModelAdmin(admin.ModelAdmin):
    model = ClassModel

class IPSAdmin(admin.ModelAdmin):
    model = IPS

class CurriculumClassesAdmin(admin.ModelAdmin):
    model = CurriculumClasses

class StudentAdmin(admin.ModelAdmin):
    model = Student

class ClassAdmin(admin.ModelAdmin):
    model = Class

class ClassListAdmin(admin.ModelAdmin):
    model = ClassList


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(ClassModel, ClassModelAdmin) 
admin.site.register(IPS, IPSAdmin) 
admin.site.register(CurriculumClasses, CurriculumClassesAdmin) 
admin.site.register(Student, StudentAdmin) 
admin.site.register(Class, ClassAdmin) 
admin.site.register(ClassList, ClassListAdmin) 