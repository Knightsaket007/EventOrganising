import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Admin = () => {
    let navigate = useNavigate();
    const [id, setid] = useState("");
    const [pass, setpass] = useState("");
    function log() {
        axios.post('http://localhost:3000/Admin-log', {
            id,
            pass            
        }).then((res) => {
            console.log(res.data)
            if (res.data === "logged") {
                navigate('/coadmins');
                
            }
            // else if(res.data==="notlog"){
            //     alert("wrong")
            //     navigate("/")
            // }
        })


    }
    return (
        <>
            {/* <div class="preloader">
                <div class="preloader-inner">
                    <div class="preloader-icon">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div> */}
            <section class="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
                <div class="container">
                    <div class="padding-top padding-bottom">
                        <div class="account-area">
                            <div class="section-header-3">

                                <h2 class="title">Admin Panel</h2>
                            </div>
                            <form class="account-form">
                                <div class="form-group">
                                    <label for="email2">Email<span>*</span></label>
                                    <input type="text" placeholder="Enter Your Email" id="email2" onChange={(e) => setid(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label for="pass3">Password<span>*</span></label>
                                    <input type="password" placeholder="Password" id="pass3" onChange={(e) => setpass(e.target.value)} required />
                                </div>
                                
                                <div class="form-group text-center">
                                    <button type="button" className="btn btn-primary col-md-4" onClick={log}>login</button>
                                    {/* <input type="submit" onclick={log} value="log in"/> */}
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Admin;