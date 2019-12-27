const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const numeral = require("numeral");

const telegramBot = require("./form-submission-bot");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

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

app.post("/send-order", async (req, res) => {
    // const html = `<h1>Yangi Buyurtma</h1>
    // <h3>Buyurtma ma'lumotlari</h3>
    // <ul>
    //     <li>Telefon raqami: ${req.body.phone}</li>
    //     <li>To'lov valyutasi: ${req.body.currency}</li>
    //     <li>To'lov turi: ${req.body.paymentMethod}</li>
    //     <li>To'lov miqdori: ${numeral(req.body.amountToExchange).format(
    //         "0,0"
    //     )} ${req.body.currency}</li>
    //     <li>Istalgan valyutasi: ${req.body.exchangeCurrency}</li>
    //     <li>${
    //         req.body.walletNum
    //             ? "Hamyon raqami: " + req.body.walletNum
    //             : "Plastik karta raqami: " + req.body.cardNum
    //     }</li>
    //     <li>Umumiy summa: ${numeral(req.body.receiveAmount).format(
    //         "0,0.000000"
    //     )} ${req.body.exchangeCurrency}</li>
    // </ul>
    // <br><br><br><hr><br><br>
    // <h3>Buyurtma berilgan vaqtdagi kurslar</h3>
    // <ul>
    //     <li>BTC-UZS kursi: 1 BTC - ${numeral(req.body.btcRateUZS).format(
    //         "0,0.00"
    //     )} UZS</li>
    //     <li>BTC-USD kursi: 1 BTC - ${numeral(req.body.btcRateUSD).format(
    //         "0,0.00"
    //     )} USD</li>
    //     <li>WMZ-UZS kursi: 1 WMZ - ${numeral(req.body.wmzToUZS).format(
    //         "0,0.00"
    //     )} UZS</li>
    // </ul>`;

    //Telegram message template
    const telegramHtml = `<b>Yangi Buyurtma</b>
            <i>Telefon raqami: ${req.body.phone}</i>
            <i>To'lov valyutasi: ${req.body.currency}</i>
            <i>To'lov turi: ${req.body.paymentMethod}</i>
            <i>To'lov miqdori: ${numeral(req.body.amountToExchange).format(
                "0,0"
            )} ${req.body.currency}</i>
            <i>Istalgan valyutasi: ${req.body.exchangeCurrency}</i>
            <i>${
                req.body.walletNum
                    ? "Hamyon raqami: " + req.body.walletNum
                    : "Plastik karta raqami: " + req.body.cardNum
            }</i>
            <i>Umumiy summa: ${numeral(req.body.receiveAmount).format(
                "0,0.000000"
            )} ${
        req.body.exchangeCurrency
    }</i>\n<b>Buyurtma berilgan vaqtdagi kurslar</b>
            <i>BTC-UZS kursi: 1 BTC - ${numeral(req.body.btcRateUZS).format(
                "0,0.00"
            )} UZS</i>
            <i>BTC-USD kursi: 1 BTC - ${numeral(req.body.btcRateUSD).format(
                "0,0.00"
            )} USD</i>
            <i>WMZ-UZS kursi: 1 WMZ - ${numeral(req.body.wmzToUZS).format(
                "0,0.00"
            )} UZS</i>`;

    try {
        // trader_188@list.ru, butabaev.o@gmail.com
        // Send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: '"Crypto Actives" <javlon@encompass.uz>', // sender address
        //     to: "jbutabaev@gmail.com, trader_188@list.ru, butabaev.o@gmail.com", // list of receivers
        //     subject: "Yangi Buyurtma", // Subject line
        //     html: html
        // });
        // console.log("Message sent: %s", info.messageId);

        // Read subscribers list file and store data into array
        const subscribers = fs
            .readFileSync("botSubscribersList")
            .toString()
            .split(",");

        // Iterate through the subscribers list array
        // and send the order details to every subscriber
        subscribers.forEach(subscriberId =>
            telegramBot.sendMessage(subscriberId, telegramHtml, {
                parse_mode: "HTML"
            })
        );

        res.sendFile(path.join(__dirname, "build", "index.html"));
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/feedback", async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: '"Crypto Actives" <javlon@encompass.uz>', // sender address
            to: "jbutabaev@gmail.com, trader_188@list.ru, butabaev.o@gmail.com", // list of receivers
            subject: `${req.body.subject ||
                "Qayta aloqa formasidan yangi xabar"}`, // Subject line
            html: ` <h1>Qayta aloqa formasidan yangi xabar</h1>
                        <h3>Shaxs haqidagi ma'lumotlar</h3>
                        <ul>
                            <li>Ismi: ${req.body.lastName}, ${req.body.firstName}</li>
                            <li>Elektron manzil: ${req.body.email}</li>
                            <li>Telefon raqami: ${req.body.phone}</li>
                            <li>Xabar: ${req.body.message}</li>
                        </ul>`
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.sendFile(path.join(__dirname, "build", "index.html"));
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "about.html"));
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
