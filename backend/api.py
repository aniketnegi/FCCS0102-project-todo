from datetime import datetime

from db import Todo, session
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


@app.get("/api/todos")
@cross_origin()
def fetch_all():
    "Get all todos"
    todos = session.query(Todo).order_by(Todo.due_date.asc()).all()

    res = jsonify([todo.as_json() for todo in todos])

    return res


@app.post("/api/todo/create")
@cross_origin()
def create_todo():
    "Create a new todo list item"
    data = request.get_json()["todo"]
    due_date = datetime.strptime(
        request.get_json()["due_date"], "%Y-%m-%dT%H:%M:%S.%fZ"
    ).date()
    todo = Todo(data, due_date)

    session.add(todo)
    session.commit()

    response = jsonify(
        {
            "id": todo.id,
            "todo": todo.title,
            "due_date": todo.due_date,
            "created_at": todo.created_at,
        }
    )

    return response


@app.get("/api/todo/<id>")
@cross_origin()
def fetch_one(id: int):
    "Get a single todo by id"
    data = session.query(Todo).filter_by(id=id).one()

    return data.as_json()


@app.delete("/api/todo/<id>")
@cross_origin()
def delete_todo(id):
    "Delete as single todo by id"
    data = session.query(Todo).filter_by(id=id).one()

    session.delete(data)
    session.commit()

    return {"message": f"Event {id} deleted successfully"}


@app.put("/api/todo/<id>")
@cross_origin()
def update_todo(id):
    "Updates a todo by id"
    todo = session.query(Todo).filter_by(id=id)
    data = request.get_json()["todo"]

    todo.update(dict({"title": data}))

    return todo.one().as_json()


if __name__ == "__main__":
    app.run(debug=True)
