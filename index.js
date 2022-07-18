const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: false, // true for 465, false for other ports
    service: 'gmail', //smtp.gmail.com
    secure: false, //true
    port: 25, //465
        auth: {
      user: "maxpayne0689@gmail.com", 
      pass: "mstxboxtuxcmppqp", 
    },
    tls: {
        rejectUnauthorized: false
    }
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/send-message', async (req, res) => {
   
    let {sender, email, subject, phone, textMessage } = req.body

    let mailLetter = {
        from: 'MY PORTFOLIO',
        to: "maxpayne0689@gmail.com",
        subject: subject,
        // text: "response ==> OK. Testing send messages to mail",
        html: `<b>Message from your portfolio!</b>
        <div><b>name:</b> ${sender}</div>
        <div><b>phone:</b> ${phone}</div>
        <div><b>subject</b>: ${subject}</div>
        <hr/>
        <div>${textMessage}</div>`
    } 
    

    await transporter.sendMail(mailLetter, function(err, data) {
        err ? console.log('Error occurs') : console.log('Email send successfully')
        }
    )

    res.send('Send success!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})