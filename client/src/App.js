import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import './index.css'
import Header from './components/Header'
import Clients from './components/Clients'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
