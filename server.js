const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.post("/send-order", async (req, res) => {
    console.log(req.body);

    try {
        // Create a tes account from ethereal.email
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Crypto Actives 💵" <order@cryptoactives.uz>', // sender address
            to: "butabaev.o@gmail.com, jbutabaev@gmail.com", // list of receivers
            subject: "Exchange order", // Subject line
            text: `${JSON.stringify(req.body)}` // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.sendFile(path.join(__dirname, "build", "index.html"));
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
