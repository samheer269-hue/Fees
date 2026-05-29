const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// START - works anywhere
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "• UNDER 400 - Rs 10\n" +
        "• Rs 401 To Rs 2000 - 3%\n" +
        "• Rs 2001 To Rs 5K - 3.5%\n" +
        "• Upper Than Rs 5K - 3%\n\n" +
        "If you want your own custom bot, contact : @Cixxu\n\n" +
        "⚡ Powered By @Cixxu"
    );
});

// COMMON FUNCTION
function calculateFee(amt) {
    let fee = 0;
    let percent = "";

    if (amt <= 400) {
        fee = 10;
        percent = "Fixed";
    } else if (amt <= 2000) {
        fee = amt * 0.03;
        percent = "3%";
    } else if (amt <= 5000) {
        fee = amt * 0.035;
        percent = "3.5%";
    } else {
        fee = amt * 0.03;
        percent = "3%";
    }

    return { fee, percent };
}

// HELPER: parse amount safely
function parseAmount(input) {
    const amt = parseFloat(input);
    return isNaN(amt) || amt <= 0 ? null : amt;
}

// /p command
bot.onText(/\/p(?:\s+(\d+(?:\.\d+)?))?/, (msg, match) => {
    const amt = parseAmount(match[1]);

    if (!amt) {
        bot.sendMessage(
            msg.chat.id,
            "Use like: /p <amount>\nExample: /p 1000\n\n⚡ Powered By @Cixxu"
        );
        return;
    }

    const { fee, percent } = calculateFee(amt);
    const total = amt + fee;

    bot.sendMessage(
        msg.chat.id,
        `₹${amt} + ₹${fee.toFixed(2)} (${percent}) = ₹${total.toFixed(2)}`
    );
});

// /c command
bot.onText(/\/c(?:\s+(\d+(?:\.\d+)?))?/, (msg, match) => {
    const amt = parseAmount(match[1]);

    if (!amt) {
        bot.sendMessage(
            msg.chat.id,
            "Use like: /c <amount>\nExample: /c 1000\n\n⚡ Powered By @Cixxu"
        );
        return;
    }

    const { fee, percent } = calculateFee(amt);
    const final = amt - fee;

    bot.sendMessage(
        msg.chat.id,
        `₹${amt} - ₹${fee.toFixed(2)} (${percent}) = ₹${final.toFixed(2)}`
    );
});
