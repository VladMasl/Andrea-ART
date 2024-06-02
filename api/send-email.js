const nodemailer = require('nodemailer');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Настройка транспорта для отправки почты
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Настройка сообщения
    let mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
