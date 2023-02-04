import { gql } from "@apollo/client";
export const GET_CONTACTS = gql`
query getContacts {
  contacts(order_by: {nom: asc}) {
    nom
    id
    phone
  }
}
`;
