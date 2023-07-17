import googleSheets from '../services/googleSheets.js'
import parseMessage from './parseMessage.js'

const getBestDeal = (message) => {
  const { products, store } = parseMessage(message)

  googleSheets.writeData(products, store)

  let maxPriceIndex = 0
  products.forEach((product, index) => {
      if (product.sellPrice > products[maxPriceIndex].sellPrice) {
          maxPriceIndex = index
      }
  })

  return products[maxPriceIndex]
}

export default getBestDeal
