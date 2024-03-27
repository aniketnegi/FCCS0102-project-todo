from datetime import datetime

from exts import session
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from models import Todo

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "http://127.0.0.1:5173"}})
app.config["CORS_HEADERS"] = "Access-Control-Allow-Origin"


@app.get("/api/todos")
@cross_origin()
def fetch_all():
    "Get all todos"
    todos = session.query(Todo).all()

    res = jsonify([todo.as_json() for todo in todos])

    return res


@app.post("/api/todo/create")
@cross_origin()
def create_todo():
    "Create a new todo list item"
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    due: int = data.get("dueDate")
    due_date = datetime.fromtimestamp(int(due / 1000))

    todoEvent = Todo(title=title, description=description, due_date=due_date)

    todoEvent.save()

    response = jsonify(
        {
            "id": todoEvent.id,
            "todo": todoEvent.title,
            "description": todoEvent.description,
            "due_date": todoEvent.due_date,
            "created_at": todoEvent.created_at,
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

    data.delete()

    return {"message": f"Event {id} deleted successfully"}


@app.put("/api/todo/<id>")
@cross_origin()
def update_todo(id):
    "Updates a todo by id"
    todoEvent = session.query().filter_by(id=id).one()
    data = request.get_json()

    req_title = data.get("title")
    req_description = data.get("req_description")
    req_due_date = data.get("dueDate")

    todoEvent.update(
        title=req_title, description=req_description, due_date=req_due_date
    )

    return todoEvent.as_json()


if __name__ == "__main__":
    app.run(debug=True)
