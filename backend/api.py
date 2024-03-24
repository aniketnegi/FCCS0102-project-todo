from db import Todo, session
from flask import Flask, jsonify, request
from flask_cors import CORS

# from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.get("/api/todos")
def fetch_all():
    "Get all todos"
    todos = session.query(Todo).order_by(Todo.id.asc()).all()

    res = [todo.as_json() for todo in todos]
    return jsonify(res)


@app.post("/api/todo/create")
def create_todo():
    "Create a new todo list item"
    data = request.get_json()["todo"]
    todo = Todo(data)

    session.add(todo)
    session.commit()

    response = jsonify(
        {"id": todo.id, "todo": todo.title, "created_at": todo.created_at}
    )

    return response


@app.get("/api/todo/<id>")
def fetch_one(id: int):
    "Get a single todo by id"
    data = session.query(Todo).filter_by(id=id).one()

    return data.as_json()


@app.delete("/api/todo/<id>")
def delete_todo(id):
    "Delete as single todo by id"
    data = session.query(Todo).filter_by(id=id).one()

    session.delete(data)
    session.commit()

    return {"message": f"Event {id} deleted successfully"}


@app.put("/api/todo/<id>")
def update_todo(id):
    "Updates a todo by id"
    todo = session.query(Todo).filter_by(id=id)
    data = request.get_json()["todo"]

    todo.update(dict({"title": data}))

    return todo.one().as_json()


if __name__ == "__main__":
    app.run(debug=True)
