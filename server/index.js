const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const http = require('http')

const schema = require('./schema/schema')
const connectDB = require('./config/db')

require('dotenv').config()

const app = express()

// MongoDB
connectDB()

// CORS
app.use(cors())

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'))

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

http.createServer(onRequest).listen(process.env.PORT || 4000)
