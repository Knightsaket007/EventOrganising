import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
const User_navi = () => {
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/geniun').then(res => {
      if (res.data === 'not login') {
        navigate('/user_login')
      }
    })
  },[])
  
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar " style={{ backgroundColor: "rgba(80, 95, 160, 0.060)", color: "yellow" }}>
        <a class="navbar-brand" href="/">EVENTO</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            {/* <a class="nav-item nav-link active" href="/signuser">Home <span class="sr-only">(current)</span></a> */}
            <Link class="nav-item nav-link" to="/userdata">signup</Link>
            <Link class="nav-item nav-link" to="/user_login">login</Link>
            <Link class="nav-item nav-link " to="/contactus">Contact us</Link>
            <Link class="nav-item nav-link " to="/aboutus">About us</Link>
          
          {/* <div className="text-right" style={{position:"absolute",}}>
            <button type="button" className="btn btn-primary" style={{}}>Logout</button></div>
          </div> */}
            {/* <button onClick={logout} type="button" className="d-flex justify-content-end">Logout</button> */}
                      </div>̥
                     
        </div>
      </nav>
    </>
  )
}
export default User_navi;