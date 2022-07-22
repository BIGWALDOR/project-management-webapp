const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

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

app.listen(
  process.env.PORT || 4000,
  console.log(`Server running on port ${process.env.PORT}`)
)
