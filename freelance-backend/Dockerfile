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
# Copiar el entrypoint y darle permisos
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# Exponer el puerto usado por el servidor PHP embebido
EXPOSE 8000

# Usar entrypoint personalizado para generar claves en tiempo de ejecución
# ENTRYPOINT ["/entrypoint.sh"]

# Comando de inicio del servidor
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"] 