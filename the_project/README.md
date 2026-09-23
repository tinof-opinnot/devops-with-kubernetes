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

The cluster must map host port `8081` to the k3d load balancer:

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

`manifests/service.yaml` is a ClusterIP Service and `manifests/ingress.yaml` routes `/` to it. Open http://localhost:8081.

The Log output Ingress also routes `/`. Delete it from the cluster before you deploy this one, so the two don't conflict:

```sh
kubectl delete -f ../log_output/manifests/ingress.yaml
```
