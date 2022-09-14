import express from 'express'

const app = express()

app.get('/games', (request, response) => {
  return response.json([])
})

app.post('/ads', (request, response) => {
  return response.status(201).json([])
}) 


app.get('/ads', (request, response) => {
  return response.send('Acessou Ads!')
})

app.listen(3333, () => {
  console.log('Server running!')
})