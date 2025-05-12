# Используем официальный Node образ
FROM node:20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь остальной проект
COPY . .

# Убедимся, что приложение слушает на всех интерфейсах
ENV HOST=0.0.0.0

# Пробрасываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
