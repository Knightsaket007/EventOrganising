import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import AdminNavi from "./components/AdminNavi";
const Eventsuccess = () => {
    let navigate = useNavigate();
    let { emailid } = useParams();

    function goDash() {
        navigate(`/Dashboard/${emailid}`)
    }

    return (

        <section className="account-section bg_img" data-background="../assets/images/account/account-bg.jpg">
            <AdminNavi />
            <br />
            <div className="container jumbotron bg-primary" style={{ textAlign: "center" }}>
                <h2>Event Added successfully</h2><span><img src="../check-mark.png" alt="Rendering..." width="60" height="60" /></span></div>
            <br />
            <div className="" style={{ textAlign: "center", width: "230", height: "250" }}>
                <img src="../success-man.png" alt="Rendering..." width="200" height="230" /><br /></div>
            <br />
            <div className="" style={{ textAlign: "center", marginBottom: "20px" }}>
                <button type="button" onClick={goDash} className="btn btn-success col-sm-2">Go to Dashboard</button></div>
        </section>
    )
}
export default Eventsuccess;