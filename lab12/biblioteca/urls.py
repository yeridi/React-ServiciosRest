from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^prestamos/$', views.prestamo_list),
    url(r'^prestamos/(?P<pk>[0-9]+)/$', views.prestamo_detail),
]
