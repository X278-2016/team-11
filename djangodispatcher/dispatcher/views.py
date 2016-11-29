from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout, authenticate, login
from .forms import LoginForm
from .models import Task, Profile, Sensor, Job, Location, Profession
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import math, json


@login_required
def index(request):
    user = Profile.objects.get(user=request.user)
    if user.admin:
        return render(request, 'screens/operator.html', {})
    else:
        return render(request, 'screens/dashboard.html', {})


@login_required
def get_current_user(request):
    user = request.user
    return JsonResponse({'username': user.username, 'firstName': user.first_name, 'lastName': user.last_name,
                         'email': user.email, 'id': user.pk})


@login_required
def get_active_user_tasks(request):
    user = Profile.objects.get(user=request.user)
    mytask = []
    for task in Task.objects.filter(worker=user, active=True).order_by("-date"):
        mytask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.job.title, 'date': task.date,
                       "sensor": task.sensor.sensorId})
    return JsonResponse({'active_tasks': mytask})


@login_required
def get_completed_user_tasks(request):
    user = Profile.objects.get(user=request.user)
    mytask = []
    for task in Task.objects.filter(worker=user, active=False).order_by("-date"):
        mytask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.job.title, 'date': task.date,
                       "sensor": task.sensor.sensorId, "dateCompleted": task.datecompleted, "hoursOpen": (task.datecompleted-task.date).seconds/3600})
    return JsonResponse({'completed_tasks': mytask})


@login_required
def complete_task(request):
    task_id = request.POST.get('taskId', -1)
    try:
        task = Task.objects.get(pk=task_id)
        task.active = False
        task.datecompleted = timezone.now()
        task.save()
        user = Profile.objects.get(user=request.user)
        completedtask = []
        for task in Task.objects.filter(worker=user, active=False):
            completedtask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.job.title, 'date': task.date,
                       "sensor": task.sensor.sensorId, "dateCompleted": task.datecompleted, "hoursOpen": (task.datecompleted-task.date).seconds/3600})
        activetask = []
        for task in Task.objects.filter(worker=user, active=True):
            activetask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.job.title, 'date': task.date,
                       "sensor": task.sensor.sensorId})
        return JsonResponse({'completed_tasks': completedtask, 'active_tasks': activetask})
    except Task.DoesNotExist:
        return JsonResponse({"result": "error"})


@csrf_exempt
def delegate(request):
    # retrieve post data
    sample_data = '{"data":{"sensorId":1,"temperature":45,"pressure":1},"tag":{"metric":"HIGH_VOLTAGE"}}'
    body_unicode = request.body.encode('utf-8')
    body = json.loads(sample_data)
    try:
        tag = body['tag']
        data = body['data']
        sensorId = data["sensorId"]
        try:
            date = data["date"]
        except KeyError:
            date = timezone.now()
        metric = tag["metric"]
        sensor = Sensor.objects.get(sensorId=sensorId)
        job = Job.objects.get(title=metric)
    except Sensor.DoesNotExist:
        return JsonResponse({"error": "No such sensor"})
    except Job.DoesNotExist:
        return JsonResponse({"error": "No such job type"})
    except KeyError:
        return JsonResponse({"error": "Key Error"})
    correct_user = None
    smallest = -1
    # for all users that can solve the task
    for user in Profile.objects.filter(profession__jobs=job, admin=False):
        # queue closest
        distance = math.sqrt(math.pow(abs(sensor.location.lat-user.location.lat), 2)+math.pow(abs(sensor.location.longitude-user.location.longitude), 2))
        if smallest == -1 or distance < smallest:
            correct_user = user
            smallest = distance
    if correct_user is None:
        return JsonResponse({"error": "no user found"})
    task = Task.objects.create(worker=correct_user, sensor=sensor, job=job, date=date)
    return JsonResponse({"result": "success", 'workerUsername': task.worker.user.username, 'workerId': task.worker.pk,
                         'name': task.job.title, 'date': task.date, 'taskId': task.pk})


# operator APIs
@login_required
def get_all_workers(request):
    userlist = []
    for user in Profile.objects.filter(admin=False):
        tasklist = []
        for task in Task.objects.filter(worker=user, active=True).order_by("-date"):
            tasklist.append({'taskId': task.pk, 'name': task.job.title, 'date': task.date,
                             'sensor': task.sensor.sensorId})
        userlist.append({'firstName': user.user.first_name, 'lastName': user.user.last_name, 'email': user.user.email,
                         'id': user.user.pk, 'profession': user.profession.title, 'activeTasks': tasklist,
                         "lat": user.location.lat, "long": user.location.longitude})
    return JsonResponse({"users": userlist})

@login_required
def get_all_sensors(request):
    sensorlist = []
    for sensor in Sensor.objects.all():
        sensorlist.append({"sensor": sensor.sensorId, "lat": sensor.location.lat, "long": sensor.location.longitude})
    return JsonResponse({"sensors": sensorlist})


def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/')
                else:
                    return HttpResponse("disabled")

            else:
                displaymessage = True
                return render(request, 'accounts/login.html', {'form': form})
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})


def initialize(request):
    loc1 = Location.objects.create(lat=36.3, longitude=-86.5)
    loc2 = Location.objects.create(lat=36.1, longitude=-87)
    loc3 = Location.objects.create(lat=36.3, longitude=-86.9)
    loc4 = Location.objects.create(lat=35.9, longitude=-86.7)
    loc5 = Location.objects.create(lat=36.16270, longitude=-86.78160)

    j1 = Job.objects.create(title="LOW_VOLTAGE")
    j2 = Job.objects.create(title="HIGH_VOLTAGE")
    j3 = Job.objects.create(title="LOW_PRESSURE")
    j4 = Job.objects.create(title="HIGH_PRESSURE")
    j5 = Job.objects.create(title="TEMPERATURE_CHANGE")
    j6 = Job.objects.create(title="HIGH_TEMPERATURE")

    op = Profession.objects.create(title="Operator")
    op.jobs.add(j1)
    op.jobs.add(j2)
    op.jobs.add(j3)
    op.jobs.add(j4)
    op.jobs.add(j5)
    op.jobs.add(j6)
    op.save()
    mech = Profession.objects.create(title="Mechanic")
    mech.jobs.add(j3)
    mech.jobs.add(j4)
    mech.jobs.add(j5)
    mech.jobs.add(j6)
    mech.save()
    elec = Profession.objects.create(title="Electrician")
    elec.jobs.add(j1)
    elec.jobs.add(j2)
    elec.save()

    Sensor.objects.create(sensorId=1, location=loc1)
    Sensor.objects.create(sensorId=2, location=loc2)
    Sensor.objects.create(sensorId=3, location=loc3)
    Sensor.objects.create(sensorId=4, location=loc4)

    return JsonResponse({})