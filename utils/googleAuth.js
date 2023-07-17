import { google } from 'googleapis'


const connectGoogleSheet = () => {
  const auth = new google.auth.JWT({
    email: process.env.SERVICE_ACCOUNT_EMAIL,
    key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  const googleSheets = google.sheets('v4').spreadsheets

  return {
    googleSheets,
    auth,
  }
}

export default connectGoogleSheet
