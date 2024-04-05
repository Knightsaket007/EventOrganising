import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import AdminNavi from "./components/AdminNavi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    let [co_data, setCo_data] = useState([]);
    let { emailid } = useParams();
    let navigate = useNavigate();
    function eventpage() {
        navigate(`/addevents/${emailid}`)
    }

    function getingCo() {
        axios.get(`http://localhost:3000/coadmin_data?email=${emailid}`).then((res) => {
            setCo_data(res.data);

        })
    }

    useEffect(() => {
        getingCo();
    }, [])

    function logout() {
        axios.get('http://localhost:3000/admin-logout')
            .then((res) => {
                console.log(res.data);
                if (res.data === 'loggedOut') {
                    navigate('/')
                }
            })
    }
    return (
        <section class="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
            <AdminNavi />
            <div style={{ float: "right" }} className=" col-sm-4">
                <button onClick={logout} type="button" style={{ float: "right" }} className="btn btn-outline-primary col-md-4">Logout</button></div><br />
            <br />
            {/* <button type="button" style={{float:"right"}}>Add</button> */}<br />
            <button type="button" style={{ float: "right", marginRight: "10px" }} className="btn btn-success col-sm-2" onClick={eventpage}>Add Event</button>
            <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <div className="account-area" style={{ paddingTop: "20px", paddingBottom: "20px", paddingRight: "40px" }}>
                    {/* <div className="section-header-3"> */}
                    <span className="cate text-white"> &ensp;&ensp;Co-Admin</span>
                    <h2 className="title"> &ensp;Dashboard </h2>
                    {/* </div> */}
                </div>
            </div >
            <div className="container jumbotron bg-primary" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                Event Name
                            </td>
                            <td>
                                Organizer
                            </td><td>
                                Venue
                            </td><td>
                                Price
                            </td>
                            <td>Tickets</td>
                            <td>D & T</td>
                            <td>Picture</td>
                        </tr>

                    </thead>
                </table>
            </div>
            {
                co_data.map((value) => {
                    return (
                        <div className="container jumbotron " style={{ paddingTop: "25px", paddingBottom: "25px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "rgba(68, 90, 153, 0.051)", boxShadow: "0px 0px 29.4px 0.6px rgb(0 0 0 / 50%)" }}>
                            <table>

                                <tbody>
                                    <tr>
                                        <td > {value.eventname}</td>
                                        <td >  {value.orgName}</td>
                                        <td > {value.venue}</td>
                                        <td > {value.price}</td>
                                        <td > {value.tickets}</td>
                                        <td > {value.datetime}</td>
                                        <td > <div style={{ boxShadow: "3px 3px 13.4px 0.6px" }}><img src={"http://localhost:3000/" + value.userpic} alt="" width="80" height="100" /></div></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    )
                })

            }
        </section>
    )
}
export default Dashboard;