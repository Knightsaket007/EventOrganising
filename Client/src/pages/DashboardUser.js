// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import User_navi from"./components/User_navi"
// import { useNavigate } from "react-router-dom";

// const DashboardUser =()=>{
//     let navigate=useNavigate();
// let {email,eventcode}=useParams
// let [userinfo,setuserinfo]=useState([]);
// function showdash(){
// axios.get(`http://localhost:3000/orderdetails?email=${email}&eventcode=${eventcode}`).then((res)=>{
//     setuserinfo(res.data);
//     console.log(res.data)
// })
// }

// useEffect(()=>{
//     showdash();
// },[])

// function logout() {
//     axios.get('http://localhost:3000/user-logout')
//         .then((res) => {
//             console.log(res.data);
//             if (res.data === 'loggedOut') {
//                 navigate('/')
//             }
//         })
// }

// function event(){
//     navigate()
// }

// return(
// <>
// <section class="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
//             <User_navi />
//             <div style={{ float: "right" }} className=" col-sm-4">
//                 <button onClick={logout} type="button" style={{ float: "right" }} className="btn btn-outline-primary col-md-4">Logout</button></div><br />
//             <br />
//             {/* <button type="button" style={{float:"right"}}>Add</button> */}<br />
//             <button type="button" style={{ float: "right", marginRight: "10px" }} className="btn btn-success col-sm-2" onClick={events}>Events</button>
//             <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
//                 <div className="account-area" style={{ paddingTop: "20px", paddingBottom: "20px", paddingRight: "40px" }}>
//                     {/* <div className="section-header-3"> */}
//                     <span className="cate text-white"> &ensp;&ensp;Co-Admin</span>
//                     <h2 className="title"> &ensp;Dashboard </h2>
//                     {/* </div> */}
//                 </div>
//             </div >
//             <div className="container jumbotron bg-primary" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                 <table>
//                     <thead>
//                         <tr>
//                             <td>
//                                 Event Name
//                             </td>
//                             <td>
//                                 Organizer
//                             </td><td>
//                                 Venue
//                             </td><td>
//                                 Price
//                             </td>
//                             <td>Tickets</td>
//                             <td>D & T</td>
//                             <td>Picture</td>
//                         </tr>

//                     </thead>
//                 </table>
//             </div>
//             {
//                 userinfo.map((value) => {
//                     return (
//                         <div className="container jumbotron " style={{ paddingTop: "25px", paddingBottom: "25px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "rgba(68, 90, 153, 0.051)", boxShadow: "0px 0px 29.4px 0.6px rgb(0 0 0 / 50%)" }}>
//                             <table>

//                                 <tbody>
//                                     <tr>
//                                         <td > {value.eventname}</td>
                                       
//                                         <td > <div style={{ boxShadow: "3px 3px 13.4px 0.6px" }}><img src={"http://localhost:3000/" + value.userpic} alt="" width="80" height="100" /></div></td>
//                                     </tr>

//                                 </tbody>
//                             </table>
//                         </div>
//                     )
//                 })

//             }
//         </section>
// </>
// )
// }
// export default DashboardUser