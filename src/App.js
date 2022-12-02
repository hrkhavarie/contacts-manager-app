import  {useState , useEffect} from "react";
import {Route , Routes , useNavigate , Navigate} from 'react-router-dom';
import './App.css';
import {confirmAlert} from 'react-confirm-alert';
import {ContactContext} from "./context/contactContext";
import _ from 'lodash';


import {AddContact , EditContact , ViewContact  , Navbar , Contacts} from "./components/index";
import {createContact, getAllContacts, getAllGroups , deleteContact} from './services/contactService';
import {CurrentLine, Purple, Yellow , Foreground , Comment} from "./helpers/color";
import {ContactSchema} from './Validations/contact.validation';


function App() {
    //const [forceRender , setForceRender ] = useState(false)
    const [contacts , setContacts] = useState([]);
    const [filteredContacts , setFilteredContacts] = useState([]);
    const [loading , setLoading] = useState(false );
    const [groups , setGroups] = useState([]);
    const [contact , setContact] = useState({});
    const [errors , setErrors] = useState([]);



    const navigate = useNavigate();

    useEffect( ()=>{
        const fetchDate = async ()=>{
            try{
                setLoading(true);
                const {data: contactsData} = await getAllContacts();
                const {data : groupsData} = await getAllGroups();


                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);

            }catch (error){
                console.log(error.message)
                setLoading(false)
            }
        }
        fetchDate();

    } , []);


    const createContactForm = async (event) =>{
        event.preventDefault();
        try{
            setLoading((pervLoading) => !pervLoading)
            const {status , data} = await createContact(contact)

            /*
              Note
              1-Render -> forsceRecnder , setForcerender
              2- setContact(data)
             */

            if (status === 201) {
                const allContacts = [...contacts , data];
                setContacts(allContacts);
                setFilteredContacts(allContacts);

                setContact({});
                setLoading((pervLoading) => !pervLoading)
                navigate('/contacts')
            }
        }catch (eorr){
            console.log(eorr.message())
        }
    }

    const onContactChange = (event) =>{
        setContact(
            {...contact,
             [event.target.name] : event.target.value
            });
    }

    const confirmDelete = (contactId , ContactFullname) =>{
        confirmAlert({
            customUI: ({onClose}) =>{
                return <div dir="rtl" style={{
                    backgroundColor: CurrentLine,
                    border:`ipx solid ${Purple}` ,
                    borderRadius: '1em',
                }} className="p-4">
                    <h1 style={{color:Yellow}}>پاک کردن مخاطب</h1>
                    <p style={{color:Foreground}}>مطئنی که میخواهی مخاطب {ContactFullname} را پاک کنی؟</p>
                    <button onClick={()=>{
                    removeContact(contactId)
                    onClose();
                    }
                    } className="btn btn-mx-2" style={{backgroundColor:Purple}}>
                        مطمئن هستم
                    </button>
                    <button onClick={onClose} className="btn" style={{backgroundColor:Comment}}>
                        انصراف
                    </button>

                </div>
            }
        })
    }

    const removeContact = async (contactId) =>{
        /*
                 Note
                 1- forcerender -> setForceRender
                 2- Server request
                 3- delete local state
                 4- delete state before server request
                 */
        // contacts copy
        const allContacts = [...contacts];
        try{

            const updatedContacts = contacts.filter(c=> c.id !== contactId);
            setContacts(updatedContacts);
            setFilteredContacts(updatedContacts);
            // sending delete requst to server
            const {status} = await deleteContact(contactId);
            if (status !==200){

                setContacts( allContacts);
                setFilteredContacts(allContacts);

            }


        }catch (error){
            console.log(error.message());
            setLoading(false);

            setContacts( allContacts);
            setFilteredContacts(allContacts);

        }
    }

    //let filterTimeout;
    const contactSearch = _.debounce((query) =>{
        console.log(query);
       // clearTimeout(filterTimeout)
       if (!query) return setFilteredContacts([...contacts]);

       //filterTimeout = setTimeout(() => {
           setFilteredContacts(
               contacts.filter((contact) => {
                   return contact.fullname.toLowerCase().includes(query.toLowerCase());
               })
           );
      // } ,1000);
    } , 1000);

  return (
      <ContactContext.Provider
          value={{
               loading ,
               setLoading,
               contact ,
               setContacts,
              contacts ,
              setFilteredContacts ,
              filteredContacts,
              groups ,
              onContactChange,
              deleteContact: confirmDelete,
              createContact:createContactForm ,
              contactSearch ,
          }}>
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/'
                       element={<Navigate to='/Contacts'/>}>

                </Route>
                <Route
                    path='/Contacts'
                    element={<Contacts/>}>
                </Route>

                <Route
                    path='/Contacts/add'
                    element={<AddContact></AddContact>}>
                </Route>
                <Route
                    path='/Contacts/:contactId'
                    element={<ViewContact></ViewContact>}></Route>
                <Route
                    path='/Contacts/edit/:contactId'
                    element={<EditContact></EditContact>}>
                </Route>


            </Routes>

        </div>
      </ContactContext.Provider>
  );
}

export default App;
