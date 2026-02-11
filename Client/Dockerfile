# build stage
FROM node:18-bullseye-slim AS build
WORKDIR /app

# Accept build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ARG VITE_SERVER_IP
ARG VITE_SERVER_PORT
ARG VITE_SOCKET_PORT

# Set them as environment variables for the build
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}
ENV VITE_SERVER_IP=${VITE_SERVER_IP}
ENV VITE_SERVER_PORT=${VITE_SERVER_PORT}
ENV VITE_SOCKET_PORT=${VITE_SOCKET_PORT}

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# runtime stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
