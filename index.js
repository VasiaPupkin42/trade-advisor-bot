import telegraf from 'telegraf'
import { message } from 'telegraf/filters'
import getBestDeal from './utils/getBestDeal.js'
import bluebird from 'bluebird'
import dotenv from 'dotenv'

dotenv.config()
const { Telegraf, Markup, Extra } = telegraf
const bot = new Telegraf(process.env.BOT_API_KEY)
const { delay } = bluebird

const onStartMessage = `Hello there! 👋 Welcome to Exarcheia Trade Advisor 🤖

To get the best trading advice and make the most out of your time on the Exarcheia server,
simply forward messages from the bot @exarcheiabot to me. I'll analyze the data and provide you
with valuable insights for profitable deals and price predictions. Let's make some legendary
profits together! 💰💹`
let mainMsgId = ''

const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Универмаг "Немного семени"', 'supermarket'),
    Markup.button.callback('Мясная лавка "FreshMeat"', 'freshmeat'),
    Markup.button.callback('Охотничья лавка "Охота Хлипкое"', 'hunterstore'),
    Markup.button.callback('Банк ресурсов "Ролекс"', 'rolexbank')
  ], { columns: 1 }).oneTime(false)

bot.start(async (ctx) => {
  ctx.reply(
    onStartMessage,
    // keyboard
  ).then(msg => {
    mainMsgId = msg.message_id
  })
})

// bot.action('supermarket', async (ctx) => {
//   const val = await googleSheets.getData()
//   ctx.editMessageText(val, keyboard)
// })

// bot.action('freshmeat', (ctx) => {
//   ctx.editMessageText(onStartMessage, keyboard )
// })

bot.on(message(), (ctx) => {
  if (ctx.message?.forward_from?.username !== 'exarcheiabot') {
    ctx.deleteMessage(ctx.message.message_id)
    return ctx
      .reply('Message should be sended from @exarcheiabot')
      .then(msg => {
        delay(5000).then(() => ctx.deleteMessage(msg.message_id))
      })
  }
  const bestDeal = getBestDeal(ctx.message.text)
  ctx.deleteMessage(ctx.message.message_id)
  ctx.reply(`📊 Best Deal!\n
  🏭 Product: ${bestDeal.productName}
  💵 Sell Price: ${bestDeal.sellPrice}$
  📦 Buy Price: ${bestDeal.buyPrice}$
  `)
})


bot.launch()
