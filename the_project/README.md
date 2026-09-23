# Todo app (the course project)

A web server that prints `Server started in port NNNN` on startup. The environment variable `PORT` sets the port (default `3000`).

## Run locally

```sh
PORT=3000 npm start
```

## Build the image and import it into k3d

```sh
docker build -t todo-app:1.2 .
k3d image import todo-app:1.2
```

## Deploy

```sh
kubectl create deployment todo-app-dep --image=todo-app:1.2
kubectl logs -f deployment/todo-app-dep
```

The port is not reachable from outside the cluster yet. Networking comes later in the course.
