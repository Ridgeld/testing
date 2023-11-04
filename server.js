const express = require('express');
const bodyParser = require('body-parser');
const { Octokit } = require('@octokit/rest');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const octokit = new Octokit({
  auth: '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', // Замените на ваш токен доступа к GitHub
});

app.post('/add-entry', async (req, res) => {
  try {
    const { index, date } = req.body;

    const content = `[${index}] : ${date}`;
    const repoOwner = 'Ridgeld'; // Замените на вашего владельца репозитория
    const repoName = 'testing'; // Замените на имя вашего репозитория
    const filePath = 'data.json';

    // Получаем текущее содержимое файла
    const { data: { content: currentContent, sha } } = await octokit.repos.getContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
    });

    const updatedContent = `${currentContent}\n${content}`;

    // Загружаем обновленное содержимое файла
    await octokit.repos.createOrUpdateFile({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: 'Добавление записи',
      content: Buffer.from(updatedContent).toString('base64'),
      sha,
    });

    res.status(200).json({ message: 'Запись успешно добавлена' });
  } catch (error) {
    console.error('Ошибка при добавлении записи:', error);
    res.status(500).json({ message: 'Ошибка при добавлении записи' });
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Сервер Node.js запущен на порту ${port}`);
});
