import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: 'wss://contact-app-react.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: () => {
        return { headers: { 'x-hasura-admin-secret': 'cAyLKOD5znhWwYtwTOAAbtp2pNB1mxYsj9tUVCgIjFGnirweDfnJKuhx7ssngQMF' } }
      }
    }
  });

  const httpLink = new HttpLink({
    uri: 'https://contact-app-react.hasura.app/v1/graphql',
    headers: { 'x-hasura-admin-secret': 'cAyLKOD5znhWwYtwTOAAbtp2pNB1mxYsj9tUVCgIjFGnirweDfnJKuhx7ssngQMF' },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    headers: { 'x-hasura-admin-secret': 'cAyLKOD5znhWwYtwTOAAbtp2pNB1mxYsj9tUVCgIjFGnirweDfnJKuhx7ssngQMF' },
    onError: ({ networkError, graphQLErrors }) => {
      console.log('networkError', networkError);
      console.log('graphQLErrors', graphQLErrors);
    },
  });

export default client;
    