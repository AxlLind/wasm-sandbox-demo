# WebASM Backend

# How to run

```sh
$ docker-compose up
```

# Development
It's easiest to develop using devcontainers and vscode.
Simply open the project (the folder `backend`) and vscode will see that this is is a devcontainer project and ask you if you want to open the project inside a container. Press "Reopen folder in container" (or something like that)

To start the server inside the devcontainer run
```sh
$ uvicorn main:app --host 0.0.0.0 --reload
```