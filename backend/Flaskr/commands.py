import click
from Flaskr import db, app
from Flaskr.models import Movie, User, Userprofile, HomeCover


@app.cli.command()  # 注册为命令，可以传入 name 参数来自定义命令
@click.option('--drop', is_flag=True, help='Create after drop.')  # 设置选项
def init(drop):
    """Initialize the database."""
    if drop:
        db.drop_all()
    db.create_all()

    user = User(username='admin', role='Admin')
    user.hash_password('12345678')

    user_info = Userprofile(
        image_id='1',
        sex=0,
        address='None'
    )
    user.userprofile = user_info

    db.session.add(user)
    db.session.add(user_info)
    db.session.commit()

    m = Movie(title='My Neighbor Totoro',
              update_date='1988',
              desc='This is a test',
              url='/movies/1',
              content='This is a test,and this part is a content',
              create_by=user,
              cover_id=2
              )
    db.session.add(m)

    for i in range(1, 4):
        cover = HomeCover(
            cover_id=i,
            cover_name='1'
        )
        db.session.add(cover)
    db.session.commit()
