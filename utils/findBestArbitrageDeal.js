import parseMessage from './parseMessage.js'

const findBestArbitrageDeal = (message) => {
  const productPrices = parseMessage(message)
  let bestDeal = null

  for (const item of productPrices) {
    const profit = (item.sellPrice - item.buyPrice).toFixed(2)

    if (profit > 0 && (!bestDeal || profit > bestDeal.profit)) {
      bestDeal = { ...item, profit }
    }
  }

  return bestDeal
}

export default findBestArbitrageDeal
