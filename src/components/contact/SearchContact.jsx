import {Purple ,Comment} from '../../helpers/color';
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

const SearchContact = ()=>{
    const {  contactSearch} = useContext(ContactContext);
    return(
        <div className="input-group mx-2 w-75" dir="ltr">
                            <span className="input-group-text" id="basic-addon1" style={{backgroundColor:Purple}}>
                                <i className="fa fa-search"></i>
                            </span>
            <input
                dir="rtl"
                type="text"

                onChange={event=> contactSearch(event.target.value)}
                style={{backgroundColor:Comment , borderColor: Purple}}
                className="form-control"
                placeholder="جستجو مخاطب"
                aria-label="search"
                aria-describedby="basic-addon1"
            />


        </div>
    )
}
export default SearchContact