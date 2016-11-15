from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),

    url(r'^api/currentuser', views.get_current_user, name='get_user'),
    url(r'^api/activetasks', views.get_active_user_tasks, name='user_tasks'),
    url(r'^api/completedtasks', views.get_completed_user_tasks, name='user_tasks'),
    url(r'^api/delegate', views.delegate, name='delegate'),

    url(r'^accounts/logout/$', views.logout_view, name='logout'),
    url(r'^accounts/login/$', views.login_view, name='login'),
]