#Imagen de partida
FROM node:18-alpine
WORKDIR /app
# Instalar dependencias
COPY package*.json ./
RUN npm install
# Copiar el código fuente
COPY . .
# Exponer el puerto
EXPOSE 5173
# Comando de inicio
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]