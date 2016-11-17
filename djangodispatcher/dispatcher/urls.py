from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),

    url(r'^api/currentuser', views.get_current_user, name='get_user'),
    url(r'^api/activetasks', views.get_active_user_tasks, name='active_tasks'),
    url(r'^api/completedtasks', views.get_completed_user_tasks, name='completed_tasks'),
    url(r'^api/finishtask', views.complete_task, name='complete_task'),

    url(r'^api/delegate', views.delegate, name='delegate'),

    url(r'^api/allusers', views.get_all_workers, name='all_workers'),

    url(r'^accounts/logout/$', views.logout_view, name='logout'),
    url(r'^accounts/login/$', views.login_view, name='login'),
]