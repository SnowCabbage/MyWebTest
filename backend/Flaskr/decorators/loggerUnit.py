from functools import wraps

from flask import current_app


def print_logger():
    """
    a decorator that prints logs
    :return:
    """
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_app.logger.info("")
            return fn(*args, **kwargs)

        return decorator

    return wrapper
