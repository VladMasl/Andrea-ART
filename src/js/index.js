import '../sass/index.scss';

document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    if (response.ok) {
      alert('Письмо успешно отправлено');
    } else {
      alert(`Ошибка: ${result}`);
    }
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});