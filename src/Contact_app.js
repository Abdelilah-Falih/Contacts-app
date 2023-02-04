import React from "react";
import { useMutation } from "@apollo/client";
import AddContact from "./AddContact";
import { GET_CONTACTS_LIVE } from "./subscriptions/subscription";
import { useSubscription } from "@apollo/react-hooks";
import UpdateContact from "./UpdateContact";
import { DELETE_CONTACT } from "./mutations/mutation";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
function Contact_app() {
  function handleDelete(contact) {
    confirmAlert({
      title: 'Confirm',
      message: 'Voulez-vous Vraiment Supprimer Ce Contact',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const {id}=contact;
            deleteContact({
            variables:{id}
            })
          }
        },
        {
          label: 'No',
          onClick: () => {return}
        }
      ]
    });
  }
  const {data,error,loading}=useSubscription(GET_CONTACTS_LIVE, {fetchPolicy: 'network-only'});
  const [deleteContact]=useMutation(DELETE_CONTACT)
  const [contact,setContact] = React.useState({nom:"",phone:""})



  //const {data,error,loading}=useQuery(GET_CONTACTS);
  if(loading){
    return (
      <div className="container">
          <div className="row my-4">
            <div className="col-md-6 text-center mx-auto">
              <div className="spinner-grow text-warning" style={{width: "5rem", height: "5rem"}}>
              </div>
            </div> 
          </div>
      </div>
    )
  } 
  if(error){
    return (
      <div className="container">
          <div className="row my-4">
            <div className="col-md-6  mx-auto text-center">
              <div className="alert alert-danger">
                <h3>
                  {error.message}
                </h3>
              </div>
            </div>
          </div>
      </div>
    )
  }
  return (
    <div className="App">
      <div className="container">
          <div className="row my-4">
            <div className="col-md-6  mx-auto">
              <div className="card">
                <div className="form-group">
                  <button 
                    data-bs-toggle="modal"
                    data-bs-target="#AddContact"
                    className="btn btn-primary btn-sm">
                  Ajouter
                  </button>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>nom</th>
                      <th>phone</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.contacts.map((contacts,i)=>(
                        <tr key={i}>
                          <td>{contacts.nom}</td>
                          <td>{contacts.phone}</td>
                          <td>
                            <button 
                              data-bs-toggle="modal"
                              data-bs-target="#updateContact"
                              className="btn btn-warning btn-sm"
                              onClick={()=>setContact(contacts)}>
                            Modifier
                            </button>
                            <button 
                            onClick={()=>handleDelete(contacts)}
                            className="btn btn-sm btn-danger m-2">
                              &times;
                            </button>
                        </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                <AddContact/>
                <UpdateContact contact={contact}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Contact_app;
