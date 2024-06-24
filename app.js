const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const twilio = require('twilio')
const usersController = require("./controllers/usersController");
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

app.use(cors());
app.use(express.json());
app.use("/users", usersController);
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ index: "This is the index page" });
});

app.post('/sendSMS', async (req, res) => {
  const { to, message } = req.body
  const from = '+18442507058'
  try {
    if (Array.isArray(to)) {
      for (const phoneNumber of to) {
        const response = await client.messages.create({
          body: message,
          from: from,
          to: phoneNumber
        })
      }
    } else {
      const response = await client.messages.create({
        body: message,
        from: from,
        to: to
      })
    }
    res.status(200).json({ message: 'Message(s) sent successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = app