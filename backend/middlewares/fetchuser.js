const jwt = require('jsonwebtoken');
const secret_Key = 'sonudangihandsomeboy';


function fetchuser(req, res, next) {
    // get the user from JWT token and 
    let token = req.header("token")
    // agar token wrong hai to access denied 401 code 
    if (!token) {
        res.status(401).json({ errors: "please authenticate using a valid token " });
    }
    try {
        // token ko varify kar rhe jo diya tha login ke time 
        let decoded  = jwt.verify(token, secret_Key);
        //decoded ke ander se user nikala 
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).json({ errors: "please authenticate using a valid token " });
    }
}
module.exports = fetchuser;

// try and catch me isliye dala ydi token valid na ho to catch ke through error de dega 