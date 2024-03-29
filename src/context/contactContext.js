import {createContext} from 'react';

export const ContactContext = createContext({
    loading : false ,
    setLoading :  () => {} ,
    contact : {},
    setContacts : ()=>{} ,
    contacts : [] ,
    error : [] ,
    filteredContacts:[],
    setFilteredContacts : ()=>{} ,
    groups : [] ,
    onContactChange: ()=> {} ,
    deleteContact: ()=> {} ,
    updateContact :() =>{} ,
    createContact : ()=>{} ,
    contactSearch: ()=>{}
})