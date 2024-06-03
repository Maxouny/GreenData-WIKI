# Используем образ Node.js
FROM node:latest

# Устанавливаем директорию приложения внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения в контейнер
COPY . .

# Запускаем приложение при старте контейнера
CMD ["bash", "-c", "sleep 10 && npm start"]
