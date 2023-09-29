from django.db import connection
from django.http import JsonResponse
from django.conf import settings

from rest_framework import status

class CustomSessionKeyAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # List of endpoints that don't require authentication
        unprotected_endpoints = ['/favicon.ico', '/auth/login/','/auth/resetPassword']

        # Check if the current endpoint is unprotected
        if request.path in unprotected_endpoints or request.path.startswith(settings.MEDIA_URL):
            return self.get_response(request)

        # Check for a valid session key or token
        session_key = request.headers.get('Authorization')
        if not self.is_valid_session_key(session_key):
            return JsonResponse({'error': 'Unauthorized or Session expired'}, status=status.HTTP_401_UNAUTHORIZED)

        return self.get_response(request)
    
    def is_valid_session_key(self, session_key):
        try:
            with connection.cursor() as cursor:
                # Replace 'sp_validate_token' with the name of your stored procedure
                cursor.callproc('spValidateToken', [session_key])
                result = cursor.fetchone()

            if result:
                UserId = result[0]
                return UserId

            return None
        except Exception as e:
            # Handle any exceptions that might occur during the token validation process
            print(f"Error validating token: {e}")
            return None  
    
