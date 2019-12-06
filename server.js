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
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.encompass.uz",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "javlon@encompass.uz", // username
                pass: "Ilw1ias5" // password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"💵💵💵 Crypto Actives 💵💵💵" <javlon@encompass.uz>', // sender address
            to: "butabaev.o@gmail.com, jbutabaev@gmail.com", // list of receivers
            subject: "Yangi Zakaz", // Subject line
            html: ` <h1>Yangi Zakaz</h1>
                    <h3>Telefon raqami: ${req.body.phone}</h3>
                    <ul>
                        <li>To'lov valyutasi: ${req.body.currency}</li>
                        <li>To'lov turi: ${req.body.paymentMethod}</li>
                        <li><strong>To'lov miqdori: ${req.body.amountToExchange}</strong></li>
                        <li>Istalgan valyutasi: ${req.body.exchangeCurrency}</li>
                        <li><strong>Hamyon raqami: ${req.body.walletNum}</strong></li>
                        <li>BTC-UZS kursi: UZS ${req.body.btcRateUZS}</li>
                        <li>BTC-USD kursi: USD ${req.body.btcRateUSD}</li>
                        <li></strong>Umumiy summa: ${req.body.receiveAmount} ${req.body.exchangeCurrency}</strong></li>
                    </ul>`
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.sendFile(path.join(__dirname, "build", "index.html"));
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
