import getTime from '../utils/getTimeUtils.js'
import connectGoogleSheet from '../utils/googleAuth.js'


class GoogleSheetsService {
  async writeData(products, store) {
    const { googleSheets, auth } = connectGoogleSheet()
    const date = getTime(new Date())

    const values = [[JSON.stringify(products), date]]

    await googleSheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      auth: auth,
      range: store,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    })

  }

  async getData() {
    const { googleSheets, auth } = connectGoogleSheet()

    const values = await googleSheets.values.get({
      spreadsheetId: '1iC68h3tiYhEXGPOgb9uoAKqq_oRi3EvWgtPWsVZhQyk',
      auth: auth,
      range: 'Sheet1',
    })

    const data = values.data.values.map(item => JSON.parse(item[0]))
    console.log(data)
    return JSON.stringify(data[0])
  }
}

export default new GoogleSheetsService()
