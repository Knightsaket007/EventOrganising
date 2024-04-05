import React from "react";
import "./components/App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

// import validator from 'validator'
const Sign_user = () => {
    const navigate = useNavigate();

    let [name, setname] = useState("");
    let [mobile, setMobile] = useState("");
    let [email, setEmail] = useState("");
    let [passward, setPassword] = useState("");
    let [conpassword, setConpassword] = useState("");
 


    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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

        console.log(`${name} ${mobile} ${email} ${passward} ${conpassword} `);


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
            axios.post("http://localhost:3000/user_signup", {
                name,
                mobile,
                email,
                passward,
               
              
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
                 setname("")   
                 setMobile("")   
                 setEmail("")   
                 setPassword("")
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })   
                    navigate(`/user_login/${email}`);
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
        
            <div class="container">
                <div class="padding-top padding-bottom">
                    <div class="account-area">
                        <div class="section-header-3">
                            <span class="cate">welcome User</span>
                            <h2 class="title">to Evento </h2>
                        </div>
                        <form class="account-form" onSubmit={(event) => handleForm(event)}>
                            <div class="form-group">
                                <label for="fname">Full Name<span>*</span></label>
                                <input type="text" placeholder="Enter Your Name" id="fname"  onChange={(e) => setname(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label for="Mobile">Mobile<span></span></label>
                                <input type="text" placeholder="Enter Your Mobile No" value={mobile} id="Mobile" onChange={(e) => setMobile(e.target.value)} />
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
                           
                            <div class="form-group checkgroup">
                                <input type="checkbox" id="bal" required checked />
                                <label for="bal">I agree to the <a href="#0">Terms, Privacy Policy</a></label>
                            </div>
                            <div class="form-group text-center">
                                <input type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <div class="option">
                            Already have an account? <Link to="/user_login">Login</Link>
                        </div>
                        <div class="or"><span>Or</span></div>
                        <ul class="social-icons">
                            <li>
                                <a href="#0">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#0" class="active">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#0">
                                    <i class="fab fa-google"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>)
}
export default Sign_user;