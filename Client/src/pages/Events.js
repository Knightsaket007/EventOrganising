import axios from "axios";
import { useEffect, useState } from "react";
import User_navi from"./components/User_navi"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const Events = () => {
    let{email}=useParams();
    let navigate=useNavigate();
    let [allevents, setallevents] = useState([]);
    function showevents() {
        axios.get('http://localhost:3000/allevents').then(res => {
console.log(res.data)
            setallevents(res.data);
        })
    }

    useEffect(() => {
        showevents();
    }, [])

function details(eventcode){
        // console.log(eventcode);
    navigate(`/eventdetails/${email}/${eventcode}`)
}

function logout() {
    axios.get('http://localhost:3000/user-logout')
        .then((res) => {
            console.log(res.data);
            if (res.data === 'loggedOut') {
                navigate('/')
            }
        })
}

    return (

        <section class="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
<User_navi/>
<div style={{ float: "right" }} className=" col-sm-4">
                <button onClick={logout} type="button" style={{ float: "right" }} className="btn btn-outline-primary col-md-4">Logout</button></div>

<div className="" style={{marginTop:"10px"}}>
                        <div className="account-area" style={{paddingTop:"5px", paddingBottom:"5px"}}>
                            {/* <div className="section-header-3"> */}
                            <span className="cate text-white">welcome</span>
                            <h2 className="title">to Events </h2>
                            {/* </div> */}
                        </div>
                    </div >
                    <br/>

            <div className="container">
                <div className="row">
{           allevents.map((value)=>{    
return(<>
                    <div className="col-lg-4 mb-4" style={{borderRadius:"50%"}} >
                        <div className="card">
                            <img src={"http://localhost:3000/"+value.userpic} alt="" style={{height:"250px"}}/>
                            <div className="card-body " style={{color:"black"}} >
                                <h4 className="card-title" style={{color:"black",textAlign:"center"}}>{value.eventname}</h4>
                                <p className="card-title"style={{color:"black"}}>{value.category} </p>
                                <h5 className="card-title" style={{color:"black"}}>{value.datetime}</h5>
                                <h5 className="card-title" style={{color:"black"}}>₹{value.price}/person</h5>
                                <button type="button " className="button-85" onClick={()=>{details(value.eventcode)}}  style={{ width: "150px" }}>Read More</button>
                            </div>
                        </div>
                    </div>
                
                    </>
)
}) 
}

                </div>
            </div>

           

        </section>

    )
}
export default Events;