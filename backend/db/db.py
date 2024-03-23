from os.path import exists

from models import Base, User
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = "store.db"
test_db_url = ":memory:"

engine = create_engine(f"sqlite:///{test_db_url}")

Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

user1 = User("Bruce", "Wayne", "bruce.wayne@gmail.com")
user2 = User("Alfred", "Pennyworth", "alfred.penny@gmail.com")

session.add(user1)
session.add(user2)

session.commit()

result = session.query(User).all()

for r in result:
    print(r)
