const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const async = require("hbs/lib/async");
const session = require("express-session");


require("./src/db/conn");
const Cart = require('./src/models/cartModel');
const Info = require("./src/models/Information");
const { json } = require("express");
const port = process.env.PORT || 8998;

// all pages locations 
const static_path = path.join(__dirname, "./public");
app.set("views", path.join(__dirname, "templates", "views"));

// use page information using get and set use:
app.use(express.static(static_path));
app.set("view engine", "hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'yourSuperSecretKeyHere',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60,  
    secure: false  } 
}));

// Home Page Setup
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
})

app.get("/vegbite", (req, res) => {
  console.log("Session firstName:", req.session.firstName);
  const firstName = req.session.firstName || '';  // Default to empty string if not set
  res.render("home", { firstName });
});

// Signup page Setup

app.post("/information", async (req, res) => {
  try {
    const password = req.body.password;
    const cnfpassword = req.body.confirmpassword;

    if (password === cnfpassword) {
      const Entries = new Info({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cnfpassword: req.body.confirmpassword,
      });
      const Registered = await Entries.save();
      res.status(201).render("home", { firstName: req.body.firstname });;
    } else {
      res.send("passwords are not matching.");
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//   Login Page Setup
app.get("/login", (req, res) => {
  res.render("login");
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Info.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }
        if (password !== user.password) {
            return res.status(400).send('Incorrect password');
        }
        req.session.firstName = user.firstname;

        console.log("Session firstName:", req.session.firstName);
        res.render("home", { firstName: user.firstname });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
