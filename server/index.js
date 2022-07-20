const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')
const connectDB = require('./config/db')

require('dotenv').config()

const port = process.env.PORT || 4000
const app = express()

// MongoDB
connectDB()

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)

app.listen(port, console.log(`Server running on port ${port}`))
