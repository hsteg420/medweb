const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/text", (req, res) => {
    const { phone, msg } = req.body
    client.messages
        .create({ body: msg, from: "+12057976004", to: phone })
        .then((message) => `Sent ${message.sid}`)
})

app.listen(8080, () => {
    console.log("Express server listening on port 8080")
})
