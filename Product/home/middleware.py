def jwt_cookie_to_header_middleware(get_response):
    def middleware(request):
        access_token = request.COOKIES.get('access')
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        return get_response(request)
    return middleware