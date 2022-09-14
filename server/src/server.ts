import express from 'express'

const app = express()

app.get('/games', (request, response) => {
  return response.json([])
})

app.get('/ads', (request, response) => {
  return response.send('Acessou Ads!')
})

app.listen(3333, () => {
  console.log('Server running!')
})