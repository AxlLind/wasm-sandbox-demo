# Heroku Deployment
This is a guide for how to deploy this project to Heroku, a cloud hosting platform.

## Deploying to Heroku
The backend
```sh
$ git subtree push --prefix backend heroku-backend master
```

The frontend
```sh
$ git subtree push --prefix frontend heroku-frontend master
```

## Setup
You have to create new Heroku projects, one for the backend and one for the frontend.

Make sure you've downloaded heroku cli and logged in to heroku in the cli.

Lets start with the backend. Stand in the project root directory (the location
of this file)
```sh
$ cd backend
$ heroku git:remote -a <the name of your backend heroku project>
```

Since new heroku git remotes are named `heroku` we have to rename the backend
remote to something more suitable
```sh
$ git remote rename heroku heroku-backend
```

Moving on to the frontend. Stand in the project root directory (the location
of this file)
```sh
$ cd frontend
$ heroku git:remote -a <the name of your frontend heroku project>
```

Rename the frontend remote to something more suitable
```sh
$ git remote rename heroku heroku-frontend
```
