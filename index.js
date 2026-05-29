const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

// Initialize bot with polling
const bot = new TelegramBot(token, { polling: true });

// START COMMAND - Fee structure display
bot.onText(/\/start/, (msg) => {
    const startMsg = 
        "👑 <b>Fee Structure:</b>\n\n" +
        "<tg-emoji emoji-id='5368324170671202286'>•</tg-emoji> <b>UNDER 400</b> - Rs 10\n" +
        "<tg-emoji emoji-id='5368324170671202286'>•</tg-emoji> <b>Rs 401 To Rs 2000</b> - 3%\n" +
        "<tg-emoji emoji-id='5368324170671202286'>•</tg-emoji> <b>Rs 2001 To Rs 5K</b> - 3.5%\n" +
        "<tg-emoji emoji-id='5368324170671202286'>•</tg-emoji> <b>Upper Than Rs 5K</b> - 3%\n\n" +
        "If you want your own custom bot, contact : @Cixxu\n\n" +
        "Powered by @Cixxu <tg-emoji emoji-id='6296577138615125756'>⚡</tg-emoji>";

    bot.sendMessage(msg.chat.id, startMsg, { parse_mode: 'HTML' });
});

// COMMON FUNCTION - Fee Calculator
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

// HELPER FUNCTION - Safe Input Parser
function parseAmount(input) {
    const amt = parseFloat(input);
    return isNaN(amt) || amt <= 0 ? null : amt;
}

// /p COMMAND - Plus/Add fee
bot.onText(/\/p(?:@[\w_]+)?\s*(\d+(?:\.\d+)?)/, (msg, match) => {
    const amt = parseAmount(match[1]);

    if (!amt) {
        bot.sendMessage(
            msg.chat.id,
            "⚠️ <b>Galat Format!</b>\n\n" +
            "💡 Use like: <code>/p 1000</code>\n\n" +
            "Powered by @Cixxu <tg-emoji emoji-id='6296577138615125756'>⚡</tg-emoji>",
            { parse_mode: 'HTML' }
        );
        return;
    }

    const { fee, percent } = calculateFee(amt);
    const total = amt + fee;

    const responseMsg = 
        `<tg-emoji emoji-id="4956719506027185156">💰</tg-emoji> <b>Amount:</b> ₹${amt}\n` +
        `<tg-emoji emoji-id="5195100606250889609">📉</tg-emoji> <b>Fees:</b> ₹${fee.toFixed(2)} (${percent})\n` +
        `<tg-emoji emoji-id="4958734459869332468">📊</tg-emoji> <b>Total:</b> ₹${total.toFixed(2)}\n\n` +
        `Powered by @Cixxu <tg-emoji emoji-id="6296577138615125756">⚡</tg-emoji>`;

    bot.sendMessage(msg.chat.id, responseMsg, { parse_mode: 'HTML' });
});

// /c COMMAND - Cut/Subtract fee
bot.onText(/\/c(?:@[\w_]+)?\s*(\d+(?:\.\d+)?)/, (msg, match) => {
    const amt = parseAmount(match[1]);

    if (!amt) {
        bot.sendMessage(
            msg.chat.id,
            "⚠️ <b>Galat Format!</b>\n\n" +
            "💡 Use like: <code>/c 1000</code>\n\n" +
            "Powered by @Cixxu <tg-emoji emoji-id='6296577138615125756'>⚡</tg-emoji>",
            { parse_mode: 'HTML' }
        );
        return;
    }

    const { fee, percent } = calculateFee(amt);
    const final = amt - fee;

    const responseMsg = 
        `<tg-emoji emoji-id="4956719506027185156">💰</tg-emoji> <b>Amount:</b> ₹${amt}\n` +
        `<tg-emoji emoji-id="5195100606250889609">📉</tg-emoji> <b>Fees:</b> ₹${fee.toFixed(2)} (${percent})\n` +
        `<tg-emoji emoji-id="4958734459869332468">📊</tg-emoji> <b>Final:</b> ₹${final.toFixed(2)}\n\n` +
        `Powered by @Cixxu <tg-emoji emoji-id="6296577138615125756">⚡</tg-emoji>`;

    bot.sendMessage(msg.chat.id, responseMsg, { parse_mode: 'HTML' });
});
