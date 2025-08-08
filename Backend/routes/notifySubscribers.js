const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber');

router.post('/notify', async (req, res) => {
  const { subject, content } = req.body;

  if (!subject || !content) return res.status(400).json({ message: "Subject and content required" });

  try {
    const subscribers = await Subscriber.find({});
    const emails = subscribers.map(sub => sub.email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kshitijratnawat@gmail.com',
        pass: process.env.SMTP_PASS,
      }
    });

    const mailOptions = {
      from: 'kshitijratnawat@gmail.com',
      to: emails,
      subject,
      html: content
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `Email sent to ${emails.length} subscribers` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to notify subscribers" });
  }
});

module.exports = router;
