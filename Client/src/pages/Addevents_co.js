import Helmet from 'react-helmet';
import "react-bootstrap";
import "./components/App.css";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom"
import AdminNavi from "./components/AdminNavi";

// import { FcUpload } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Addevents_co = () => {
    // document.body.style = 'background;'; 
    let navigate = useNavigate();

    let [cat_co, setCat_co] = useState([]);
    let [category, setcategory] = useState("");
    let [eventname, seteventname] = useState("");
    let [orgName, setorgname] = useState("");
    // let [email, setemail] = useState("");
    let [venue, setvenue] = useState("");
    let [mobileno, setmobileno] = useState("");
    let [datetime, setdatetime] = useState("");
    let [price, setprice] = useState("");
    let [tickets, settickets] = useState("");
    let [description, setdescription] = useState("");
    let [photo, setPhoto] = useState(null);
    let [eventphoto, seteventphoto] = useState(null);

    let { emailid } = useParams();

    function gettingCat() {
        axios.get('http://localhost:3000/getcat').then((res) => {
            setCat_co(res.data)
            console(res.data)
        })
    }
    function goevent() {

        console.log(photo + ' ------')
        console.log(eventphoto + ' ------')

        if (photo === null) {
            alert("select your photo")
        }
        else if (eventphoto === null) {
            alert("select your event photo")

        } else {




            console.log(`${category} ${eventname}${orgName}${emailid}${venue}${mobileno}${datetime}${price}${tickets}${description}${photo}`);

            // console.log(`${catname},${catdes}`)
            let formdata = new FormData()


            formdata.append("category", category);
            formdata.append("eventname", eventname);
            formdata.append("orgName", orgName);
            formdata.append("emailid", emailid);
            formdata.append("venue", venue);
            formdata.append("mobileno", mobileno);
            formdata.append("datetime", datetime);
            formdata.append("price", price);
            formdata.append("tickets", tickets);
            formdata.append("description", description);
            formdata.append("photo", photo);
            formdata.append("eventphoto", eventphoto);

            axios.post("http://localhost:3000/add-event", formdata)
                .then(res => {
                    if (res.data === "required") {
                        // alert("all fields required");
                        Swal.fire({
                            icon: 'info',
                            title: 'Oops...',
                            text: 'All fields required!',

                        })
                    }
                    else if (res.data === "done") {
                        navigate(`/eventsuccess/${emailid}`)
                    }
                })
        }

    }
    let catName = cat_co.map((value, index) => {
        return (
            <option style={{ color: "black" }} key={index} value={value.Cat_name}>{value.Cat_name}</option>
        )
    })

    useEffect(() => {
        gettingCat();

    }, [])



    return (
        <>
            <Helmet>
                <style>{'body {  background-image: url("/account-bg.jpg");   background-repeat: no-repeat;background-attachment: fixed; background-position:center;}'}</style>
            </Helmet>

            <AdminNavi />

            <div className="container jumbotron col-md-5" id="divheader"><h2>Add Event</h2></div>

            <form>
                <div style={{ width: '530px', borderRadius: '1rem' }} className="card px-3 mt-5 bg-dark text-white py-5 d-flex justify-content-center container col-lg-7">
                    <div style={{ marginLeft: "70px" }}>
                        <label className="form-label text-center" >Event Title<span style={{ color: "red" }}>*</span></label>
                        <input className="form-control col-lg-9 text-center " value={eventname} type="text" onChange={(e) => seteventname(e.target.value)} />

                        <label className="form-label" > Organizer fullname<span style={{ color: "red" }}>*</span></label>
                        <input className="form-control col-lg-9 text-center" value={orgName} type="text" onChange={(e) => setorgname(e.target.value)} />

                        {/* <label className="form-label" > Email<span style={{ color: "red" }}>*</span></label>
                        <input className="form-control col-lg-9 text-center " value={email} type="text" onChange={(e) => setemail(e.target.value)} /> */}

                        <label className="form-label" > Mobile Number<span style={{ color: "red" }}>*</span></label>
                        <input className="form-control col-lg-9 " value={mobileno} type="text" onChange={(e) => setmobileno(e.target.value)} />

                        <label className="form-label" > Venue<span style={{ color: "red" }}>*</span></label>
                        <textarea className="form-control col-lg-9 " value={venue} type="text" onChange={(e) => setvenue(e.target.value)} />

                        <label className="form-label" >Date And Time<span style={{ color: "red" }}>*</span></label>
                        <input type="datetime-local" className="form-control col-lg-9 " onChange={(e) => setdatetime(e.target.value)} />

                        <label className="form-label" >Category<span style={{ color: "red" }}>*</span></label>
                        <select style={{ color: "black" }} className="form-control col-lg-9 " onChange={(e) => setcategory(e.target.value)}>
                            <option >select</option>
                            {catName}
                        </select>

                        <label className="form-label">Price in ₹<span style={{ color: "red" }}>*</span><span style={{ fontFamily: "cursive", color: "yellowgreen" }}> (if event is free then set 0)</span></label>

                        <input type="number" min="0" max="10000" step="10" className="form-control col-lg-9 " value={price} onChange={(e) => setprice(e.target.value)} />

                        <label className="form-label" >No of tickets<span style={{ color: "red" }}>*</span></label>
                        <input className="form-control col-lg-9" min="1" max="2000" step="1" value={tickets} type="number" onChange={(e) => settickets(e.target.value)} placeholder="" />

                        <label className="form-label" >Description<span style={{ color: "red" }}>*</span></label>
                        <textarea className="form-control col-lg-9 " style={{ height: "100px" }} value={description} type="text" onChange={(e) => setdescription(e.target.value)} />

                    </div>


                    <br />
                    <div className="text-center ">
                        <input type="file" name="photo" id="photo" onChange={(e) => setPhoto(e.target.files[0])} required />
                        <label for="photo">Upload Your Photo</label>
                    </div><br />
                    <div className="text-center ">
                        <input type="file" name="file" id="eventphoto" class="eventphoto" onChange={(e) => seteventphoto(e.target.files[0])} required />
                        <label for="fileupload">Event photo</label>
                    </div>


                    <div className="text-center">
                        <button type="button" className="btn btn-outline-primary mt-5 col-md-6 text-center" onClick={goevent}>Place Event</button></div>

                </div>̥


            </form>
        </>
    )
}
export default Addevents_co;