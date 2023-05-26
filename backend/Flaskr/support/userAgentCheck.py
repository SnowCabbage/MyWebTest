def check_user_agent(request):
    if request.headers.get('User-Agent') is None:
        return False
    return True
