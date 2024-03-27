from datetime import datetime

from exts import Base, Session
from sqlalchemy import Boolean, Column, DateTime, Integer, String, update


class Todo(Base):
    """
    class Todo:
        id: int primary_key
        title: str
        description: str (text)
        created_at: datetime
        updated_at: datetime
        due_date: datetime
        completed: boolean
    """

    __tablename__ = "todos"

    id = Column("id", Integer, autoincrement=True, primary_key=True)
    title = Column("title", String(50))
    description = Column("description", String(100), nullable=True)
    created_at = Column("created_at", DateTime, default=datetime.now())
    updated_at = Column(
        "updated_at", DateTime, default=datetime.now(), onupdate=datetime.now()
    )
    due_date = Column("due_date", DateTime)
    completed = Column("completed", Boolean, default=False, nullable=False)

    def __init__(self, title: str, description: str, due_date: datetime) -> None:
        self.title = title
        self.description = description
        self.due_date = due_date

    def __repr__(self) -> str:
        return f"({self.id}) {self.title} -> (created: {self.created_at} modified: {self.updated_at} due_date: {self.due_date})"

    def save(self):
        with Session.begin() as session:
            session.add(self)
            session.commit()

    def delete(self):
        with Session.begin() as session:
            session.delete(self)
            session.commit()

    def update(self, title="", description="", due_date=None):
        self.title = title if title else self.title
        self.description = description if description else self.description
        self.due_date = due_date if due_date else self.due_date

        with Session.begin() as session:
            stmt = (
                update(Todo)
                .where(Todo.id.is_(self.id))
                .values(
                    title=self.title,
                    description=self.description,
                    due_date=self.due_date,
                )
            )

            session.execute(stmt)
            session.commit()

    def as_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "completed": self.completed,
        }
