from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


db_urls = {"prod": "store.db", "dev": ":memory:"}
use = db_urls["prod"]

engine = create_engine(f"sqlite:///{use}")

Session = sessionmaker(bind=engine)
