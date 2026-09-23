# Todo app (the course project)

A web server that answers a GET request to `/` with a simple HTML page, and prints `Server started in port NNNN` on startup. The environment variable `PORT` sets the port (default `3000`).

## Run locally

```sh
PORT=3000 npm start
```

## Build the image and import it into k3d

```sh
docker build -t todo-app:1.5 .
k3d image import todo-app:1.5
```

## Deploy

```sh
kubectl apply -f manifests/deployment.yaml
kubectl logs -f deployment/todo-app-dep
```

The port is set with the `PORT` environment variable in `manifests/deployment.yaml`.

## Open it in a browser

```sh
kubectl port-forward deployment/todo-app-dep 3003:3000
```

Then open http://localhost:3003.
