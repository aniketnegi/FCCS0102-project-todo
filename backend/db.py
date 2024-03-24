from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker

from models import Base, Todo

db_urls = {"prod": "store.db", "dev": ":memory:"}

use = db_urls["prod"]

engine = create_engine(f"sqlite:///{use}")

if inspect(engine).has_table(Todo.__tablename__):
    pass
else:
    Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()


if __name__ == "__main__":
    session.add(Todo("Do one thing"))
    session.add(Todo("Do another thing"))

    session.commit()

    result = session.query(Todo).all()

    for r in result:
        print(r)
