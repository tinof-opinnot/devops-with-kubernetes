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

## Create the cluster

The cluster must map host ports into the cluster:

```sh
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

## Deploy

```sh
kubectl apply -f manifests/
kubectl logs -f deployment/todo-app-dep
```

The port is set with the `PORT` environment variable in `manifests/deployment.yaml`.

## Open it in a browser

`manifests/service.yaml` is a NodePort Service on node port `30080`. k3d maps host port `8082` to it, so open http://localhost:8082.
