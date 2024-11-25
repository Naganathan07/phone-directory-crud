import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import ContactList from './Components/Contacts/ContactList'
import AddContact from './Components/Contacts/AddContact'
import ViewContact from './Components/Contacts/ViewContact'
import EditContact from './Components/Contacts/EditContact'
import Spinner from './Components/Spinner/Spinner'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts/list'}/>}/>
        <Route path='/contacts/list'  element={<ContactList/>}/>
        <Route path='/contacts/add'  element={<AddContact/>}/>
        <Route path='/contacts/view/:contactId'  element={<ViewContact/>}/>
        <Route path='/contacts/edit/:contactId'  element={<EditContact/>}/>
      </Routes>
    </>
  )
}

export default App
