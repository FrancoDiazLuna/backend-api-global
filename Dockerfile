#VERSION EXTENDIDA

# # Install dependencies only when needed
# FROM node:18-alpine AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # Build the app with cache dependencies
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN yarn build

# # Production image, copy all the files and run next
# FROM node:18-alpine AS runner

# # Set working directory
# WORKDIR /usr/src/app

# COPY package.json yarn.lock ./

# RUN yarn install --prod

# COPY --from=builder /app/dist ./dist

# # # Copiar el directorio y su contenido
# RUN mkdir -p ./backend-api-global

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password apiUser
# RUN chown -R apiUser:apiUser ./backend-api-global
# USER apiUser

# EXPOSE 3030

# CMD [ "node","dist/main" ]

#VERSION RESUMIDA

# Usamos una imagen base de Node.js con Alpine Linux para construir el espacio de trabajo completo
FROM node:18-alpine AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de package.json y yarn.lock para instalar dependencias
COPY . .

# Instalamos las dependencias
RUN yarn install

# Generamos el build de la aplicación
RUN yarn build

# Imagen base mínima para el contenedor final
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos y carpetas necesarios del espacio de trabajo completo
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.env /app/

# Puerto en el que la aplicación escucha
EXPOSE 3030

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]