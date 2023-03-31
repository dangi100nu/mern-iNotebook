const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require("../middlewares/fetchuser")
const { body, validationResult } = require('express-validator');


//Route:1 fetch all the notes of user using: get "api/notes/fetchallnotes" : endpoint: Login Required 
// agar user logged in hai and protected route pr jayega to token se authenticate karke access de dega but user login nahi hai  to vahi id password manega
// get method because of data get by the server 
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error");
    }
})


//Route:2 add user notes using: POST "api/notes/addnote" : endpoint: Login Required 
router.post("/addnotes", fetchuser,
    [body('title', 'Enter atleast 3  characters').isLength({ min: 3 }),
    body('description', 'Enter atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            /// Create a new user notes using the create method
            const { title, description, tag } = req.body
            notes = await Notes.create({
                title, description, tag, user: req.user.id
            })
            res.status(200).json(notes);
        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error");
        }
    })


//Route:3 update existing notes using: PUT "api/notes/updatenotes" : endpoint: Login Required 
//aap put method  ka use kar sakte hai but post ka hi kar lo yrr
router.put("/updatenotes/:id", fetchuser,
    async (req, res) => {
        try {

            const { title, description, tag } = req.body
            //create a newNote Object
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // find the note to be updated and update it
            // (vo nya data find kar lo aur update request server ko bhej do )
            //params= parameters ( params property to access the user ID passed in the URL)
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send("content not found")
            }
            // validation about user dusre ka data update na kar paye 
            // note.user.toString() isse id get kari update karne wali ki and database se user ko match karaya 
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note)
        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error");
        }

    });

//Route:3 delete existing notes using: DELETE "api/notes/deletenotes" : endpoint: Login Required 
router.delete("/deletenotes/:id", fetchuser,
    async (req, res) => {
        try {
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send("content not found")
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json("successfully note deleted from database" )
        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error");
        }
    });
module.exports = router