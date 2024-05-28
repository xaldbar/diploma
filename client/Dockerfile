# Используем официальный образ Node.js
FROM node:latest

# Устанавливаем директорию рабочего пространства в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем приложение React
RUN npm run build

# Указываем порт, который будет использоваться приложением React
EXPOSE 3000

# Команда для запуска приложения React
CMD ["npm", "start"]