require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function (req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
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
