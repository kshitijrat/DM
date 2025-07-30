const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kshitijratnawat@gmail.com',        // 🔐 Use app password, not real password
      pass: 'awau thly nppk peoe'
    }
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'Subscription Confirmation - Disaster Alert',
    html: `
      <h2>Thank you for subscribing!</h2>
      <p>You will now receive important weather and disaster alerts.</p>
      <br/>
      <small>If you didn’t subscribe, please ignore this message.</small>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
