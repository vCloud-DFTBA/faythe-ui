FROM node:lts-alpine as build-html
WORKDIR /app
COPY pkg/web/app/faythe-ui/package*.json ./
RUN npm install
COPY pkg/web/app/faythe-ui .
RUN npm run build

FROM golang:1.12-alpine as build-go
ENV GO111MODULE=on
ENV APPLOC=$GOPATH/src/faythe-ui
RUN apk add --no-cache git
ADD . $APPLOC
WORKDIR $APPLOC
RUN go build -mod vendor -o /bin/faythe-ui cmd/main.go && \
    chmod +x /bin/faythe-ui

FROM alpine:3.9
RUN mkdir -p /home/faythe-ui
WORKDIR /home/faythe-ui
COPY --from=build-go /bin/faythe-ui .
COPY pkg/web/app/login ./web/login
COPY --from=build-html /app/dist ./web/faythe-ui
RUN chown -R nobody:nogroup /home/faythe-ui
USER nobody
EXPOSE 8660
CMD ["/home/faythe-ui/faythe-ui"]

