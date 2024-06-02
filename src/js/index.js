import '../sass/index.scss';

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, email: email, message: message })
  })
    .then(response => response.text())
    .then(data => {
      alert('Сообщение отправлено успешно!');
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке сообщения.');
    });
});