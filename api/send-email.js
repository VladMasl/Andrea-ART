const nodemailer = require('nodemailer');

export default async function (req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: 'andrea.gribovska@yahoo.com',
        pass: 'Umetnickadusa88'
      }
    });

    const mailOptions = {
      from: email,
      to: 'andrea.gribovska@yahoo.com',
      subject: 'Новое сообщение с формы обратной связи',
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Сообщение отправлено успешно');
    } catch (error) {
      res.status(500).send(error.toString());
    }
  } else {
    res.status(405).send('Метод не поддерживается');
  }
}
