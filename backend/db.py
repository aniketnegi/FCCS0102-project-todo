from exts import Base, engine
from models import Todo
from sqlalchemy import inspect

if __name__ == "__main__":
    if inspect(engine).has_table(Todo.__tablename__):
        pass
    else:
        Base.metadata.create_all(bind=engine)
