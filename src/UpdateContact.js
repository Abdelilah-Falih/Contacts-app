import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_CONTACT } from "./mutations/mutation";

function UpdateContact(props){
    const [contact,setContact]=React.useState({nom:"",phone:"",id:""});
    const [error,setError]=React.useState();
    const [updateContact] = useMutation(UPDATE_CONTACT)
    React.useEffect(()=>{
        setContact(props.contact)
    },[props.contact])
    function Change(event){
        setContact({
            ...contact,[event.target.name]:event.target.value,
        })
    }
    function hundleSubmit(event){
        event.preventDefault();
        const {id,nom,phone}=contact;
        if(nom && phone){
            updateContact({
                variables:{id,nom,phone}
            })
            setError("")
        }else{
            setError("Tous Les Champs Sont Obligatoires ! ")
        }
    }
    return(
        <div 
        id="updateContact"
        tabindex="-1"
        aria-hidden="true"
        className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Modifier Contact
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">
                            {error}
                        </div> 
                        }
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="nom" className="form-label">Nom Et Prénom</label>
                                <input type="text" name="nom"  id="nom"
                                onChange={(event)=>Change(event)}
                                className="form-control"
                                placeholder="Nom et Prénom..."
                                value={contact.nom} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Téléphone</label>
                                <input type="number" name="phone"  id="phone"
                                onChange={(event)=>Change(event)}
                                className="form-control"
                                placeholder="Téléphone..."
                                value={contact.phone} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button 
                        onClick={(event)=>hundleSubmit(event)}
                        className="btn btn-primary">
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )  
}
export default UpdateContact;