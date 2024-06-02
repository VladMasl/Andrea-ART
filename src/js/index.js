import '../sass/index.scss';

document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const response = await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData.entries())),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    alert('Email sent successfully!');
    document.getElementById('contactForm').reset();
  } else {
    alert('Failed to send email.');
  }
});