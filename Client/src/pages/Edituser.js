import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./components/App.css";
import { FiSettings } from 'react-icons/fi';
import Swal from 'sweetalert2'
let Edituser = () => {
    let { emailid } = useParams();

    let [fullname, setFullname] = useState("");
    let [mobile, setMobile] = useState("");
    let [email, setEmail] = useState("");
    let [passward, setPassword] = useState("");

    function Getdetails() {
        axios.get(`http://localhost:3000/edit-email?email=${emailid}`)
            .then(res => {

                let User = res.data;
                // console.log(res.data);
                setFullname(User[0].fullname)
                setMobile(User[0].mobile)
                setEmail(User[0].email)
                setPassword(User[0].password)

            })


    }
    useEffect(() => {
        Getdetails();

    },[]);

    function handleForm(e) {
        e.preventDefault();

        console.log(` ${email} ${fullname}  ${mobile}`);
        
        axios.post("http://localhost:3000/update-users",
            {
                fullname,
                mobile,
                email,
                passward
            }
        )
            .then(res => {
                // console.log(res)

                if (res.data === "required") {
                    // alert("All fields are required!!");
                    let timerInterval
                    Swal.fire({
                      title: 'All Fields Required',
                      html: 'I will close in <b></b> milliseconds.',
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

                } else {
                    setFullname("");
                    setMobile("")
                    setEmail("");
                    setPassword("")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    // alert(res.data);
                    Getdetails();
                }
            })
    }

    return (
        <>
        
            <div className="container jumbotron col-md-5" id="divheader"><h2>Update User</h2></div>
            <div className="container jumbotron bg-primary col-sm-5">
                <div className="container center col-sm-6">
                    <form onSubmit={(event) => handleForm(event)}>
                        {/* fullname */}
                        <label for="fullname">Full Name <FiSettings /></label><br />
                        <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" id="fullname" name="fullname" className={"form-control "} autoComplete={"off"} />
                        {/* mobile */}

                        <label for="mobile">Mobile <FiSettings /></label><br />
                        <input value={mobile} id="mobile" onChange={(e) => setMobile(e.target.value)} type="tel" className={"form-control"} />
                        {/* email */}

                        <label for="email">Email <FiSettings /></label><br />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className={"form-control "} autoComplete={"off"} disabled/>
                        {/* passward */}
                        <label for="passward">Password <FiSettings /></label><br />
                        <input value={passward} onChange={(e) => setPassword(e.target.value)} type="text" id="passward" name="passward" className={"form-control "} />
                        
                        <br />
                        <input type="submit" value="Update" className={"btn btn-success"} />
                    </form>
                </div>
            </div>
        </>
    )
}
export default Edituser;