import fetch from 'node-fetch'

const interval = 25
const wakeUpDyno = (url, bot) => {
  const milliseconds = interval * 60000
  setInterval(() => {
    try {
      // bot('wake', '')
      // HTTP GET request to the dyno's url
      fetch(url).then(() => console.log(`Fetching ${url}.`))
    } catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} 
            Will try again in ${interval} minutes...`)
    }
  }, milliseconds)
}

export default wakeUpDyno
