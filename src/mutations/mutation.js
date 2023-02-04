import { gql } from "@apollo/client";
export const ADD_CONTACT =gql`
  mutation addContacts($nom: String!, $phone: numeric) {
    insert_contacts(objects: {nom: $nom, phone: $phone}) {
      affected_rows
    }
  }
`;
export const UPDATE_CONTACT =gql`
mutation MyMutation2($id: uuid!, $nom: String!, $phone: numeric) {
    update_contacts(where: {id: {_eq: $id}}, _set: {nom: $nom, phone: $phone}) {
      affected_rows
    }
  }
`;
export const DELETE_CONTACT =gql`
mutation deleteContact($id: uuid!) {
    delete_contacts(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
  
`;