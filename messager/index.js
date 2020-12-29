const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ADMI_USER = process.env.TELEGRAM_BOT_ADMIN
const bot = new TelegramBot(BOT_TOKEN, {polling: false})

module.exports = async function messager(message) { //Send notification to the admin
    //CODE THIS
    await bot.sendMessage(ADMI_USER,message,{parse_mode: 'Markdown'})
    console.log(`📤 Message:  ${message} wass send to ADMI_USER`)
}