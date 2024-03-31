# TaskMaster

A simple task tracker to boost productivity

## Features

- add tasks
- delete tasks
- edit tasks
- and all the other standard todo app stuff but better, cause i got that dawg in me
- POCKETBASE db!!! :)
  - although it is fun to use. my LSP does not like anything about it. it does not know the attributes of the data, nothing. basically a js/ts situation if you really want to reduce it to smth

## Status

this is a WIP

## Run locally

### I. my `setup.sh` script (!WIP)

```console
aniketnegi@dev:~/app$ chmod +x ./setup.sh
aniketnegi@dev:~/app$ ./setup.sh
```

### II. Manually (currently the only way)

1. backend (python). (it is recommended to do this in a virtualenv)

```console
aniketnegi@dev:~/app$ cd backend
aniketnegi@dev:~/app/backend$ python3 -m venv .venv
aniketnegi@dev:~/app/backend$ source .venv/bin/activate
aniketnegi@dev:~/app/backend$ pip install -r requirements.txt
aniketnegi@dev:~/app/backend$ python3 api.py
```

2. db (pocketbase).

> [!IMPORTANT]
> download the pocketbase binary from [here](https://pocketbase.io/docs/) for your system. extract it and replace the binary in `backend/db`.

`admin user: admin@taskmaster.com (passwd: password1234)`

`user user: user@taskmaster.com (passwd: password1234)`

```console
aniketnegi@dev:~/app$ cd backend/db
aniketnegi@dev:~/app$ chmod +x ./pocketbase
aniketnegi@dev:~/app$ ./pocketbase serve
```

2. in a separate terminal. setup the frontend

```console
aniketnegi@dev:~/app$ cd frontend
aniketnegi@dev:~/app/frontend$ npm i
aniketnegi@dev:~/app/frontend$ npm run dev
```

3. go to `localhost:5173`, and enjoy

## TODO

### Short Term

- [x] switch from using SQLite to pocketbase (i want to try it out)
  - done in just 40 mins. damn porting this was EZ!
- [x] **URGENT**: just realised the date picker is not allowing to select today.
- [ ] add failure upon passing of due date
- [ ] ugh upon closer inspection, the progress bar broke again

### Long Term

- [ ] rewrite in nextJS to host on vercel (i really want to build a server just for this. yes i won't buy a VPS. don't ask me why), because aamna wants to use it.
- [ ] setup and use env vars
- [ ] `setup.sh` script
  - [ ] get pocketbase binary for the correct OS if not already installed.
  - [ ] create tables if not already present
  - [ ] create 3 processes for - backend, db, frontend
  - [ ] kill all when quit
  - [ ] display logs if required
