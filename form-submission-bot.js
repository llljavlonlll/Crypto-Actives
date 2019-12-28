const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API, { polling: true });

bot.onText(/\/subscribe/, msg => {
    let chatIds = [];

    if (!!fs.readFileSync("botSubscribersList", "utf-8")) {
        chatIds = fs.readFileSync("botSubscribersList", "utf-8").split(",");
    }

    if (chatIds.indexOf(msg.chat.id.toString()) === -1) {
        chatIds.push(msg.chat.id);
        fs.writeFileSync("botSubscribersList", chatIds);
        bot.sendMessage(msg.chat.id, "You have been subscribed!");
    }
});

bot.onText(/\/unsubscribe/, msg => {
    let chatIds = [];

    if (!!fs.readFileSync("botSubscribersList", "utf-8")) {
        chatIds = fs
            .readFileSync("botSubscribersList", "utf-8")
            .split(",")
            .filter(subscriber => {
                return parseInt(subscriber) !== msg.chat.id;
            });

        // Write new array to the file
        fs.writeFileSync("botSubscribersList", chatIds);

        bot.sendMessage(msg.chat.id, "You have been unsubscribed!");
    } else {
        bot.sendMessage(msg.chat.id, "You have been unsubscribed!");
    }
});

bot.onText(/\/chatid/, msg => {
    bot.sendMessage(msg.chat.id, `Chat ID: ${msg.chat.id}`);
});

module.exports = bot;
