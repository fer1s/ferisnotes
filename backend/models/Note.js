const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
    },
    noteBody: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
        required: true,
    }
})

module.exports = mongoose.model( `Notes`, NoteSchema );