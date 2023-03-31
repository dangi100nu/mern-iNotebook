// if we are creating modals first create Schema and then create models

const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true   
    },
    email: {
        type: String,
        required: true,
        unique:true   // name and password same ho sakte hai but email unique honi chahiye
        
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date(Date.now)
    }

});

module.exports  = mongoose.model("User", UserSchema);

