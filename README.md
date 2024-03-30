# TaskMaster

A simple task tracker to boost productivity

## Features

- add tasks
- delete tasks
- edit tasks
- and all the other standard todo app stuff but better, cause i got that dawg in me

## Status

this is a WIP

## Run locally

1. backend (python). (it is recommended to do this in a virtualenv)

```console
aniketnegi@dev:~/app$ cd backend
aniketnegi@dev:~/app/backend$ python3 -m venv .venv
aniketnegi@dev:~/app/backend$ source .venv/bin/activate
aniketnegi@dev:~/app/backend$ pip install -r requirements.txt
aniketnegi@dev:~/app/backend$ python3 db.py # to create sqlite db
aniketnegi@dev:~/app/backend$ python3 api.py
```

2. in a separate terminal. setup the frontend

```console
aniketnegi@dev:~/app$ cd frontend
aniketnegi@dev:~/app/frontend$ npm i
aniketnegi@dev:~/app/frontend$ npm run dev
```

3. go to `localhost:5173`, and enjoy

## TODO

- [x] switch from using SQLite to pocketbase (i want to try it out) -> Checkout pocketbase branch
- [x] **URGENT**: just realised the date picker is not allowing to select today.
