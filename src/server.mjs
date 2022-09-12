import express from 'express'

const app = express()

app.get('/ads', (request, response) => {
  return response.send('Acessou Ads!')
})

app.listen(3333, () => {
  console.log('Server running!')
})