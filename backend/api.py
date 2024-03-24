from flask import Flask, jsonify, request

from db import Todo, session

# from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app)


@app.get("/api/todos")
def fetch_all():
    "Get all todos"
    todos = session.query(Todo).all()

    res = [todo.as_json() for todo in todos]
    return jsonify(res)


@app.post("/api/todo/create")
def create_todo():
    data = request.data

    return data


if __name__ == "__main__":
    app.run(debug=True)
