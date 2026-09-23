# Log output

Generates a random string (UUID) on startup, keeps it in memory and prints it every 5 seconds with a timestamp:

```
2026-09-23T15:42:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
```

## Run locally

```sh
npm start
```

## Build the image and import it into k3d

```sh
docker build -t log-output:1.1 .
k3d image import log-output:1.1
```

## Deploy

```sh
kubectl apply -f manifests/deployment.yaml
kubectl logs -f deployment/log-output-dep
```

To use a new version, build the image with a new tag, import it, change the tag in `manifests/deployment.yaml` and apply again.
