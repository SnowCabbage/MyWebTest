import click
from Flaskr import db, app
from Flaskr.models import Movie, User


@app.cli.command()  # 注册为命令，可以传入 name 参数来自定义命令
@click.option('--drop', is_flag=True, help='Create after drop.')  # 设置选项
def initdb(drop):
    """Initialize the database."""
    if drop:
        db.drop_all()
        click.echo('Drop all')
    db.create_all()

    # name = 'Grey Li'
    movies = [
        {'title': 'My Neighbor Totoro',
         'year': '1988',
         'desc': 'This is a test',
         'url': 'https://flappybird.io/'},
    ]

    for movie in movies:
        m = Movie(title=movie['title'],
                  year=movie['year'],
                  desc=movie['desc'],
                  url=movie['url'])
        db.session.add(m)
    db.session.commit()

    click.echo('Initialized database.')

@app.cli.command()
@click.option('--username', prompt=True, help='The username used to login.')
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True, help='The password used to login.')
def initadmin(username, password):
    """Create user."""
    db.create_all()

    user = User.query.first()
    if user is not None:
        click.echo('Updating user...')
        user.username = username
        # user.set_password(password)  # 设置密码
    else:
        click.echo('Creating user...')
        user = User(username=username, role='Admin')
        user.hash_password(password)
        db.session.add(user)

    db.session.commit()
    click.echo('Done.')