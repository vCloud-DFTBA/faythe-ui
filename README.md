# Interactive UI for faythe

## Usage

Create `faythe-ui.env` file as of `faythe-ui.env_example` template

```env
# Listen address, eg: 0.0.0.0:8660
SERVER_ADDR=
# Your secret key
SECRET_KEY=
# Credential for authentication
USERNAME=
PASSWORD=
# FAYTHE INFO
FAYTHE_HOST=
FAYTHE_PORT=
FAYTHE_USERNAME=
FAYTHE_PASSWORD=
```

If you change the listening port `8660` please change it in `Dockerfile` as well.

Run the containerized service with command:

```bash
docker-compose up -d
```

and you are good to go! Cheers!
