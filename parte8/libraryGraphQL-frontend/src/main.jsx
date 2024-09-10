import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { setContext } from "@apollo/client/link/context"
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
  } from '@apollo/client'



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

createRoot(document.getElementById("root")).render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
 )
