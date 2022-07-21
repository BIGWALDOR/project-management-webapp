import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import './index.css'
import Header from './components/Header'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
      </ApolloProvider>
    </>
  )
}

export default App
