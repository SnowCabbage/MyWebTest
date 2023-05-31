import click
from Flaskr import db, app
from Flaskr.models import Movie, User, Userprofile, HomeCover


@app.cli.command()  # 注册为命令，可以传入 name 参数来自定义命令
@click.option('--drop', is_flag=True, help='Create after drop.')  # 设置选项
def initdb(drop):
    """Initialize the database."""
    if drop:
        db.drop_all()
        click.echo('Drop all')
    db.create_all()

    movies = [
        {'title': 'My Neighbor Totoro',
         'year': '1988',
         'desc': 'This is a test',
         'url': '/movies/1',
         'content': 'This is a test,and this part is a content',
         'create_by': 'admin',
         'avatar_id': "1"
         },
    ]

    for movie in movies:
        m = Movie(title=movie['title'],
                  update_date=movie['year'],
                  desc=movie['desc'],
                  url=movie['url'],
                  content=movie['content'],
                  create_by=movie['create_by'],
                  avatar_id=movie['avatar_id']
                  )
        db.session.add(m)

    for i in range(1, 3):
        cover = HomeCover(
            cover_id=i,
            cover_name='1'
        )
        db.session.add(cover)
    db.session.commit()

    click.echo('Initialized database.')


@app.cli.command()
@click.option('--username', prompt=True, help='The username used to login.')
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True, help='The password used to login.')
def initadmin(username, password):
    """Create user and set user's profile"""
    # db.create_all()

    user = User.query.first()
    if user is not None:
        click.echo('Updating user...')
        user.username = username
        # user.set_password(password)  # 设置密码
    else:
        click.echo('Creating user...')
        user = User(username=username, role='Admin')
        user.hash_password(password)

    user_info = Userprofile(
        image_id='1'
    )
    user.userprofile = user_info

    db.session.add(user)
    db.session.add(user_info)

    db.session.commit()
    click.echo('Done.')
