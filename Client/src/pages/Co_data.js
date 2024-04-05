import axios from "axios";
import React, { useEffect, useState } from "react";
import "./components/App.css";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
// import NavBar from "./components/NavBar";

let Co_data = () => {
    let navigate = useNavigate();
    let [users, setUsers] = useState([]);
    function Fetchdata() {
        axios.get('http://localhost:3000/show-user').then((res) => {
            setUsers(res.data)

        })
    }
    useEffect(() => {
        Fetchdata();
    }, [])

    function delete12(email) {
        Swal.fire({
            title: 'Are you sure to Delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:3000/delete-user?email=${email}`)
                    .then(res => {
                        // console.log(res.data);

                        if (res.data === "category deleted") {
                            Fetchdata();

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    });
            }
        })
    }

    function edit(email) {
        navigate(`/edit-user/${email}`)
    }

    return (
        <>
            

            <section className="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
                <div className="container">

                    <div className="padding-top">
                        <div className="account-area">
                            {/* <div className="section-header-3"> */}
                            <span className="cate text-white">welcome</span>
                            <h2 className="title">to Admin Page </h2>
                            {/* </div> */}
                        </div>
                    </div >


                    <div className="padding-top padding-bottom">
                        <div className="table-responsive">
                            {/* <div class="account-area-2 table-responsive"> */}
                            <table className="table table-hover">
                                <thead style={{ color: "black" }}>
                                    <tr >
                                        <th scope="col">S.no</th>
                                        <th scope="col">fullname</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>

                                        <th colSpan={"2"}>Update</th>


                                    </tr>
                                </thead>

                                <tbody>{
                                    users.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.fullname}</td>
                                                <td>{value.mobile}</td>
                                                <td>{value.email}</td>
                                                <td><h4><RiDeleteBin5Line onClick={() => delete12(value.email)} /></h4>
                                                </td>
                                                <td>
                                                    <h4><MdModeEditOutline onClick={() => edit(value.email)} />
                                                    </h4></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div >
                </div>
                {/* table */}

                {/* <div className="container jumbotron bg-primary col-md-8"></div> */}
            </section>
        </>
    )
}
export default Co_data;