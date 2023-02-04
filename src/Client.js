import  {ApolloClient}  from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
    uri:"https://contact-app-react.hasura.app/v1/graphql",
    cache:new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': 'cAyLKOD5znhWwYtwTOAAbtp2pNB1mxYsj9tUVCgIjFGnirweDfnJKuhx7ssngQMF',
    },

})

export default client;