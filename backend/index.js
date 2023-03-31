const connectToMongo = require("./db")
const express = require("express")
const auth = require("./routes/auth")
const cors = require('cors');
const path = require("path")
//install express
const app = express()
const port = process.env.PORT || 5000   //5000 kar diya kyuki 3000 pr react app chayenge

//connecting to database
connectToMongo();

// Add the CORS middleware to all requests
app.use(cors());

// middleware because of req.body (user ki request get karne ke liye )
app.use(express.json())

//available routes
app.use("/api/auth/", auth.router);
app.use("/api/notes/", require("./routes/notes.js"));


//static files
// how to configure a static file
app.use(express.static(path.join(__dirname,"../build")));
 //how to access this static file
 //* means pure build folder ko access kar liya
 app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"../build/index.html"))
 })


//port 
app.listen(port, () => {
  console.log(` iNotebook backend : Server Running in ${process.env.NODE_MODE} mode on port ${port}....`)
})