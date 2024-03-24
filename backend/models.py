from sqlalchemy import Boolean, Column, DateTime, Integer, String, false
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func as date

Base = declarative_base()


class Todo(Base):
    __tablename__ = "todos"

    id = Column("id", Integer, autoincrement=True, primary_key=True)
    title = Column("title", String)
    created_at = Column("created_at", DateTime, default=date.now())
    updated_at = Column("updated_at", DateTime, default=date.now(), onupdate=date.now())
    completed = Column("completed", Boolean, default=false(), nullable=False)

    def __init__(self, title) -> None:
        self.title = title

    def __repr__(self) -> str:
        return f"({self.id}) {self.title} -> (created: {self.created_at} modified: {self.updated_at})"

    def as_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "completed": self.completed,
        }
