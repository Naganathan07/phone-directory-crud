import axios from "axios";


export class ContactService {
    static ServerURL ='http://localhost:3000';

    
    static getGroups(){
        let dataURL = `${this.ServerURL}/groups`;
        return axios.get(dataURL)
    }

    static getGroup(contact){
        let groupId = contact.groupId;
        let dataURL = `${this.ServerURL}/groups/${groupId}`;
        return axios.get(dataURL)
    }
    static getAllContacts(){

        let dataURL = `${this.ServerURL}/contacts`;
        return axios.get(dataURL);
    }

    static getContact(contactId){

        let dataURL = `${this.ServerURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL = `${this.ServerURL}/contacts`;
        return axios.post(dataURL,contact);
    }

    static updateContact(contact,contactId){

        let dataURL = `${this.ServerURL}/contacts/${contactId}`;
        return axios.put(dataURL,contact)
    }

    static deleteContact(contactId){
        
        let dataURL = `${this.ServerURL}/contacts/${contactId}`;

        return axios.delete(dataURL,contactId)
    }
}

