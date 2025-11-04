const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// POST route to send email
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  // Configure email transporter (using Gmail as example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",   // your Gmail
      pass: "YOUR_APP_PASSWORD"       // create Gmail App Password
    }
  });

  // Email details
  const mailOptions = {
    from: email,
    to: "YOUR_EMAIL@gmail.com",  // where you want to receive the messages
    subject: "New Contact Form Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error: " + error);
    }
    res.send("Message sent successfully!");
  });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
