import time

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from ClaimAPI.utility import execute_stored_procedure
from ClaimAPI.serializer import Serialize
from django.conf import settings
 
from ClaimAPI.models import ClaimApplicationsInfo, ClaimTypeInfo, UserClaimApplicationsInfo, ClaimStatusInfo, SaveClaimTypeInfo, UpdateClaimTypeInfo, SaveClaimApplicationsInfo, SaveStatusInfo

@api_view(['GET'])
def userLogout(request):
    pSessionKey = request.headers.get('Authorization')
        
    try:
        execute_stored_procedure(fetch_method="one", procedure_name="spExpireSession", pspParams=[pSessionKey], using="Kh_UMS")
            
        return Response({'message': 'User Sign Out successfull.'}, status=status.HTTP_200_OK)
    except Exception as e:
        # Log the error for debugging purposes
        print("Error occurred:", e)
        return Response({'error': 'An error occurred while signing out.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def getUserDetails(request):
     pUserId = request.GET.get('UserId')
     if request.method == 'GET':
          try:
            rUser = execute_stored_procedure(procedure_name="spGetUser", pspParams=[pUserId], fetch_method="one")
            
            # Get the current server's domain and protocol
            domain = request.get_host()
            protocol = 'https' if request.is_secure() else 'http'
        
            ProfilePath = rUser[8]
            
            # Generate the full attachment URL
            full_profile_url = f'{protocol}://{domain}{settings.MEDIA_URL}{ProfilePath}'
        
            oUser = Serialize(LoginId =rUser[0],UserId=rUser[1],FirstName=rUser[3],LastName=rUser[4],Email=rUser[5],MobileNo=rUser[6], ProfileUrl=full_profile_url).to_dict()
                    
            return Response(oUser, status=status.HTTP_200_OK)
          except Exception as e:
              print(e)
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserAppFeatures(request):
    try:
        userId = request.GET.get("userId")
        results = execute_stored_procedure(fetch_method='all',procedure_name='spGetUserAppFeatures', pspParams=[userId], using="Kh_CMS")

        projects = []
        for pList in results:
            appFeatures = Serialize(UserId=pList[0], AppId=pList[1], AppFeatureId=pList[2], FeatureName=pList[3],  Icon=pList[4], Link=pList[5], Components=pList[6])
            projects.append(appFeatures.to_dict())
            
        # Return data with a success status code
        # response_data = {"data": project, "message": "Data retrieved successfully"}
        return Response(data=projects, status=status.HTTP_200_OK)
    except Exception as e:
        # Handle exception and return appropriate response with error status code
        response = {"message": "An error occurred while retrieving data", "error": str(e)}
        return Response(data=[], status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def GetClaimApplication(request):
     pClaimApplicationId = request.GET.get('ClaimApplicationId')
     if request.method == 'GET':
    
          try:
            rClaimApplication = execute_stored_procedure(using="Kh_CMS", procedure_name="spGetClaimApplication", fetch_method="all")
            # rClaimApplication = executeStoreProcedure("Kh_HRMS_CMS.spGetClaimApplication", [pClaimApplicationId])
            AllClaimApplications = []
            for application in rClaimApplication:
                applicationinfo = ClaimApplicationsInfo(application[0], application[1], application[2], application[3], application[4], application[5], application[6], application[7],  application[8], application[9],application[10], application[11], application[12],application[13], application[14],application[15], application[16])
                AllClaimApplications.append(applicationinfo.__dict__)
            return Response(AllClaimApplications, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
            

@api_view(['GET'])
def GetClaimStatusHistory(request):
     if request.method == 'GET':
          try:
            rClaimStatus = execute_stored_procedure(fetch_method='all',procedure_name='spGetClaimStatusHistory', using="Kh_CMS")

            AllClaimStatus = []
            for claimstatus in rClaimStatus:
                statusinfo = ClaimStatusInfo(claimstatus[0], claimstatus[1], claimstatus[2], claimstatus[3], claimstatus[4], claimstatus[5], claimstatus[6], claimstatus[7],  claimstatus[8], claimstatus[9],claimstatus[10], claimstatus[11], claimstatus[12],claimstatus[13], claimstatus[14],claimstatus[15], claimstatus[16], claimstatus[17],claimstatus[18], claimstatus[19], claimstatus[20])
                AllClaimStatus.append(statusinfo.__dict__)
            return Response(AllClaimStatus, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
            

@api_view(['GET'])
def GetUserClaimApplicationsHistory(request):
     pUserId = request.GET.get('UserId')
     if request.method == 'GET':
        try:
          rClaimApplication = execute_stored_procedure(fetch_method='all',procedure_name='spGetUserClaimApplicationsHistory', pspParams=[pUserId], using="Kh_CMS")

          AllClaimApplications = []
          for application in rClaimApplication:
              applicationinfo = UserClaimApplicationsInfo(application[0], application[1], application[2], application[3], application[4], application[5], application[6], application[7],  application[8], application[9],application[10], application[11], application[12],application[13], application[14], application[15], application[16], application[17], application[18])
              AllClaimApplications.append(applicationinfo.__dict__)
          return Response(AllClaimApplications, status=status.HTTP_200_OK)
        except :
            return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
            

@api_view(['GET'])
def GetNewAndRejectedClaims(request):
     pUserId = request.GET.get('UserId')
     if request.method == 'GET':
          try:
            rClaimApplication = execute_stored_procedure(fetch_method='all',procedure_name='spGetNewAndRejectedClaims', pspParams=[pUserId], using="Kh_CMS")

            AllClaimApplications = []
            for application in rClaimApplication:
                applicationinfo = UserClaimApplicationsInfo(application[0], application[1], application[2], application[3], application[4], application[5], application[6], application[7],  application[8], application[9],application[10], application[11], application[12],application[13], application[14], application[15], application[16], application[17], application[18])
                AllClaimApplications.append(applicationinfo.__dict__)
            return Response(AllClaimApplications, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def GetNewClaimApplications(request):

     if request.method == 'GET':
          try:
            rClaimApplication = execute_stored_procedure(fetch_method='all',procedure_name='spGetNewClaimApplications', using="Kh_CMS")

            NewClaimApplications = []
            for claimstatus in rClaimApplication:
                applicationinfo = ClaimStatusInfo(claimstatus[0], claimstatus[1], claimstatus[2], claimstatus[3], claimstatus[4], claimstatus[5], claimstatus[6], claimstatus[7],  claimstatus[8], claimstatus[9],claimstatus[10], claimstatus[11], claimstatus[12],claimstatus[13], claimstatus[14],claimstatus[15], claimstatus[16], claimstatus[17], claimstatus[18], claimstatus[19], claimstatus[20])
                NewClaimApplications.append(applicationinfo.__dict__)
            return Response(NewClaimApplications, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
            

from ClaimAPI.EmailSender import EmailSender
from ClaimAPI.templates.ClaimEmailTemplate import html_template
from ClaimAPI.templates.ClaimApproval import status_html_template

# Get the Reporting Manager Email ID 
def getRMDetails(UserID):
    rmDetails = execute_stored_procedure(using='Kh_TSMS', fetch_method='one', procedure_name='spGetRMEmailID', pspParams=[UserID])
    return rmDetails

#Get the User FullName 
def getUserFullName(UserID):
    row = execute_stored_procedure(using='Kh_TSMS', fetch_method='one', procedure_name='spGetUserFullName', pspParams=[UserID])
    FullName = row[0]
    return FullName
  
# # Get User Email ID for all users whose time sheets approver approving. ONE BY ONE MULTIPLE CALL TO DB FOR EACH USER ID :(
def getUserEmailID(UserID):
    row = execute_stored_procedure(using='Kh_TSMS', fetch_method='one', procedure_name='spGetUserEmailIDs', pspParams=[UserID])
    userEmail = row[3]
    return userEmail


@api_view(['POST']) 
def SaveClaimApplication(request):
     pClaimApplicationId = request.data.get('ClaimApplicationId'), 
     pUserId = request.data.get('UserId'),
     pTitle = request.data.get('Title'),
     pDescription = request.data.get('Description')
     pInvoiceDate = request.data.get('InvoiceDate')
     pClaimAmount = request.data.get('ClaimAmount')
     pAttachment = request.data.get('Attachment')
     pClaimTypeId = request.data.get('ClaimTypeId')
     pClaimType = request.data.get('ClaimType')
     pProject = request.data.get('Project')
     pCreatedBy = request.data.get('CreatedBy')

     if request.method == 'POST':
          params =[pClaimApplicationId, pUserId, pTitle, pDescription, pInvoiceDate, pClaimAmount, pAttachment, pClaimTypeId, pProject, pCreatedBy]
          
          try:
            execute_stored_procedure(procedure_name='spSaveClaimApplication', pspParams=params, using="Kh_CMS")
            
            ### Send email to user and approver
            ## Get the User email, Get the approver email
            # Save the time entry to the database
              
            rManagerDetails = getRMDetails(pUserId)
            rmMail = rManagerDetails[3]
            rmFirstName = rManagerDetails[1]

            userFullName = getUserFullName(pUserId)

            
            # Complete HTML template with dynamic table rows
            complete_html_template =html_template.format(Approver=rmFirstName, claimTitle=pTitle, claimDesc=pDescription, claimType=pClaimType , projectType=pProject , invoiceDate=pInvoiceDate, claimAmt=pClaimAmount, Submitter=userFullName)
            # complete_html_template =html_template.format(Approver= rmFirstName, Submitter=userFullName)
                
            recipient_emails = [rmMail]  # Add more recipient emails as needed
            email_subject = 'Claim Submitted for Review And Approval'
            
            #Creating the class imstance
            email_sender = EmailSender()
            # Send the email to multiple recipients with the complete HTML content
            email_sender.send_email(recipient_emails=recipient_emails,subject=email_subject, body=complete_html_template)  
            
            
            return Response({"Message":"Claim Application Saved Successfully"}, status=status.HTTP_200_OK)
          except Exception as e :
              print(e)
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST']) 
def SaveClaimStatus(request):
    pUserId = request.data.get('UserId')
    pFirstName = request.data.get('FirstName')
    pClaimTitle = request.data.get('Title')
    pClaimType = request.data.get('ClaimType')
    pProject = request.data.get('Project')
    pInvoiceDate = request.data.get('InvoiceDate')
    pClaimAmount = request.data.get('ClaimAmount')
    pClaimStatusId = request.data.get('ClaimStatusId')
    pApproverId = request.data.get('ApproverId')
    pClaimStatus = request.data.get('ClaimStatus')
    pReason = request.data.get('Reason')
    pCreatedBy = request.data.get('CreatedBy')
       
    if request.method == 'POST':
        params = [pClaimStatusId, pApproverId, pClaimStatus, pReason, pCreatedBy]
        
        try:
          rStatus = execute_stored_procedure(procedure_name='spSaveClaimStatus', pspParams=params, using="Kh_CMS")
          userEmails = getUserEmailID(pUserId)
          
          email_subject = "Claim request approved" if pClaimStatus == 'A' else "Claim request Rejected"
          status_text = "Approved" if  pClaimStatus == 'A' else "Rejected"
          status_color = "Green" if  pClaimStatus == 'A' else "Red"

          # Complete HTML template with dynamic table rows
          complete_html_template =status_html_template.format(
              FirstName=pFirstName, 
              claimTitle=pClaimTitle, 
              claimType=pClaimType, 
              projectType=pProject , 
              invoiceDate=pInvoiceDate, 
              claimAmt=pClaimAmount, 
              status_text=status_text,
              status_color= status_color,
              reason=pReason
          )
          
          recipient_emails = [userEmails]
          
          #Creating the class imstance
          email_sender = EmailSender()
        
          # Send the email to multiple recipients with the complete HTML content
          email_sender.send_email(recipient_emails=recipient_emails,subject=email_subject, body=complete_html_template)  
          return Response({"Message":"Claim Status Saved Successfully"}, status=status.HTTP_200_OK)
        except Exception as e :
            print(e)
            return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST']) 
def UpdateClaimApplication(request):
     pClaimApplicationId = request.data.get('ClaimApplicationId'), #pass this as null when you enter new record
     pUserId = request.data.get('UserId'), 
     pTitle = request.data.get('Title'),
     pDescription = request.data.get('Description')
     pInvoiceDate = request.data.get('InvoiceDate')
     pClaimAmount = request.data.get('ClaimAmount')
     pAttachment = request.data.get('Attachment')
     pClaimTypeId = request.data.get('ClaimTypeId')
     pProject = request.data.get('Project')
     pCreatedBy = request.data.get('CreatedBy')

     if request.method == 'POST':
          params = [pClaimApplicationId, pUserId, pTitle, pDescription, pInvoiceDate, pClaimAmount, pAttachment, pClaimTypeId, pProject, pCreatedBy] 
          try:
            
            rApplication = execute_stored_procedure(procedure_name='spUpdateClaimApplication', pspParams=params, using="Kh_CMS")
            
            SaveApplication = []
            for application in rApplication:
                applicationinfo =  SaveClaimApplicationsInfo(application[0], application[1], application[2], application[3], application[4], application[5], application[6], application[7], application[8], application[9])
                SaveApplication.append(applicationinfo.__dict__)
            return Response({"Message":"Claim Application Saved Successfully"}, status=status.HTTP_200_OK)
          except Exception as e :
              print(e)
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def GetAllClaimTypes(request):

     if request.method == 'GET':
          try:
            rClaimType = execute_stored_procedure(fetch_method= "all", procedure_name='spGetAllClaimTypes', using="Kh_CMS")

            ClaimTypes = []
            for claimtype in rClaimType:
                claimtypeinfo = ClaimTypeInfo(claimtype[0], claimtype[1], claimtype[2], claimtype[3], claimtype[4], claimtype[5], claimtype[6], claimtype[7])
                ClaimTypes.append(claimtypeinfo.__dict__)
            return Response(ClaimTypes, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
          

@api_view(['GET'])
def GetEntireClaimTypes(request):
     if request.method == 'GET':
          try:
            rClaimTypes = execute_stored_procedure(fetch_method= "all", procedure_name='spGetEntireClaimtypes', using="Kh_CMS")
            
            ClaimTypes = []
            for claimtype in rClaimTypes:
                claimtypeinfo = ClaimTypeInfo(claimtype[0], claimtype[1], claimtype[2], claimtype[3], claimtype[4], claimtype[5], claimtype[6], claimtype[7])
                ClaimTypes.append(claimtypeinfo.__dict__)
            return Response(ClaimTypes, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)         


@api_view(['GET'])
def GetClaimType(request):
     pClaimTypeId = request.GET.get('ClaimTypeId')
     if request.method == 'GET':
          try:
            rClaimType = execute_stored_procedure(fetch_method= "one", procedure_name='spGetClaimType', using="Kh_CMS", pspParams=[pClaimTypeId])
                        
            AllClaimType = []
            for type in rClaimType:
                Typeinfo = ClaimTypeInfo(type[0], type[1], type[2], type[3], type[4], type[5], type[6], type[7])
                AllClaimType.append(Typeinfo.__dict__)
            return Response(AllClaimType, status=status.HTTP_200_OK)
          except :
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST']) 
def SaveClaimType(request):
     pClaimTypeId = request.data.get('ClaimTypeId'), #pass this as null when you enter new record
     pClaimType = request.data.get('ClaimType'),
     pClaimTypeDescription = request.data.get('ClaimTypeDescription')
     pCreatedBy = request.data.get('CreatedBy')
     
     if request.method == 'POST':
          params = [pClaimTypeId, pClaimType, pClaimTypeDescription, pCreatedBy]
          
          try:
            rStatus = execute_stored_procedure(fetch_method= "all", procedure_name='spSaveClaimType', using="Kh_CMS", pspParams=params)
            
            SaveStatus = []
            for cstatus in rStatus:
                ststusinfo =  SaveClaimTypeInfo(cstatus[0], cstatus[1], cstatus[2], cstatus[3])
                SaveStatus.append(ststusinfo.__dict__)
            return Response({"Message":"Claim type Saved Successfully"}, status=status.HTTP_200_OK)
          except Exception as e :
              print(e)
              return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['POST']) 
def UpdateClaimType(request):
     pClaimTypeId = request.data.get('ClaimTypeId'), #pass this as null when you enter new record
     pClaimType = request.data.get('ClaimType'),
     pClaimTypeDescription = request.data.get('ClaimTypeDescription')
     pCreatedBy = request.data.get('CreatedBy')
     pEnable = request.data.get('Enable')
     
     if request.method == 'POST':
        params = [pClaimTypeId, pClaimType, pClaimTypeDescription, pCreatedBy, pEnable]
          
        try:
          rStatus = execute_stored_procedure( procedure_name='spUpdateClaimType', using="Kh_CMS", pspParams=params)

          SaveStatus = []
          for cstatus in rStatus:
              ststusinfo =  UpdateClaimTypeInfo(cstatus[0], cstatus[1], cstatus[2], cstatus[3], cstatus[4],)
              SaveStatus.append(ststusinfo.__dict__)
          return Response({"Message":"Claim type Updated Successfully"}, status=status.HTTP_200_OK)
        except Exception as e :
            print(e)
            return JsonResponse({"Message":"Something Went Wrong!"} ,status=status.HTTP_400_BAD_REQUEST)