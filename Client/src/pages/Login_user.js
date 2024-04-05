import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import User_navi from "./components/User_navi";
import { Link } from "react-router-dom";
const Login_user = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function log() {
        if (email === "" || password === "") {
            // alert("all fields require")
            let timerInterval
            Swal.fire({
                title: 'All fields required!',
                html: 'I will close in <b></b> milliseconds.',
                color: `rgb(240, 240, 240)`,
                background: `rgba(0,0,300,0.4)`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else {
            axios.post('http://localhost:3000/log_users', {
                email,
                password
            }).then((res) => {
                if (res.data === 'logged') {

                    // alert("logged sucessfull")
                    navigate(`/events/${email}`);
                }


                else if (res.data === 'notMatch') {
                    // alert('email or password not matched')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        color: `rgb(240, 240, 240)`,
                        text: 'email or password not matched!',
                        background: `rgba(0,0,300,0.4)`,
                    })
                }
            })
        }

    }
    return (
        <>
            <section class="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
            <User_navi/>
                <div class="container">
                    <div class="padding-top padding-bottom">
                        <div class="account-area">
                            <div class="section-header-3">
                                <span class="cate">Login</span>
                                <h2 class="title">To Account</h2>
                            </div>
                            <form class="account-form">
                                <div class="form-group">
                                    <label for="email">Email<span>*</span></label>
                                    <input id="email" type="text" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password<span>*</span></label>
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" required />
                                </div>
                                <div class="form-group checkgroup">
                                    <input type="checkbox" id="bal2" required checked />
                                    <label for="bal2">remember password</label>
                                </div>
                                <div class="form-group text-center">
                                    {/* <input type="submit"  onClick={log} value="log in"/> */}
                                    <button type="button" style={{ width: "150px" }} className="btn btn-outline-light mt-5" onClick={log} id="btnlog" class="button-85">Login</button>
                                </div>
                            </form>
                            <div class="option">
                                Don't have an account? <Link to="/signup_user">sign up now</Link>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login_user;