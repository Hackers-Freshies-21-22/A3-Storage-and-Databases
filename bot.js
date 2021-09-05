const token = process.env.TELEGRAM_TOKEN;
var telegramUrl = "https://api.telegram.org/bot" + token;

const axios = require('axios');
const { client } = require('./connection')

console.log(`Bot started in the ${process.env.NODE_ENV} mode`);

//setWebhook https://api.telegram.org/bot<token>/setWebhook?url=<url>

async function processUpdate(body) {
  try {
    await client.connect();
    const db = client.db('database').collection('checklist')

    const chatId = body.message.chat.id;
    const text = body.message.text;

    //parses the text received 
    const command = text.split(" ", 2)[0];
    const description = text.split(`${command}`, 2)[1].trim();

    if (command == "/add") {
      add(chatId, description, db);
    } else if (command == "/list") {
      list(chatId, db);
    } else {
      sendText(chatId, "Sorry, I don't know this command.")
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

function sendText(chatId, text) {
  var data = {
    "chat_id": chatId,
    "text": text,
    "parse_mode": "Markdown",
  };
  const res = axios.post(`${telegramUrl}/sendMessage`, data);
  res.then(response => {
    return response;
  }).catch(err => console.log(err));
}


/**
 * Adds a task into the list
 */
function add(chatId, description, db) {
  await db.insertOne({ 
    "description": description });
  sendText(chatId,`Added: ${description}`);
}

/**
 * Lists all the tasks in the database
 */
function list(chatId, db) {
  var result = "Checklist:\n";
    const arr = await db.find({}).toArray();

    for (let i = 0; i < arr.length; i++) {
      result += `${i+1}. ${arr[i].description}\n`;
    }
    sendText(chatId, result);
}

module.exports.processUpdate = processUpdate;
