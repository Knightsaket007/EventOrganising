import { useEffect, useState } from "react";
import AdminNavi from "./components/AdminNavi";
import axios from "axios";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from 'react-icons/ri';
import "./components/App.css";
const Category = () => {
    let [catname, Setcatname] = useState("");
    let [catdes, Setcatdes] = useState("");
    function goData() {
        console.log(`${catname},${catdes}`)
        axios.post("http://localhost:3000/add-des", {
            catname,
            catdes
        }).then(res => {

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            })
            Setcatname("");
            Setcatdes("")
        })
    }
    
    let [catuser, Setcatuser] = useState([]);
    function showCat() {
        axios.get("http://localhost:3000/showCat").then((res) => {
            console.log(res.data)
            Setcatuser(res.data)
        }
        )

    }



    useEffect(() => {
        showCat();
    }, [])

    function deleteCat(Cat_id) {
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
                axios.get(`http://localhost:3000/delete-cat?Cat_id=${Cat_id}`)
                    .then(res => {
                        // console.log(res.data);

                        if (res.data === "category deleted") {
                            showCat();

                            Swal.fire(
                                'Deleted!',
                                'Your Category has been deleted.',
                                'success'
                            )
                        }
                    });
            }
        })
    }
    return (
        <>
            <section className="account-section bg_img" data-background="assets/images/account/account-bg.jpg">
                <AdminNavi/>




                <form >
                    <div style={{ width: '350px', borderRadius: '1rem' }} className="card px-3 mt-5 bg-dark text-white py-5 d-flex justify-content-center container">
                        <h3>Category</h3>
                        <label className="form-label">Category Name</label>
                        <input className="form-control" type="text" value={catname} onChange={(e) => Setcatname(e.target.value)} />
                        {/* <label className="form-label">Description</label> */}
                        {/* <input className="form-control" type="text" /> */}
                        <label className="form-label" type="text">Category Description</label>
                        <textarea className="form-control" type="textarea" value={catdes} onChange={(e) => Setcatdes(e.target.value)} />
                        <button type="button" className="btn btn-outline-light mt-5" onClick={goData}>Enter</button>
                    </div>
                </form>
                <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Category id</th>
                            <th>Category Name</th>
                            <th>Category Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{
                    catuser.map((value) => {
                        return(
                            <tr>
                                <td>{value.Cat_id}</td>
                                <td>{value.Cat_name}</td>
                                <td>{value.Cat_description}</td>
                                <td><h4><RiDeleteBin5Line onClick={() => deleteCat(value.Cat_id)} /></h4>
                                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </section>
        </>
    )
}
export default Category;