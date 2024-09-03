import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
  } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
     uri: 'http://localhost:4000'
  })
})

createRoot(document.getElementById("root")).render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
 )
