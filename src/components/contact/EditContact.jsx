import { useEffect, useState , useContext } from "react";
import {ContactContext} from "../../context/contactContext";


import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getContact,
    updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { Comment, Yellow, Purple } from "../../helpers/color";


const EditContact = () => {
    const { contactId } = useParams();
    const {contacts , setContacts, loading , setLoading , groups ,setFilteredContacts} = useContext(ContactContext);
    const navigate = useNavigate();

    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,

        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
            try {
                setLoading(true)

                // copy state
                // update state
                // send request
                // status == 200 do nothing
                // state == error  -> setstate (copyState)

                const { data, status } = await updateContact(contact, contactId);

                /*
                NOTE
                1- forceRender -> setforcerender (true)
                2- send request server
                3- update local state
                4- update local state before sending request to server
                 */

                if (status ===200) {
                    setLoading(false);

                    const allContacts = [...contacts];
                    const contactIndex = allContacts.findIndex(c=> c.id === parseInt(contactId));
                    console.log(allContacts[contactIndex]);
                    allContacts[contactIndex] = {... data};
                    console.log(allContacts[contactIndex]);
                    setContacts(allContacts);
                    setFilteredContacts(allContacts);


                    navigate("/contacts");
                }
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
    };


    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: Yellow }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: Yellow }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{  borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                name="fullname"
                                                type="text"
                                                className="form-control"
                                                value={contact.fullname}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="نام و نام خانوادگی"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="photo"
                                                type="text"
                                                value={contact.photo}
                                                onChange={onContactChange}
                                                className="form-control"
                                                required={true}
                                                placeholder="آدرس تصویر"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                value={contact.mobile}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="شماره موبایل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={contact.email}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="آدرس ایمیل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                value={contact.job}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="شغل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                name="group"
                                                value={contact.group}
                                                onChange={onContactChange}
                                                required={true}
                                                className="form-control"
                                            >
                                                <option value="">انتخاب گروه</option>
                                                {groups.length > 0 &&
                                                    groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="submit"
                                                className="btn"
                                                style={{ backgroundColor: Purple }}
                                                value="ویرایش مخاطب"
                                            />
                                            <Link
                                                to={"/contacts"}
                                                className="btn mx-2"
                                                style={{ backgroundColor: Comment }}
                                            >
                                                انصراف
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${Purple}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;
