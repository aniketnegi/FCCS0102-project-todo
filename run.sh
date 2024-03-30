#!/bin/bash

check_pocketbase_bin() {
    # TODO
    :
}

check_pocketbase_setup() {
    # TODO
    :
}

run_db() {
    # will check for env vars and shit later. probably will have a DEV_MODE envvar
    ./backend/db/pocketbase serve &
}

run_api() {
    # starting the virtualenv

    source backend/.venv/bin/activate

    python3 ./backend/api/api.py &
}

run_frontend() {
    cd frontend || exit
    npm i
    npm run dev &
}

# run components
run_db
run_api
run_frontend

# script exit
echo "Press 'q' to exit"
while :
do
    read -n 1 key
    if [[ $key == "q" ]]; then
        break
    fi
done

# Kill the processes
pkill -P $$  # Kill child processes
