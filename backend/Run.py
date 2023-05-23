from Flaskr import app
import multiprocessing


# def serverOn():
#     # name = multiprocessing.current_process().name
#     name = multiprocessing.current_process().name
#     print("Starting %s " % name)
#     serve(app, host='127.0.0.1', port=5000)
#     print("Exiting %s " % name)


if __name__ == '__main__':
    # background_process = multiprocessing.Process(name='background_process', target=serverOn)
    # background_process.daemon = True
    # background_process.start()
    # print("This is output")

    # serve(app, host='127.0.0.1', port=5000)
    app.run(port=8080)
