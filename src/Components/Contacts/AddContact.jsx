import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../Services/ContactService';
const AddContact = () => {

    let Navigate = useNavigate()

    let [state,setState]= useState({
        loading:false,
        contact:{

            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:''

        },
        groups:[],
        errorMessage:''
    });

    let updateInput = (event) =>{
        setState({
            ...state,
            contact:{
                ...state.contact,
            [event.target.name]: event.target.value
            }
        })
    }

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setState({...state,loading:true})
                let response = await ContactService.getGroups();
                setState({
                    ...state,
                    loading:false,
                    groups:response.data
                })
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };
    
        fetchGroups();
    }, []);
    
    let submitForm = async(event) =>{

        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contact);;
            if(response){
                Navigate('/contacts/list',{replace:true});
            }
        } catch (error) {
            setState({...state, errorMessage:error.message});
            Navigate('/contacts/add', {replace:false})
        }
    }
    let{loading,contact,groups,errorMessage} = state
  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="h4 text-success fw-bold">Create Contact</p>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, labore! Molestias similique reprehenderit temporibus atque mollitia magni sint quae ut excepturi sed quisquam aspernatur quasi, natus iste laborum delectus eos.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="mb-2">
                            <input  name="name"  required={true}value={contact.name} onChange={updateInput} type="text" className='form-control' placeholder='Name'/>
                        </div>
                        <div className="mb-2">
                            <input type="text"  required={true}
                            name='photo' value={contact.photo}
                            onChange={updateInput} className='form-control' placeholder='Photo Url'/>
                        </div>
                        <div className="mb-2">
                            <input type="number" 
                             required={true}
                             name='mobile' value={contact.mobile} 
                             onChange={updateInput}className='form-control' placeholder='Mobile'/>
                        </div>
                        <div className="mb-2">
                            <input type="text"  required={true}
                            name='email' value={contact.email}  
                            onChange={updateInput}className='form-control' placeholder='Email'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" required={true}
                            name='company' value={contact.company}  
                            onChange={updateInput}className='form-control' placeholder='Company'/>
                        </div>
                        <div className="mb-2">
                            <input type="text" required={true}
                            name='title' value={contact.title}  
                            onChange={updateInput}className='form-control' placeholder='Title'/>
                        </div>
                        <div className="mb-2">
                            <select  
                            required={true} name={'groupId'} 
                            value={contact.groupId} 
                            onChange={updateInput}className='form-control'>
                                <option value="">Select a Group</option>
                                {
                                    groups.length > 0 &&
                                      groups.map(group =>{
                                        return (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        )
                                      })
                                }
                            </select>
                        </div>
                        <div className="mb-2">
                            <input type="submit" className='btn btn-success' value={'Create'}/>
                            <Link to="/contacts/list" className="btn btn-dark ms-2">Cancel </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default AddContact
