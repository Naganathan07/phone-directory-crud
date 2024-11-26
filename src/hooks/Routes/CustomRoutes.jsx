import { useRoutes } from "react-router-dom";
import ContactList from "../../Components/Contacts/ContactList";
import AddContact from "../../Components/Contacts/AddContact";
import ViewContact from "../../Components/Contacts/ViewContact";
import EditContact from "../../Components/Contacts/EditContact";

function CustomRoutes() {
    const element = useRoutes([
        {
            path: '/',
            element: <ContactList />
        },
        {
            path: '/contacts/list',
            element: <ContactList />
        },
        {
            path: '/contacts/add',
            element: <AddContact />
        },
        {
            path: '/contacts/view/:contactId',
            element: <ViewContact />
        },
        {
            path: '/contacts/edit/:contactId',
            element: <EditContact />
        }
    ]);


    return element;
}

export default CustomRoutes;
