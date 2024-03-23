from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column("id", Integer, autoincrement=True, primary_key=True)
    first_name = Column("first name", String(30), nullable=False)
    last_name = Column("last name", String(30), nullable=True)
    email = Column("email", String(30), nullable=True)

    def __init__(self, first_name, last_name, email) -> None:
        self.first_name = first_name
        self.last_name = last_name
        self.email = email

    def __repr__(self) -> str:
        return f"{self.id} -> {self.first_name} {self.last_name} ({self.email})"


class Password(Base):
    __tablename__ = "passwords"

    id = Column("id", Integer, primary_key=True)
    userid = Column("userid", Integer, unique=True)
    salt = Column("salt", String, unique=True)
    hash = Column("hash", String, unique=True)
