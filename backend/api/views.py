from django.http import JsonResponse, HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from enlistment.models import Department, Teacher, ClassModel, IPS, CurriculumClasses, Student, Class, ClassList
from .serializers import StudentSerializer, ClassListSerializer, ClassSerializer
import json
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
def getData(request):
    # sample = {'name':'mikael', 'age':'21'}
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    # return Response(serializer.data)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getstudentDetails(request, id):
    try:
        student = Student.objects.get(pk=id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    classes = ClassList.objects.filter(student_id=id, is_void=False)

    student_schedule = []
    for c in classes:
        student_schedule.append(c.class_id.class_id)        
    # classes = ClassList.objects.
    # print(student_schedule)

    # print(Class.objects.filter(class_id__in=student_schedule))
    all_sched = Class.objects.filter(class_id__in=student_schedule)
    # print(Class.objects.filter(classD))

    # return Response(StudentSerializer(student).data)
    # return Response(ClassListSerializer(classes, many=True).data)
    return Response(ClassSerializer(all_sched, many=True).data)

@api_view(['GET'])
def getClasses(request):
    classes = Class.objects.all()
    return Response(ClassSerializer(classes, many=True).data)


@api_view(['GET'])
def getClassSchedules(request):
    dep_id = request.GET.get('dep_id', 'not found')
    sem = request.GET.get('sem', 'not found')
    yr = request.GET.get('yr', 'not found')

    try:
        department_id = Department.objects.get(pk=dep_id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)


    # classes = Class.objects.filter(department_id=department_id)
    classes = Class.objects.filter(department_id=department_id,sem=sem,school_year=yr)
    # all_sched = Class.objects.filter(class_id__in=classes)

    return Response(ClassSerializer(classes, many=True).data)
    # return Response(ClassSerializer(all_sched, many=True).data)


@api_view(['GET'])
def getStudentData(request, id):
    try:
        student = Student.objects.get(pk=id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    return Response(StudentSerializer(student).data)


def addClassList(request):

    student_id = request.GET.get('student_id', 'not found')
    class_id = request.GET.get('class_id', 'not found')
    class_code = request.GET.get('class_code', 'not found')
    

    # print(class_code)
    try:
        student = Student.objects.get(pk=student_id)
        claz = Class.objects.get(pk=class_id)
        cm = ClassModel.objects.get(pk=class_code)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    classlists = Class.objects.filter(class_code=cm)
    # classids = []
    # for c in classlists:
    #     classids.append(c.class_id)

    # print("g")
    classes = ClassList.objects.filter(class_id__in=classlists)

    for c in classes:
        print(c.class_id)
        c.delist()

    serializer = ClassListSerializer(data={"student_id": student_id, "class_id": class_id})
    if serializer.is_valid():
        serializer.save()
    # return Response(serializer.data)
    return HttpResponse('')

def singleEnlist(student_id, class_id):

    try:
        student = Student.objects.get(pk=student_id)
        claz = Class.objects.get(pk=class_id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    serializer = ClassListSerializer(data={"student_id": student_id, "class_id": class_id})
    if serializer.is_valid():
        serializer.save()
    # return Response(serializer.data)
    return HttpResponse('')


def delistOnClass(request):
    student_id = request.GET.get('student_id', 'not found')
    class_id = request.GET.get('class_id', 'not found')
    a = ClassList.objects.filter(student_id=student_id, class_id=class_id, is_void="False")
    a.first().delist()
    return HttpResponse('Success')

def delistMultiple(request):
    student_id = request.GET.get('student_id', 'not found')
    class_code = request.GET.get('class_code', 'not found')
    a = ClassList.objects.filter(student_id=student_id, class_id=class_code, is_void="False")
    a.first().delist()
    return HttpResponse('Success')



def markEnlisted(request, id):
    try:
        student = Student.objects.get(pk=id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    student.is_enlisted = True
    student.save()

    return HttpResponse('')


def autoEnlist(request, id):
    try:
        student = Student.objects.get(pk=id)
    except Student.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    cls = ClassList.objects.filter(student_id=id)
    for cl in cls:
        cl.delist()


    cd = student.course_code.course_code

    cc = CurriculumClasses.objects.filter(course_code=cd)

    class_codes = []
    for c in cc:
        class_codes.append(c.class_code)
        print(c.class_code)

    start_times = []
    day_of_weeks = []
    for c in class_codes:
        classes = Class.objects.filter(class_code=c)
        for cs in classes:
            if(cs.available_slots >0 ):
                i = len(start_times)
                forbiden = False
                while(i):
                    if (start_times[i-1] == cs.start_time and day_of_weeks[i-1]== cs.day_of_week):
                        forbiden = True
                    i -= 1
                if(forbiden != True):
                    singleEnlist(id, cs.class_id)
                    start_times.append(cs.start_time)
                    day_of_weeks.append(cs.day_of_week)
                    break
    # classes = Class.objects.filter(class_code__in=class_codes)

    # for c in classes:
    #     print(c.class_id)

    


    return HttpResponse('')

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        student_id = data.get('username', None)
        password = data.get('password', None)
        print(f'student_id: {student_id}')
        print(f'password: {password}')
        try:
            student = Student.objects.get(student_id=student_id, password=password)
            print(f'exists')
            # If student exists and password is correct, return success status
            response = JsonResponse({'success': True})
            return response
        except Student.DoesNotExist:
            print(f'does not exists')
            # If student does not exist or password is incorrect, return error status
            response = JsonResponse({'success': False})
            return response
