from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    charset='utf-8'
    
    def render(self, data, accepted_media_type=None, renderer_context=None):

        '''
        To see why are we using ErrorDetail string as a condition you can try printing serializer.errors in views (eg: in regitrationview here) without adding raise_exception=True in serializers.is_valid() function parameter so that errors can get printed and you can see there that error contains string 'Error Detail'
        raise_exception=True hides the errors to get printed and make it more precise as we observed while checking registration api and print function will not print error if raise_exception is True

        Example:
        serialization.errors will print this for registrationView if user doesn't provide any fields:


        {'email': [ErrorDetail(string='This field is required.', code='required')], 'name': [ErrorDetail(string='This field is required.', code='required')], 'password': [ErrorDetail(string='This field is required.', code='required')], 'password2': [ErrorDetail(string='This field is required.', code='required')]}

        
        Here you can see error contain ErrorDetail string for each non_valid field!!
        '''

        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})
        else:
            response = json.dumps(data)

        return response