const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

Alert = require('./models/schema.js');


const d = new Date();


app.get('/', (req, res) => {
    res.render('form');
})

app.post('/new', (req, res) => {
    const result = new Alert({
        FirstName:req.body.fname,
        LastName:req.body.lname,
        Gender:req.body.gender,
        Email:req.body.email,
        PhoneNumber:req.body.number,
        Status:req.body.check,
    })
    result.save();
    const mail = req.body.email;
    const check = req.body.check;
    const message = {
        to: mail,
        from: "arsh1033.cse19@chitkara.edu.in",
        subject: "Email Sent By Arsh Bandlish",
        html: `<h1>You ${check}  The Office at ${d.getHours()}:${d.getMinutes()} IST</h1>`,
    }

    sgMail.send(message)
        .then((response) => {
            console.log("Sent Successfully");
        })
        .catch((err) => {
            console.log(err);
        })  
    res.render('enter');
})


app.post('/enter',(req,res)=>{
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Connected To Port  ${port}`);
})