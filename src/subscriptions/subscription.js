import {gql} from "@apollo/client";

export const GET_CONTACTS_LIVE = gql`
subscription getContacts {
    contacts(order_by: {nom: asc}) {
      nom
      id
      phone
    }
  }
`;
