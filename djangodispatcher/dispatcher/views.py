from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout, authenticate, login
from .forms import LoginForm
from .models import Task, Profile
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@login_required
def index(request):
    return render(request, 'screens/dashboard.html', {})
    #return HttpResponse("Hello, world. You're at the polls index.")

@login_required
def get_current_user(request):
    user = request.user
    return JsonResponse({'username': user.username, 'firstName': user.first_name, 'lastName': user.last_name,
                         'email': user.email, 'id': user.pk})

@login_required
def get_active_user_tasks(request):
    user = Profile.objects.get(user=request.user)
    mytask = []
    for task in Task.objects.filter(worker=user, active=True):
        mytask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.name, 'date': task.date})
    return JsonResponse({'active_tasks': mytask})

@login_required
def get_completed_user_tasks(request):
    user = Profile.objects.get(user=request.user)
    mytask = []
    for task in Task.objects.filter(worker=user, active=False):
        mytask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.name, 'date': task.date})
    return JsonResponse({'completed_tasks': mytask})

@login_required
def complete_task(request):
    task_id = request.POST.get('taskId', -1)
    try:
        task = Task.objects.get(pk=task_id)
        task.active = False
        task.save()
        user = Profile.objects.get(user=request.user)
        completedtask = []
        for task in Task.objects.filter(worker=user, active=False):
            completedtask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.name, 'date': task.date})
        activetask = []
        for task in Task.objects.filter(worker=user, active=True):
            activetask.append({'taskId': task.pk, 'workerId': task.worker.pk, 'name': task.name, 'date': task.date})
        return JsonResponse({'completed_tasks': completedtask, 'active_tasks': activetask})
    except Task.DoesNotExist:
        return JsonResponse({"result": "error"})

@csrf_exempt
def delegate(request):
    # retrieve post data
    name = request.POST.get('name', 'default name')
    city = request.POST.get('city', 'Nashville')
    job = request.POST.get('job', 'electrical')
    correct_user = None
    smallest = -1
    # query for ones that match job description
    # include location query
    # choose based on who has the least amount
    for user in Profile.objects.filter(location__city=city, profession_title=job):
        # find the qualified user with the least number of tasks queued
        if smallest == -1 or len(user.task_set.filter(active=True)) < smallest:
            correct_user = user
    if correct_user is None:
        return JsonResponse({"result": "error"})
    task = Task.objects.create(worker=correct_user, name=name)
    return JsonResponse({"result": "success", 'workerUsername': task.worker.username, 'workerId': task.worker.pk,
                         'name': task.name, 'date': task.date, 'taskId': task.pk})

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')

def login_view(request):
    displaymessage = False
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
                return render(request, 'accounts/login.html', {'form': form, 'displaymessage': displaymessage})
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form, 'displaymessage': displaymessage})