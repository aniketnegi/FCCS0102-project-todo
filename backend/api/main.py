from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pocketbase import PocketBase

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Access-Control-Allow-Origin"

pb = PocketBase("http://127.0.0.1:8090")


@app.get("/api/todos")
@cross_origin()
def fetch_all():
    "Get all todos"

    events = pb.collection("todo").get_full_list(query_params={"sort": "created"})
    res = [
        {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "due_date": event.due_date,
            "completed": event.completed,
        }
        for event in events
    ]

    return res


@app.post("/api/todo/create")
@cross_origin()
def create_todo():
    "Create a new todo list item"

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    due: int = data.get("dueDate")
    due_date = datetime.fromtimestamp(int(due / 1000)).isoformat()

    todoEvent = {
        "title": title,
        "description": description,
        "due_date": due_date,
    }

    record = pb.collection("todo").create(todoEvent)

    if record is not None:
        response = jsonify(
            {
                "id": record.id,
                "todo": record.title,
                "description": record.description,
                "due_date": record.due_date,
                "created_at": record.created,
            }
        )
    else:
        response = jsonify({"error": "Failed to create todoEvent"})

    return response


@app.get("/api/todo/<id>")
@cross_origin()
def fetch_one(id: int):
    "Get a single todo by id"

    event = pb.collection("todo").get_one(id)

    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "due_date": event.due_date,
        "created_at": event.created,
        "updated_at": event.updated,
        "completed": event.completed,
    }


@app.delete("/api/todo/<id>")
@cross_origin()
def delete_todo(id):
    "Delete as single todo by id"

    # Fetch the todoEvent within the session
    try:
        pb.collection("todo").delete(id)
        return {"message": "Event deleted successfully"}
    except Exception as e:
        print(f"ERROR: Encountered Exception while deleting: {e}")
        return {"error": "TodoEvent not found"}, 404


@app.put("/api/todo/<id>")
@cross_origin()
def update_todo(id):
    "Updates a todo by id"

    data = request.get_json()
    req_title = data.get("title")
    req_description = data.get("description")
    due: int = data.get("dueDate")
    req_due_date = datetime.fromtimestamp(int(due / 1000)).isoformat()

    new_event = {
        "title": req_title,
        "description": req_description,
        "due_date": req_due_date,
    }

    try:
        event = pb.collection("todo").update(id, new_event)
        return {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "due_date": event.due_date,
            "completed": event.completed,
        }

    except Exception as e:
        print(f"ERROR: Encountered Exception while deleting: {e}")
        return {"error": "TodoEvent not found or smth. check server logs"}, 404


@app.put("/api/todo/toggle/<id>")
@cross_origin()
def toggle_completed(id):
    "Updates a todo completed status by id"

    event = pb.collection("todo").get_one(id)

    update = {
        "completed": not event.completed,
    }

    new_event = pb.collection("todo").update(id, update)

    return {
        "id": new_event.id,
        "title": new_event.title,
        "description": new_event.description,
        "due_date": new_event.due_date,
        "completed": new_event.completed,
    }


@app.get("/api/todos/checked")
@cross_origin()
def fetch_completed():
    "Get a percentage of completed todos"

    progress = 0

    completed = len(
        pb.collection("todo").get_list(1, 20, {"filter": "completed = True"}).items
    )
    all = len(pb.collection("todo").get_full_list())

    try:
        progress = int((completed / all) * 100)
    except ZeroDivisionError:
        progress = 0
    except Exception as e:
        print(f"Err trying to get completed percentage: {e}")

    response = {"progress": progress}

    return response


if __name__ == "__main__":
    app.run(debug=True)
