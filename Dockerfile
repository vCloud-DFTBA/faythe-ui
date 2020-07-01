FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_FAYTHE_URL
ARG VUE_APP_FAYTHE_DASHBOARD_URL
ENV VUE_APP_FAYTHE_URL=$VUE_APP_FAYTHE_URL \
    VUE_APP_FAYTHE_DASHBOARD_URL=$VUE_APP_FAYTHE_DASHBOARD_URL
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
