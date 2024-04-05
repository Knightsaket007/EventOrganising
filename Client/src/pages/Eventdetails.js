import User_navi from "./components/User_navi"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { MdCommentBank } from 'react-icons/md';
import { MdPlace } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi';
import { MdAlternateEmail } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import useRazorpay from "react-razorpay";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

const Eventdetails = () => {
    let navigate = useNavigate();
    // let newDate = new Date()
    // let date = newDate.getDate();
    let price=0
    let { email, eventcode } = useParams();
    const RazorPay = useRazorpay();

    let [allevents, setallevents] = useState([]);
    function showevents() {
        axios.get(`http://localhost:3000/eventdetails?eventcode=${eventcode}`).then((res) => {

            setallevents(res.data);
            console.log(res.data);
        })
    }

    const submitHandler = (response) => {
        console.log(eventcode , price)
        let paymentID = response.razorpay_payment_id;
        if (paymentID !== "") {
            console.log("Success Message");
            navigate(`/paysuccess/${email}/${eventcode}`)
            axios.post("http://localhost:3000/paydone",{
            // email,
            eventcode,
            // date, 
            price
            })

        }
    }


    const options = {
        key: "rzp_test_A3RM3Asww6uWvF", // Enter the Key ID generated from the Dashboard
        // amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: submitHandler,
        prefill: {
            name: "",
            email: "",
            contact: "",
        },
        theme: {
            color: "#3399cc",
        },
    };


    const razorPayHandler = (price) => {
        if (price === 0) {
            navigate(`/paysuccess/${email}/${eventcode}`);
        } else {
            options.amount = price * 100;
            let rzp = new RazorPay(options);
            rzp.open();
        }
    }


    useEffect(() => {
        showevents();
    }, [])

    return (
        <>
            <User_navi />

            <div className="container jumbotron" style={{ backgroundColor: "rgba(0,0,300,0.4)" }}>

                {
                    allevents.map((value) => {
                        price=value.price
                        return (<>
                            <h3 style={{ textAlign: "center" }}>{value.eventname}</h3>
                            <br />
                            <div className="container" style={{ textAlign: "center" }}><img src={"http://localhost:3000/" + value.userpic} alt="" style={{ height: "250px", width: "400px", borderRadius: "20%", boxShadow: "0px 0px 29.4px 0.6px" }} /></div>

                            <p><h5><MdCommentBank /></h5> <span>{value.description}</span></p>
                            <p><h5><MdPlace /></h5> <span>{value.venue}</span></p>
                            <p><h5><MdDateRange /></h5> <span>{value.datetime}</span></p>
                            <p><h5><HiOutlineTicket /></h5> {value.tickets} Tickets</p>
                            <p><h5><MdAlternateEmail /></h5> {value.email}</p>
                            <p><h5><MdCategory /></h5> {value.category}</p>
                            <p><h5><FaRupeeSign /></h5> {value.price}</p>
                            <br />

                            <div style={{ textAlign: "center" }}>
                                <button type="button" onClick={() => { razorPayHandler(value.price) }} className="btn btn-primary col-sm-3" >Buy Tickets</button></div>
                        </>
                        )
                    })}

            </div>
        </>
    )
}
export default Eventdetails