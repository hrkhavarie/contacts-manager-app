import axios from "axios";


const SERVER_URL = "http://localhost:9000"

// @desc get All Contacts
// @route Get http://localhost:9000/contacts
export const  getAllContacts = () =>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}
// @desc get Contact with Contact ID
// @route Get http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url);
}

// @desc get  All groups
// @route Get http://localhost:9000/groups
export const getAllGroups = () =>{
    const url = `${SERVER_URL}/groups`
    return axios.get(url)
}

// @desc get  All groups
// @route Get http://localhost:9000/groups
export  const getGroup = (groupId) =>{
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url)
}

// @desc Create  contact
// @route Post http://localhost:9000/contacts
export const createContact = (contact) =>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url , contact);

}

// @desc update contact
// @route Update  http://localhost:9000/contact/:contactId
export const updateContact= (contact,contactId) =>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact)
}


// @desc delete contact
// @route delete http://localhost:9000/contact/:contactId
export const deleteContact = (contactId)=>{
    const url =`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url)
}



