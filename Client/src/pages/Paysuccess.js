import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import User_navi from "./components/User_navi";
import { useParams } from 'react-router-dom';

const Paysuccess = () => {
    let { email, eventcode } = useParams();
    let [orderdetail, setorderdetail] = useState([]);
    function details(){
    axios.get(`http://localhost:3000/orderdetails?email=${email}&eventcode=${eventcode}`).then((res) => {
        setorderdetail(res.data);
        console.log(email,eventcode)
    })
    }
   
    
    useEffect(() => {
        details();
    }, [])

    function dashshow(){}

    return (
        <section class="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
            <User_navi />
            <br /><br />
            <div className="container jumbotron bg-success">
                <div style={{ textAlign: "center" }}>
                    <h3>thank you </h3>
                </div>

                <div style={{ textAlign: "center" }}>
                    <h4>Payment is successful</h4><span></span>
                </div><br />
                <div style={{ backgroundColor: "blue", width: "100%" }}>

                    <div className="text-white bg-dark " style={{ borderRadius: "20px", float: "left" }}>

                        <div style={{ marginLeft: "20px" }}>
                            <div style={{ textAlign: "center" }}><br />
                                <h3>Evento </h3>
                                <h5>feel awesome do awesome</h5>
                            </div>
                            {/* {date}/{month}/{year} */}

                        </div>
                        {
                            orderdetail.map((value) => {
                                return (<>

                                    <table className="table table-borderless" >
                                        {

                                        }
                                        <tr>
                                            <th>Name:</th>
                                            <td >{value.name}</td>
                                        </tr>

                                        <tr>
                                            <th>Payment:</th>
                                            <td>{value.amount}</td>
                                        </tr>
                                        <tr>
                                            <th>Event Name:</th>
                                            <td>{value.eventname}</td>
                                        </tr>
                                        <tr>
                                            <th>event code:</th>
                                            <td>{value.eventcode}</td>

                                        </tr>
                                        <tr>
                                            <th>Date:</th>
                                            <td>{value.bookingdate}</td>

                                        </tr>
                                        {/* <tr>
                                            <th>Time:</th><br/>
                                            <td>{value.time}</td>

                                        </tr> */}
                                    </table>
                             
                        <div style={{ textAlign: "center" }}>
                            {/* <button type="button" onClick={dashshow} className="btn btn-success col-md-2"><h4><AiOutlineArrowRight /></h4></button><br /><br /><br /> */}
                        </div>
                        </>
                                )
                          })}
                    </div>

                </div>
            </div>
            <br />                 <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


        </section>
    )
}
export default Paysuccess