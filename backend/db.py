from models import Base, Todo
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker

db_urls = {"prod": "store.db", "dev": ":memory:"}
use = db_urls["prod"]

engine = create_engine(f"sqlite:///{use}")

Session = sessionmaker(bind=engine)
session = Session()

if __name__ == "__main__":
    if inspect(engine).has_table(Todo.__tablename__):
        pass
    else:
        print("Creating database:", use)
        Base.metadata.create_all(bind=engine)
