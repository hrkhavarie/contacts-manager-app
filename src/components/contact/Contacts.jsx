import React, {} from "react";
import {Link} from 'react-router-dom'
import {CurrentLine, Cyan, Pink, Red, Yellow} from "../../helpers/color";
import Contact from "./Contact";
import NotFound from "../../assets/no-found.gif";
import Spinner from "../spinner";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

const Contacts =() =>{

    const {  loading , deleteContact , filteredContacts} = useContext(ContactContext)


    return(
        <React.Fragment>
           <section className='container'>
               <div className="grid">
                   <div className="row">
                       <div className="col">
                           <p className="h3">
                               <Link to={'/Contacts/add'}  className="btn mx-2" style={{backgroundColor: Pink}}>ساخت مخاطب جدید  <i className="fa fa-plus-circle"></i></Link>
                           </p>
                       </div>
                   </div>
               </div>
           </section>

            {
                loading ? <Spinner></Spinner> :(
                    <section className="container">
                        <div className="row">

                            {filteredContacts.length > 0 ?
                                filteredContacts.map((c) =>
                                    <Contact
                                             key={c.id}
                                            deleteContact = {()=> deleteContact(c.id , c.fullName)}
                                            contact={c}>

                                    </Contact>):
                                    (<div className="text-center py-5" style={{backgroundColor: CurrentLine}}>
                                        <p className="h3" style={{color:Yellow}}>
                                            مخاطب یافت نشد...
                                        </p>
                                        <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25"/>
                                    </div>)
                            }
                        </div>
                    </section>

                )
            }


        </ React.Fragment>
    )
}
export default Contacts;