import React from "react";
import "./components/App.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import AdminNavi from "./components/AdminNavi";
// import validator from 'validator'
const Signup_co = () => {
    const navigate = useNavigate();

    let [fullname, setFullname] = useState("");
    let [mobile, setMobile] = useState("");
    let [email, setEmail] = useState("");
    let [passward, setPassword] = useState("");
    let [conpassword, setConpassword] = useState("");
    let [gender, setGender] = useState("Male");
    let [usertype, setUsertype] = useState("");


    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    // function CheckPassword(password) {
    //     var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    //     if (password.value.match(decimal)) {
    //         console.log('Correct.')
    //         return true;
    //     } else {
    //         console.log('Wrong...!')
    //         return false;
    //     }}
    function handleForm(e) {
        e.preventDefault();

        console.log(`${fullname} ${mobile} ${email} ${passward} ${conpassword} ${gender} ${usertype} `);


        if (passward !== conpassword) {
            Swal.fire("password not matched")
        }
        else if (passward.length < 8) {
            Swal.fire("password is short atleast take 8 characters")
        }
        else if (!passward.match(decimal)) {
            Swal.fire(
                'RegEx error',
                'Must use Uppercase(A-Z),Lowercase(a-z),Numbers(0-9) and special characters for strong password(like @,#,$)',
                'question'
            )

        }


        else {
            axios.post("http://localhost:3000/add-action", {
                fullname,
                mobile,
                email,
                passward,
                conpassword,
                gender,
                usertype
            }
            ).then(res => {
                // console.log(res.data + " ------") 
                if (res.data === "duplicate") {

                    Swal.fire({
                        title: 'Opps!',
                        text: 'Email Already Exist.',
                        imageUrl: 'giphy.gif',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                } else {
                    setMobile("");
                    setEmail("");
                    setPassword("");
                    setGender("");
                    setUsertype("");
                    setConpassword("");
                    setFullname("");
                    // alert(res + ' +++++');   
                    navigate(`/login`);
                }
            })

            // .catch((err) => { });

            //  if (res === "duplicate") {
            //   alert("Username already exist!!");
            // }
            // else {
            // setFullname("");
            // setMobile("");
            // setEmail("");
            // setPassword("");
            // setGender("");
            // setUsertype("");
            // setConpassword("");
            // setFullname("");
            // alert(res);   
            // navigate("/about");
        }
        // })
    }
    return (
        <section class="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
            {/* <AdminNavi/> */}
            <div class="container">
                <div class="padding-top padding-bottom">
                    <div class="account-area">
                        <div class="section-header-3">
                            <span class="cate">welcome organiser</span>
                            <h2 class="title">to Evento </h2>
                        </div>
                        <form class="account-form" onSubmit={(event) => handleForm(event)}>
                            <div class="form-group">
                                <label for="fname">Full Name<span>*</span></label>
                                <input type="text" placeholder="Enter Your Name" id="fname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label for="Mobile">Mobile<span></span></label>
                                <input type="tel" placeholder="Enter Your Mobile No" value={mobile} id="Mobile" onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email<span>*</span></label>
                                <input type="tel" placeholder="Enter Your Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label for="pass">Password<span>*</span></label>
                                <input type="text" placeholder="Password" id="passward" required value={passward} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="conpass">Confirm Password<span>*</span></label>
                                <input type="text" placeholder="Confirm Password" id="conpass" required value={conpassword} onChange={(e) => setConpassword(e.target.value)} />
                            </div>
                            {/* <div class="form-group">
                            <label for="combo">Confirm Password<span>*</span></label>
                            <input type="password" placeholder="Password" id="combo" required value={conpassword} onChange={(e) => setConpassword(e.target.value)}/>
                        </div> */}
                            <div class="form-group checkgroup">
                                <input type="checkbox" id="bal" required checked />
                                <label for="bal">I agree to the <a href="#0">Terms, Privacy Policy</a></label>
                            </div>
                            <div class="form-group text-center">
                                <input type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <div class="option">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                      
                        
                    </div>
                </div>
            </div>
        </section>)
}
export default Signup_co;