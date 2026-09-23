# Log output

Generates a random string (UUID) on startup, keeps it in memory and prints it every 5 seconds with a timestamp:

```
2026-09-23T15:42:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
```

A GET request to `/` returns the current status in the same format. The environment variable `PORT` sets the port (default `3000`).

## Run locally

```sh
PORT=3000 npm start
```

## Build the image and import it into k3d

```sh
docker build -t log-output:1.7 .
k3d image import log-output:1.7
```

## Create the cluster

The cluster must map host port `8081` to the k3d load balancer:

```sh
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

## Deploy

```sh
kubectl apply -f manifests/
kubectl logs -f deployment/log-output-dep
```

`manifests/service.yaml` is a ClusterIP Service and `manifests/ingress.yaml` routes `/` to it. Open http://localhost:8081 to see the status.

To use a new version, build the image with a new tag, import it, change the tag in `manifests/deployment.yaml` and apply again.
