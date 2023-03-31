// if we are creating modals first create Schema and then create models

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //like a foreign key
        ref: "User"      //refrence User wale models se aaya hai isse User wale model se Object id yha set ho jayegi isse jo bhi user data dalega uski object id user database me  user id ke sath set ho jayegi 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes