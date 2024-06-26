from rest_framework import serializers
from enlistment.models import Department, Teacher, ClassModel, IPS, CurriculumClasses, Student, Class, ClassList

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ClassListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassList
        fields = '__all__'
        # fields = ["student_id"]

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class ClassModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassModel
        fields = '__all__'

class IPSSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPS
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    course_code= IPSSerializer(read_only=True)
    class Meta:
        model = Student
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    department_id = DepartmentSerializer(read_only=True)
    class_code = ClassModelSerializer(read_only=True)
    instructor_id = TeacherSerializer(read_only=True)
    class Meta:
        model = Class
        fields = '__all__'