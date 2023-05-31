def check_user_agent(request):
    """
    check if user agent exists
    :param request:
    :return:
    """
    if request.headers.get('User-Agent') is None:
        return False
    return True
