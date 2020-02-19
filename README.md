# faythe-ui

## Start with docker

### Build

```bash
docker build --build-arg VUE_APP_FAYTHE_URL=http://localhost:8600 . -t faythe-ui:v0.2
```

### Run

```bash
docker run -d -it --name faythe-ui -p 8080:80 --restart always faythe-ui:v0.2
```
