// index.js

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
polling: true
});

// FEES FUNCTION
function calculateFee(amount) {
let fee = 0;
let percent = "";

if (amount <= 400) {
fee = 10;
percent = "Fixed";
} else if (amount <= 2000) {
fee = amount * 0.03;
percent = "3%";
} else if (amount <= 5000) {
fee = amount * 0.035;
percent = "3.5%";
} else {
fee = amount * 0.03;
percent = "3%";
}

return { fee, percent };
}

// START
bot.onText(//start/, async (msg) => {
await bot.sendMessage(
msg.chat.id,
`<b>💸 ESCROW CALCULATOR</b>

Use:
/p amount
/c amount

Example:
<code>/p 1000</code>

Powered By @Cixxu`,
{
parse_mode: "HTML"
}
);
});

// /p COMMAND
bot.onText(//p(?:@[\w_]+)?(?:\s+(.+))?/, async (msg, match) => {

const amount = parseFloat(match[1]);

if (!amount || amount <= 0) {
return bot.sendMessage(
msg.chat.id,
"Use like: /p 1000",
{
reply_to_message_id: msg.message_id
}
);
}

const { fee, percent } = calculateFee(amount);

const total = amount + fee;

await bot.sendMessage(
msg.chat.id,

`<b><tg-emoji emoji-id="4956719506027185156">💰</tg-emoji> Amount:</b> ₹${amount.toFixed(2)}

<b><tg-emoji emoji-id="5195100606250889609">📊</tg-emoji> Fees:</b> ₹${fee.toFixed(2)} (${percent})

<b><tg-emoji emoji-id="4958734459869332468">💸</tg-emoji> Total:</b> ₹${total.toFixed(2)}

<b>Powered By @Cixxu</b> <tg-emoji emoji-id="6296577138615125756">🔥</tg-emoji>`,

{
  parse_mode: "HTML",
  reply_to_message_id: msg.message_id
}

);
});

// /c COMMAND
bot.onText(//c(?:@[\w_]+)?(?:\s+(.+))?/, async (msg, match) => {

const amount = parseFloat(match[1]);

if (!amount || amount <= 0) {
return bot.sendMessage(
msg.chat.id,
"Use like: /c 1000",
{
reply_to_message_id: msg.message_id
}
);
}

const { fee, percent } = calculateFee(amount);

const total = amount - fee;

await bot.sendMessage(
msg.chat.id,

`<b><tg-emoji emoji-id="4956719506027185156">💰</tg-emoji> Amount:</b> ₹${amount.toFixed(2)}

<b><tg-emoji emoji-id="5195100606250889609">📊</tg-emoji> Fees:</b> ₹${fee.toFixed(2)} (${percent})

<b><tg-emoji emoji-id="4958734459869332468">💸</tg-emoji> Total:</b> ₹${total.toFixed(2)}

<b>Powered By @Cixxu</b> <tg-emoji emoji-id="6296577138615125756">🔥</tg-emoji>`,

{
  parse_mode: "HTML",
  reply_to_message_id: msg.message_id
}

);
});

console.log("Bot Running...");
