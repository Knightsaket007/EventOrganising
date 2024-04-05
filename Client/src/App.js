// import logo from './logo.svg';
// import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home";
import Co_data from "./pages/Co_data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup_co from "./pages/Signup_co";
import Edituser from "./pages/Edituser"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Addevents_co from "./pages/Addevents_co"
import Eventsuccess from "./pages/Eventsuccess"
import Dashboard from "./pages/Dashboard"
import Sign_user from "./pages/Sign_user"
import Login_user from "./pages/Login_user"
import Events from "./pages/Events"
import Eventdetails from "./pages/Eventdetails"
import Admin from "./pages/Admin"
import Paysuccess from "./pages/Paysuccess"
import Contactus from "./pages/Contactus"
import Aboutus from "./pages/Aboutus"
import DashboardUser from "./pages/DashboardUser"
let App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup_co />} />
          <Route path="/coadmins" element={<Co_data />} />
          <Route path="/edit-user/:emailid" element={<Edituser />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addevents/:emailid" element={<Addevents_co />} />
          <Route path="/eventsuccess/:emailid" element={<Eventsuccess />} />
          <Route path="/dashboard/:emailid" element={<Dashboard />} />
          <Route path="/signup_user" element={<Sign_user />} />
          <Route path="/user_login" element={<Login_user />} />
          <Route path="/events/:email" element={<Events />} />
          <Route path="/eventdetails/:email/:eventcode" element={<Eventdetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/paysuccess/:email/:eventcode" element={<Paysuccess/>} />
          <Route path="/contact" element={<Contactus/>} />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/user-dashboard/:email/:eventcode" element={<DashboardUser/>} />

        </Routes>
      </BrowserRouter>

    </>
  );
}
export default App;



