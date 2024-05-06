var express = require('express');
// const { append } = require('express/lib/response');
var router = express.Router();
const conn = require('../myModule/connectDB');
const Swal = require('sweetalert2');
const nodemailer = require('nodemailer')
const session = require("express-session");
const { application } = require('express');

router.post('/add-action', function (req, res) {
  console.log(req.body);
  let { fullname, mobile, email, passward } = req.body;
  // console.log(fullname, mobile, email, passward, conpassword, gender,usertype );
  // if (res.body === "") {
  //   alert("All fields are required!!");}
  let select = "select * from admintable where email='" + email + "'"
  console.log(select + ' *****')
  conn.query(select, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {

      res.send("duplicate");
    }
    else {
      let insert = "INSERT INTO `admintable`(`fullname`, `mobile`, `email`, `password`) " +
        "VALUES ('" + fullname + "','" + mobile + "','" + email + "','" + passward + "')"
      conn.query(insert, (err) => {
        if (err) throw err;
        res.send('added');
      })
    }
  })
})
// show data
router.get('/show-user', function (req, res) {
  let eject = "select * from `admintable`";
  conn.query(eject, function (err, result) {
    if (err) throw err;
    res.send(result)
  })

})
// delete
router.get('/delete-user', function (req, res) {
  // console.log(req.query);
  let email = req.query.email;

  let deleteSQL = "DELETE FROM admintable WHERE email='" + email + "'";
  conn.query(deleteSQL, function (err) {
    if (err) throw err;

    res.send('User Deleted');
  });
});


router.get('/edit-email', function (req, res) {
  // console.log(req.query);
  let email = req.query.email;

  let selectSQL = "SELECT * FROM `admintable` WHERE email='" + email + "'";
  conn.query(selectSQL, function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data);
    // res.send([]);
  });
});

router.post("/update-users", function (req, res) {

  let { email, fullname, passward, mobile } = req.body;
  if (fullname === "" || email === "" || passward === "") {
    res.send("required")
  }
  else {
    let update = "UPDATE `admintable` SET `fullname`='" + fullname + "',`mobile`='" + mobile + "',`password`='" + passward + "' WHERE `email`='" + email + "' ";
    conn.query(update, function (error) {
      if (error) throw error;
      res.send('User successfully updated')
    });
  }
});

router.post('/add-des', function (req, res) {
  let { catdes, catname } = req.body
  console.log(req.body)
  let adddes = "INSERT INTO `category`(`Cat_name`, `Cat_description`) " +
    "VALUES ('" + catname + "','" + catdes + "')"
  conn.query(adddes, (err) => {
    if (err) throw err;
    res.send('added');
    console.log('added')

  })
})

router.get("/showCat", function (req, res) {
  let sqlSelect = "SELECT * FROM `category`";
  conn.query(sqlSelect, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

router.get("/delete-cat", function (req, res) {
  let Cat_id = req.query.Cat_id;

  let deletecatSql = "DELETE FROM `category` WHERE `Cat_id`='" + Cat_id + "'";
  conn.query(deletecatSql, function (err) {
    if (err) throw err;

    res.send('category deleted');
  });
})

router.post('/login', (req, res) => {
  let { email, password } = req.body;
  let logSql = "SELECT * FROM `admintable` WHERE `email`='" + email + "'  ";
  console.log("data is ..", email, password)
  console.log("logSql is ..", logSql)

  conn.query(logSql, function (error, data) {
    if (error) throw error;
    console.log("data is ..", data)
    if (data.length > 0) {
      if (data[0].password === password) {
        session.event_manager = email
        res.send('logged');
      }
      else {
        res.send('notMatch');
      }
    }
    else {
      res.send('required')
    }
  })
})

router.get('/admin-logout', function (req, res) {
  session.event_manager = undefined;
  res.send('loggedOut');
})

router.get("/getcat", (req, res) => {
  let selectCat = "SELECT * FROM `category`";
  conn.query(selectCat, function (err, out) {
    if (err) throw err;
    res.send(out)
  })
})

router.post("/add-event", (req, res) => {
  let { category, eventname, orgName, emailid, venue, mobileno, datetime, price, tickets, description } = req.body;
  console.log(req.body);
  console.log(req.files);
  // console.log('check');

  let file = req.files.photo;
  // console.log(file);
  let serverpath = 'public/images/' + file.name;
  let databasepath = 'images/' + file.name;

  let eventfile = req.files.eventphoto
  let eventserverpath = 'public/images/' + eventfile.name;
  let eventdatabase = 'images/' + eventfile.name;

  file.mv(serverpath, err => {
    if (err) throw err;
  })

  eventfile.mv(eventserverpath, err => {
    if (err) throw err;
  })

  if (eventname === '' || category === "select" || category === "" || orgName === "" || venue === "" || mobileno === "" || datetime === "" || price === "" || tickets === "" || description === "") {
    res.send("required");
    console.log("require");
  }
  else {
    let insertSQL = "INSERT INTO `events`(`eventname`, `orgName`, `email`, `category`, `venue`, `mobileno`, `datetime`, `price`, `tickets`, `description`, `userpic`, `eventpic`) VALUES ('" + eventname + "','" + orgName + "','" + emailid + "','" + category + "','" + venue + "','" + mobileno + "','" + datetime + "','" + price + "','" + tickets + "','" + description + "','" + databasepath + "','" + eventdatabase + "')";
    conn.query(insertSQL, function (err) {
      if (err) throw err;
      res.send("done");
    })


    // console.log(insertSQL);
  }
})

router.get("/coadmin_data", (req, res) => {
  let email = req.query.email;
  let eventsget = "select * from `events` WHERE `email`='" + email + "'";
  conn.query(eventsget, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
  secret: "Nosecret",
  saveUnilnitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}))

router.get('/geniun', (req, res) => {
  if (session.event_manager !== undefined) {
    res.send('success')
  }
  else {
    res.send('not login')
  }
})

router.post('/user_signup', function (req, res) {
  console.log(req.body);
  let { name, mobile, email, passward } = req.body;

  let select = "select * from userdata where email='" + email + "'"
  console.log(select + ' *****')
  conn.query(select, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {

      res.send("duplicate");
    }
    else {
      let insert = "INSERT INTO `userdata`(`name`, `mobile`, `email`, `password`) " +
        "VALUES ('" + name + "','" + mobile + "','" + email + "','" + passward + "')"
      conn.query(insert, (err) => {
        if (err) throw err;
        res.send('added');
      })
    }
  })
})


router.post('/log_users', (req, res) => {
  let { email, password } = req.body;
  let logSql = "SELECT * FROM `userdata` WHERE `email`='" + email + "'  ";
  conn.query(logSql, function (error, data) {
    if (error) throw error;
    if (data.length > 0) {
      if (data[0].password === password) {
        session.event_manager = email
        res.send('logged');
      }
      else {
        res.send('notMatch');
      }
    }
    else {
      res.send('required')
    }
  })
})

router.get('/allevents', (req, res) => {
  let GetEvents = "SELECT * FROM events";
  conn.query(GetEvents, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

router.get('/eventdetails', (req, res) => {
  let code = req.query.eventcode;
  let GetEventdetails = "SELECT * FROM `events` WHERE `eventcode`='" + code + "'";
  conn.query(GetEventdetails, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

router.post('/Admin-log', (req, res) => {
  let { id, pass } = req.body;
  let logSql = "SELECT * FROM `adminlogin` WHERE `Id`='" + id + "'  ";
  console.log(logSql)
  conn.query(logSql, function (error, data) {
    if (error) throw error;
    console.log(data[0].Pass)
    console.log(pass)
    if (data[0].Pass === pass) {
      res.send('logged');
    }
    else {
      res.send("notlog")
    }

  })
})

router.post("/paydone", function (req, res) {
  let { eventcode, price } = req.body;
  let dt = new Date();
  let tm = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

  let Insertpay = "INSERT INTO `payment`(`bookingid`, `email`, `amount`, `eventcode`, `bookingdate`,`Time`, `status`) VALUES ('','" + session.event_manager + "','" + price + "','" + eventcode + "','" + dt + "','" + tm + "','success')"
  console.log(Insertpay)
  conn.query(Insertpay, (err) => {
    if (err) throw err;

  })
})

router.get('/orderdetails', function (req, res) {
  // let {email,eventcode}=req.body;
  let email = req.query.email;
  let eventcode = req.query.eventcode;

  let getusersql = "SELECT `name` FROM `userdata` WHERE `email`='" + email + "' ";
  let geteventsql = "SELECT `eventcode`,`eventname` FROM `events` WHERE `eventcode`='" + eventcode + "' ";
  let getpaysql = "SELECT `amount`,`bookingdate`,`time` FROM `payment` WHERE `email`='" + email + "' AND `eventcode`='" + eventcode + "' ";

  let sel = "select name,events.eventcode,eventname,amount,bookingdate,time from userdata,events,payment where userdata.email=payment.email and events.eventcode=payment.eventcode and payment.eventcode='" + eventcode + "' and payment.email='" + email + "'"

  conn.query(sel, (err, data) => {
    if (err) throw err;
    // res.send("success",{data})
    res.send(data)
  })

})

router.post('/contact', (req, res) => {
  let { Email, Name, Subject, Message } = req.body;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vmm.testing.email@gmail.com",
      pass: "otp@1234"
    }
  });

  const options = {
    from: Email,
    to: "saketsourav300@gmail.com",

    text: "Name : " + Name,
    subject: "Subject : " + Subject,
    text: "Message : " + Message,

    // html: "<h1 style='color: #00B7FF'>New Password</h1><p>Your new password <span style='color: red'>" + newPassword + "</span></p>"
  }
  transport.sendMail(options, (err) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success')
    }
  });
})


router.get('/user-logout', function (req, res) {
  session.event_manager = undefined;
  res.send('loggedOut');
})







module.exports = router;

