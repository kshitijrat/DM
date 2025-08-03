const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber'); // import model

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Save email to DB
    const existing = await Subscriber.findOne({ email });
    if (!existing) await Subscriber.create({ email });

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kshitijratnawat@gmail.com',
        pass: 'awau thly nppk peoe'  // 🔐 App password only
      }
    });

    const mailOptions = {
      from: 'kshitijratnawat@gmail.com',
      to: email,
      subject: 'Subscription Confirmation - Disaster Alert',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You will now receive important weather and disaster alerts.</p>
        <br/>
        <small>If you didn’t subscribe, please ignore this message.</small>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error subscribing" });
  }
});

module.exports = router;
