const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenvConfig=require("dotenv/config")
const {User}=require("./UserDetails.js")

const app = express();
app.use(express.json());
app.use(cors());
const PORTValue = process.env.PORT || 5002;

mongoose.connect(process.env.DB_LOCATION);

const connection = mongoose.connection;

connection.on("connected", () => {
console.log("MongoDB is conneted");
});


// signup

app.post("/signup",async(req,res)=>{

    const {firstname,secondname,gmail,password}=req.body
    console.log(firstname)

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstname,
        secondname,
        gmail,
        password: hashedPassword,
      });

      newUser.save().then(()=>{
        return res.status(200).json({"message":"User registration successfull.."})
      }).catch(err=>{
        console.log(err.message)
      })

   
})


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
    return res.status(401).json({ error: "No access token" });
    }
    jwt.verify(token, "BHGT6FRT7TFr4EDW", (err, user) => {
    if (err) {
    return res.status(403).json({ error: "Access token is invalid" });
    }
    req.user = user.id;
    next();
    });
    };

// signin

app.post('/signin', async (req, res) => {
    const { gmail, password } = req.body;
  
    const user = await User.findOne({ gmail });
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid gmail' });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const token = jwt.sign({ firstname: user.username,secondname:user.secondname }, "BHGT6FRT7TFr4EDW");
  
    res.json({ token });
  });






