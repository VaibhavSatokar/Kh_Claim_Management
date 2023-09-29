from django.db import connections

@staticmethod
def execute_stored_procedure(procedure_name, pspParams=None, fetch_method='all', using='default'):
    try:
        with connections[using].cursor() as cursor:
            # Execute the stored procedure with parameters
            if pspParams is None:
                cursor.callproc(procedure_name)
            else:
                cursor.callproc(procedure_name, pspParams)

            # Fetch the results based on the fetch_method parameter
            if fetch_method == 'all':
                results = cursor.fetchall()
            elif fetch_method == 'one':
                results = cursor.fetchone()
            else:
                raise ValueError("Invalid fetch_method. Use 'all' or 'one'.")

        # Return the results
        return results

    except Exception as e:
        # Handle exceptions, log the error, or raise a custom exception
        print(f"Error executing stored procedure: {e}")
        return None
