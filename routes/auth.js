const express = require('express')
const User = require('../models/User')
const router = express.Router()
//installing express-validator for validation
const { body, validationResult } = require('express-validator');
//installing bcryptjs package for intial authentication
const bcrypt = require('bcryptjs');
//installing jsonwebtoken for subsquent authentication and authorization
const jwt = require('jsonwebtoken');
const fetchuser = require("../middlewares/fetchuser")
//creating secretkey for the signature

//(signup)
// Route:1 create a user  using: POST "/api/auth/createuser": endpoint : No Login Required
router.post("/createuser",
    [body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        //if there are errors(signup karne me error aaye tab ye bhejo), return bad request and error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            // using this how to send messege when user input already exists email
            let user = await User.findOne({ email: req.body.email })//ise line ka mtb hai ak user already hai 
            if (user) {//findOne se ak user already bna liya ab if me kha hai ki user already hai to error dedo
                return res.status(400).json({ success, errors: "sorry, That email address is already exists, Please try to Login" });
            }
            // using bcryptjs package how to convert password into hash and salt
            const salt = await bcrypt.genSalt(10)
            const securePass = await bcrypt.hash(req.body.password, salt)
            //using modals and schema when user send http request in this format
            //create a user
            user = await User.create({
                name: req.body.name,   //isko destructuring se bhi likh sakte the notes.js me dekho
                email: req.body.email,
                password: securePass,
            })
            const payload = {
                user:
                    { id: user.id }  //id ke sath aur kuch bhi bhej sakta hu 
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY);  //syncronous mode
            // console.log(token)
            success = true;
            res.status(200).json({ success, authtoken: token });

        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error");
        }
    }
)






//  (login)
//Route:2 create a login page using: POST "api/auth/login" : endpoint  : No Login Required
router.post("/login",
    [body('email', 'Enter the valid email').isEmail(),
    body('password', 'password can not be blanked').exists()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // destructuring ka use kar req.body se email and password nikale jo login ke time dalega
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email: email }) //ye email id wala user database se get kiya jo signup ke time aaya tha mtb yha pr login wale user ki email ko signup wali email se compare kiya sahi hai to login  nahi to niche wali error dega 
            if (!user) // user database me nahi hai to send error
                return res.status(400).json({ success, errors: "Enter a valid email and password" });

            // ab password ko database wale hase password se compare karenge (signup and login password ko match )
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) //if password does not match send this error
                return res.status(400).json({ success, errors: "Enter a valid email and password" });

            // agar email and password match ho gye to user ko token send kar denge
            const payload = {
                user:
                    { id: user.id }
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY);  //syncronous mode
            success = true;
            res.status(200).json({ success, authtoken: token });

        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error");
        }
    }
)



// (decode user from jwt token )
//Route:3 get logged in user Details using: POST "api/auth/getuser" : endpoint: Login Required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        //user ne logged in website ke ander kisi protected route (ex:shop) ko open kiya too jwt token se hmne data get karke authenticate kar liya 
        let user = await User.findById(userId).select("-password")
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error");
    }
}
)
module.exports = { router } 