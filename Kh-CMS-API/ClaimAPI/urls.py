"""
Purpose:API's urls path For Leave Management system
FileName: urls.py

---------
Initials:
AP : Akash Patil

History
-------------
Version           Date                      Who                What
---------------------------------------------------------------------------------------------------------
 V 0.1      Tue 11 July  2023                  AP                 1.Inital draft created
                                                                
                                                                      
"""


from django.contrib import admin
from django.urls import path
from . import views
from django.urls import path, include
from django.contrib import admin
admin.autodiscover()


urlpatterns = [
    path('logout/', views.userLogout),
    path('getUserDetails/', views.getUserDetails),
    path('getUserAppFeatures/', views.getUserAppFeatures),
    path('getclaimapplication/',views.GetClaimApplication,name="") ,
    path('getclaimstatushistory/',views.GetClaimStatusHistory,name="") ,
    path('getuserclaimapplicationshistory/',views.GetUserClaimApplicationsHistory,name="") ,
    path('getnewandrejectedclaims/',views.GetNewAndRejectedClaims,name="") ,
    path('getnewclaimapplications/',views.GetNewClaimApplications,name="") ,
    path('saveclaimapplication/',views.SaveClaimApplication,name="") ,
    path('saveclaimstatus/',views.SaveClaimStatus,name="") ,
    path('updateclaimapplication/',views.UpdateClaimApplication,name="") ,
    path('getallclaimtypes/',views.GetAllClaimTypes,name="") ,
    path('getentireclaimtypes/',views.GetEntireClaimTypes,name="") ,
    path('getclaimtype/',views.GetClaimType,name="") ,
    path('saveclaimtype/',views.SaveClaimType,name="") ,
    path('updateclaimtype/',views.UpdateClaimType,name="") ,

]