# Ping-pong

A GET request to `/pingpong` returns `pong N`, where `N` is the number of earlier requests. The counter is kept in memory, so it resets when the pod restarts. The environment variable `PORT` sets the port (default `3000`).

## Run locally

```sh
PORT=3000 npm start
```

## Build the image and import it into k3d

```sh
docker build -t ping-pong:1.9 .
k3d image import ping-pong:1.9
```

## Deploy

```sh
kubectl apply -f manifests/
kubectl logs -f deployment/ping-pong-dep
```

The app shares the Ingress of Log output, which is in `../log_output/manifests/ingress.yaml`. That Ingress routes `/pingpong` here and `/` to Log output, so apply it too:

```sh
kubectl apply -f ../log_output/manifests/
```

The todo app Ingress also routes `/`. Delete it from the cluster first, so the two don't conflict:

```sh
kubectl delete -f ../the_project/manifests/ingress.yaml
```

Then open http://localhost:8081/pingpong.
