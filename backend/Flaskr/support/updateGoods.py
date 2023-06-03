import json

from Flaskr import db
from Flaskr.models import Goods


def update_goods(path):
    # reset
    db.session.query(Goods).delete()
    with open(path, encoding='utf-8') as f:
        data = json.loads(f.read())
    for good in data:
        for i in range(len(good['link'])):
            if len(good['link'][i]) >= 150:
                continue
            new_good = Goods(
                name=good['name'],
                mag=good['link'][i]
            )
            db.session.add(new_good)
    db.session.commit()
    # print(data)
