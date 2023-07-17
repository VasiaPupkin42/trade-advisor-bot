const parseMessage = (message) => {
const formatted = message.split('из магазина.')[1]
  const lines = formatted.split('\n').filter(line => line !== '')
  const products = []
  let store = ''

  if (message.includes('Универмаг "Немного семени"')) {
    store = 'Supermarket'
  } else if (message.includes('Мясная лавка "FreshMeat"')) {
    store = 'FreshMeat'
  } else if (message.includes('Охотничья лавка "Охота Хлипкое"')) {
    store = 'HunterStore'
  } else if (message.includes('Банк ресурсов "Ролекс"')) {
    store = 'RolexBank'
  }


  lines.forEach((line, index) => {
    if (!line.includes('💵')) {
      const productName = line
      const prices = lines[index+1].match(/(\d+\.\d+)|(\d+)/g)
      const sellPrice = parseFloat(prices[0])
      const buyPrice = parseFloat(prices[1])

      products.push({ productName, sellPrice, buyPrice })
    }
  })

  return {products, store}
}

export default parseMessage
