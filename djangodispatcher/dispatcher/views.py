from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout, authenticate, login
from .forms import LoginForm
from .models import Task
from django.contrib.auth.models import User
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
def get_user_tasks(request):
    user = request.user
    mytask = []
    tasks = Task.objects.filter(worker=user)
    for task in tasks:
        mytask.append({'workerId': task.worker.pk, 'name': task.name, 'date': task.date})
    return JsonResponse({'tasks': mytask})

@login_required
def create_task(request):
    name = request.GET.get('name', 'default name')
    task = Task.objects.create(worker=request.user, name=name)
    return JsonResponse({'workerUsername': task.worker.username, 'workerId': task.worker.pk, 'name': task.name,
                         'date': task.date})

def delegate(request):
    name = request.GET.get('name', 'default name')
    id = request.GET.get('id', '1')
    try:
        user = User.objects.get(pk=int(id))
    except User.DoesNotExist:
        return JsonResponse({"result": "error"})
    except ValueError:
        return JsonResponse({"result": "error"})
    task = Task.objects.create(worker=user, name=name)
    return JsonResponse({"result": "success", 'workerUsername': task.worker.username, 'workerId': task.worker.pk,
                         'name': task.name, 'date': task.date})


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