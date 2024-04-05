import axios from "axios";
import { useState } from "react"
import NavBar from "./components/NavBar"


let Contactus = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Subject, setSubject] = useState("");
    const [Message, setMessage] = useState('');
    function email() {
        axios.post('http://localhost:3000/contact', {
            Name: Name,
            Email: Email,
            Subject: Subject,
            Message: Message,

        })
    }


    return (
        <>

<NavBar/>
            <section className="main-page-header speaker-banner bg_img" data-background="../assets/images/banner/banner07.jpg">
                <div className="container">
                    <div className="speaker-banner-content">
                        <h2 className="title">contact us</h2>
                        <ul className="breadcrumb">
                            <li>
                                <a href="index.html">
                                    Home
                                </a>
                            </li>
                            <li>
                                contact us
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            <section className="contact-section padding-top">
                <div className="contact-container">
                    <div className="bg-thumb bg_img" data-background="assets/images/contact/contact.jpg"></div>
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-7 col-lg-6 col-xl-5">
                                <div className="section-header-3 left-style">
                                    <span className="cate">contact us</span>
                                    <h2 className="title">get in touch</h2>
                                    <p>We’d love to talk about how we can work together. Send us a message below and we’ll respond as soon as possible.</p>
                                </div>
                                <form className="contact-form" id="contact_form_submit">
                                    <div className="form-group">
                                        <label for="name">Name <span>*</span></label>
                                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Full Name" name="name" id="name" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Email <span>*</span></label>
                                        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" name="email" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="subject">Subject <span>*</span></label>
                                        <input type="text" onChange={(e) => setSubject(e.target.value)} placeholder="Enter Your Subject" name="subject" id="subject" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="message">Message <span>*</span></label>
                                        <textarea name="message" onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Enter Your Message" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-outline-primary col-lg" onClick={email} >submit</button>
                                    </div>
                                    <br/><br/>
                                </form>
                            </div>
                            <div className="col-md-5 col-lg-6">
                                <div className="padding-top padding-bottom contact-info">
                                    <div className="info-area">
                                        <div className="info-item">
                                            <div className="info-thumb">
                                                <img src="assets/images/contact/contact01.png" alt="contact" />
                                            </div>
                                            <div className="info-content">
                                                <h6 className="title">phone number</h6>
                                                <a href="Tel:82828282034">+1234 56789</a>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-thumb">
                                                <img src="assets/images/contact/contact02.png" alt="contact" />
                                            </div>
                                            <div className="info-content">
                                                <h6 className="title">Email</h6>
                                                <a href="Mailto:info@gmail.com"><span className="__cf_email__" data-cfemail="ddb4b3bbb29d9fb2b1b8a9b2">[email&#160;protected]</span> .com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contactus