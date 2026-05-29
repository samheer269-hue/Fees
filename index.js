const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// START - Purana format custom link premium emoji ke sath
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

// /p command - Purana format with Working Custom Premium Emojis
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

    // Yahan HTML style anchor tag use kiya hai premium emoji ke liye
    const textMsg = 
        `<a href="tg://emoji?id=4956719506027185156">💰</a> ${amt} + ` +
        `<a href="tg://emoji?id=5195100606250889609">📉</a> ${fee.toFixed(2)} (${percent}) = ` +
        `<a href="tg://emoji?id=4958734459869332468">📊</a> ${total.toFixed(2)}\n\n` +
        `Powered by @cixxu <a href="tg://emoji?id=6296577138615125756">⚡</a>`;

    bot.sendMessage(msg.chat.id, textMsg, { parse_mode: 'HTML' });
});

// /c command - Purana format with Working Custom Premium Emojis
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

    // Yahan HTML style anchor tag use kiya hai premium emoji ke liye
    const textMsg = 
        `<a href="tg://emoji?id=4956719506027185156">💰</a> ${amt} - ` +
        `<a href="tg://emoji?id=5195100606250889609">📉</a> ${fee.toFixed(2)} (${percent}) = ` +
        `<a href="tg://emoji?id=4958734459869332468">📊</a> ${final.toFixed(2)}\n\n` +
        `Powered by @cixxu <a href="tg://emoji?id=6296577138615125756">⚡</a>`;

    bot.sendMessage(msg.chat.id, textMsg, { parse_mode: 'HTML' });
});
