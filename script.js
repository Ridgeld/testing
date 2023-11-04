document.getElementById('myButton').addEventListener('click', () => {
    const newData = { value: 'новое значение' }; // Ваше новое значение
  
    fetch('/updateData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: newData }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Серверный ответ
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  });  