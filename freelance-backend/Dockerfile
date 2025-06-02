#Imagen de partida
FROM php:8.2-cli
# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
 git unzip libpq-dev && docker-php-ext-install pdo pdo_mysql
# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
# Copiar el código fuente
COPY . .
# Instalar dependencias de Symfony
RUN composer install --no-scripts --no-interaction --no-dev --optimize-autoloader
RUN composer update
# Generar claves JWT
RUN php bin/console lexik:jwt:generate-keypair
EXPOSE 8000
# Comando de inicio
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]