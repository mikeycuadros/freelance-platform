# Plataforma Freelance

## Descripción

Sistema web que permite a freelancers ofrecer sus servicios y a clientes contratarlos. Incluye funcionalidades básicas de registro, perfil profesional, búsqueda de servicios y sistema de mensajería.

## Puertos y Servicios

### Frontend

- Puerto: 5173
- URL: http://localhost:5173

### Backend

- Puerto: 8000
- URL: http://localhost:8000

### Base de Datos

- MySQL: Puerto 3306
- Base de datos: freelance_db
- Credenciales:
  - Usuario: root
  - Contraseña: (vacía)

### phpMyAdmin

- Puerto: 8080
- URL: http://localhost:8080
- Credenciales:
  - Usuario: root
  - Contraseña: (vacía)

### Nginx

- Puerto: 80
- URL: http://localhost

## Instrucciones de Uso

### Requisitos Previos

- Docker
- Docker Compose

### Pasos para Ejecutar el Proyecto

1. Clonar el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
cd freelance-platform
```

2. Iniciar los contenedores:

```bash
docker-compose up -d
```

3. Generar las claves JWT para el backend:

```bash
docker-compose exec freelance-backend php bin/console lexik:jwt:generate-keypair
```

4. Acceder a la aplicación:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - phpMyAdmin: http://localhost:8080

## Credenciales de Prueba

### Usuarios Admin

1. Usuario1

   - Email: usuario1@example.com
   - Contraseña: 123456

### Usuarios Freelancer

1. Maria

   - Email: maria@design.com
   - Contraseña: 123456

### Usuarios Cliente

1. Cliente Empresarial
   - Email: client@example.com
   - Contraseña: 123456

## Estructura del Proyecto

- `/freelance-frontend`: Aplicación frontend
- `/freelance-backend`: API backend
- `/database`: Scripts de inicialización de la base de datos
- `/nginx`: Configuración del servidor web

## Tecnologías Principales

- Frontend: React
- Backend: PHP/Symfony
- Base de Datos: MySQL
- Servidor Web: Nginx
- Contenedores: Docker
