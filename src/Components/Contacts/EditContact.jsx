import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams,} from 'react-router-dom'
import { ContactService } from '../../Services/ContactService';
import Spinner from '../Spinner/Spinner';
const EditContact = () => {

    let navigate = useNavigate();

    let {contactId} =useParams();

    let[state,setState]= useState({

        loading:false,
        contact: {
            name:'',
            photo:'',
            mobile:"",
            email:'',
            company:'',
            title:'',
            groupId:''
        },
        groups:[],
        errorMessage : ''
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setState({ ...state, loading: true });
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroups();
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    groups:groupResponse.data
                });
                
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message,
                });
            }
        };

        fetchContacts();
    }, [contactId]);


    let updateInput = (event) =>{
        setState({
            ...state,
            contact:{
            ...state.contact,
            [event.target.name] : event.target.value,
            }
        })
    }

    let submitForm = async(event) =>{

        event.preventDefault();

        try {

            let response = await ContactService.updateContact(state.contact,contactId)

            if(response){
                navigate('/contacts/list',{replace:true});
            }
        } catch (error) {
            setState({...state, errorMessage:error.message});
            navigate(`/contacts/edit/${contactId}`, {replace:false})
        }
    }

    let{loading,contact,groups,errorMessage} =state;

  return (
    <>
    {
        loading ? <Spinner/> : <>
        <sction className="add-contact p-3">
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="h4 text-primary fw-bold">Edit Contact</p>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, labore! Molestias similique reprehenderit temporibus atque mollitia magni sint quae ut excepturi sed quisquam aspernatur quasi, natus iste laborum delectus eos.</p>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-4">
                    <form  onSubmit={submitForm}>
                        <div className="mb-2">
                            <input type="text" name='name'  required="true"
                            value={contact.name}  onChange={updateInput} className='form-control' placeholder='Name'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" name='photo'  required="true"
                            value={contact.photo}  onChange={updateInput} className='form-control' placeholder='Photo Url'/>
                        </div>
                        <div className="mb-2">
                            <input type="number"name='mobile'  required="true"
                            value={contact.mobile}  onChange={updateInput} className='form-control' placeholder='Mobile'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" name='email'  required="true"
                            value={contact.email}  onChange={updateInput}className='form-control' placeholder='Email'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" name='company'  required="true"
                            value={contact.company}  onChange={updateInput} className='form-control' placeholder='Company'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" name='title'  required="true"
                            value={contact.title}  onChange={updateInput} className='form-control' placeholder='Title'/>
                        </div>
                        <div className="mb-2">
                            <select name='groupId'  required="true"
                            value={contact.groupId}  onChange={updateInput} id="" className='form-control'>
                                <option value="">Select a Group</option>
                                {
                                    groups.length > 0 && 

                                    groups.map(group => {
                                        return(
                                            <option  key={group.id} value={group.id}>{group.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-2">
                            <input type="submit" className='btn btn-primary' value={'Update'}/>
                            <Link to="/contacts/list" className="btn btn-dark ms-2">Cancel </Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <img src={contact.photo} alt=""  className='contact-img'/>
                </div>
            </div>
        </div>
      </sction>
        </>
    }
      
    </>
  )
}

export default EditContact
