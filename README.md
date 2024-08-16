<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Este proyecto es una API RESTful desarrollada como parte de la prueba técnica para Global Think Technology. La API está construida con NestJS, un framework de Node.js, y se enfoca en la manipulación de datos de usuarios, incluyendo la creación, actualización, obtención y eliminación de usuarios en memoria o en una base de datos MongoDB opcional.

### Objetivo

Evaluar las habilidades del candidato en el desarrollo backend utilizando TypeScript y Node.js, con un enfoque en el diseño de API REST, validación de datos, manejo de errores, y pruebas unitarias.

## Stack Tecnológico

- Node.js: Entorno de ejecución para construir aplicaciones del lado del servidor.
- NestJS/Express: Framework para construir aplicaciones eficientes y escalables en Node.js.
- Docker: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- MongoDB (opcional): Base de datos NoSQL para almacenamiento persistente de datos.

## Requisitos de Instalación

### Herramientas Recomendadas

Se recomienda instalar las siguientes herramientas de manera global para facilitar el desarrollo y la gestión de paquetes:

```bash
#Para creación de recursos (servicios, proveedores, controladores, etc.)
npm i -g @nestjs/cli

#Para la gestión de paquetes
npm i -g yarn
```

# Instalación y Configuración

1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

2. Instalar Dependencias

```bash
yarn install
```

3. Configuración del Archivo .env

- Clonar el archivo **.env.template** y renombrar la copia a **.env**

- Modificar el archivo **.env** con las configuraciones necesarias.

Por ejemplo, cambie el puerto si el predeterminado `APP_PORT=3030` ya está en uso en su máquina local.

Si es necesario agregar origenes permitidos `CORS_ORIGINS=` separarlos con el carácter especial pipe `|`.

```bash
APP_PORT=3030
APP_PREFIX=api
APP_VERSION=0.0.1
ENVIRONMENT=Development

CORS_ORIGINS= http://localhost:3000
CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
```

4. Ejecutar la API

Para ejecutar la API en diferentes modos, use los siguientes comandos:

```bash
# Modo desarrollo
yarn start:dev

# Modo depuración
yarn start:debug

# Modo producción
yarn start:prod
```

5. Población de la Base de Datos (en memoria)

Para poblar la base de datos en memoria, accede a la siguiente URL:

```bash
http://localhost:3030/api/seed
```

6. Uso Opcional de MongoDB

Si necesitas persistencia de datos en MongoDB, sigue estos pasos:

- Levanta un contenedor de MongoDB utilizando Docker:

```bash
docker-compose up -d
```

- Descomenta el código relacionado con MongoDB en los archivos app.module.ts, users.module.ts, UsersController, y UsersService.

## Pruebas Unitarias

Las pruebas unitarias han sido implementadas utilizando Jest. Para ejecutarlas, usa el siguiente comando:

```bash
yarn test
```

Para obtener un reporte de cobertura de código, utiliza:

```bash
yarn test:cov
```

## Docker

El proyecto incluye un archivo Dockerfile que permite construir y ejecutar la aplicación dentro de un contenedor Docker. Para construir y ejecutar la aplicación con Docker:

```bash
docker build -t backend-api-global .
docker run -p 3030:3030 backend-api-global
```

## Documentación de la API

La documentación de la API se genera automáticamente utilizando Swagger. Puedes acceder a la documentación interactiva en:

```bash
http://localhost:3030/api
```
