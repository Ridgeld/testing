const fs = require('fs');
const path = require('path');

// Путь к файлу data.json
const dataFilePath = path.join(__dirname, 'data.json');

// Определите Express.js или другой серверный фреймворк
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Разрешите CORS для доступа с ваших клиентов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Поддержка JSON-парсинга
app.use(express.json());

// Обработчик POST-запроса для записи данных в data.json
app.post('/updateData', (req, res) => {
  const newData = req.body.data;

  fs.writeFile(dataFilePath, JSON.stringify(newData), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка записи в файл data.json' });
    } else {
      console.log('Данные успешно записаны в data.json');
      res.json({ message: 'Данные успешно записаны' });
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
