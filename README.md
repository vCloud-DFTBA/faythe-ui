# faythe-ui

## Version compability

| faythe-ui | faythe              |
| --------- | ------------------- |
| v0.1.0    | >= v0.2.3, < v0.4.0 |
| v0.2.0    | >= v0.4.0           |

## Start with docker

### Build

```bash
docker build --build-arg VUE_APP_FAYTHE_URL=http://localhost:8600 . -t faythe-ui
```

### Run

```bash
docker run -d -it --name faythe-ui -p 8080:80 --restart always faythe-ui
```
