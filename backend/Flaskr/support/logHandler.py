import logging
from logging.handlers import TimedRotatingFileHandler

from flask import has_request_context, request


class RequestFormatter(logging.Formatter):
    """
    增加访问路由信息和ip地址信息
    """

    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
            record.method = request.method
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)


logging.basicConfig(level=logging.INFO)

# 以天为单位，保存一天日志，最多备份三个文件
file_handler = TimedRotatingFileHandler(
    "flask.log", when="D", interval=1, backupCount=3,
    encoding="UTF-8", delay=True)
# file_handler.suffix = "%Y%m%d-%H%M.log"
formatter = RequestFormatter(
    '[%(asctime)s] %(levelname)s: %(remote_addr)s %(method)s %(url)s\n'
    '---  %(message)s'
)

file_handler.setFormatter(formatter)
