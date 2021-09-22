const router = require('express').Router();
const NoteSchema = require('../models/Note');

router.get('/notes', async(req, res) => {
    const notesList = await NoteSchema.find({}).sort({_id: -1}) || [];

    res.json(notesList);
})

router.post('/new-note', async(req, res) => {
    const note = await NoteSchema.create({
        noteTitle: "Nowa notatka.",
        noteBody: "Zawartość notatki...",
    })

    res.json(note)
})

router.get('/delete-note/:id', async(req, res) => {
    if(!req.params.id) return res.json({message: "Nie podano id notatki"})
    const id = req.params.id;
    console.log(id)
    const findDB = await NoteSchema.findOne({_id: id})

    if(!findDB) return res.json({message: "Nie znaleziono notatki.", status: 0})

    await NoteSchema.findByIdAndDelete(id)
    res.json({message: "Sukces.", status: 1})
})

router.post('/save-note', async(req, res) => {
    if(!req.body) return res.json({message: "Nie podano danych..."})
    const {title, content, noteID} = req.body;

    const getNoteObject = await NoteSchema.findOne({_id: noteID});

    if(!getNoteObject) return res.json({message: "Nie znaleziono takiej notatki"})

    await NoteSchema.findOneAndUpdate({_id: noteID}, {
        noteTitle: title,
        noteBody: content
    })
    res.json({message: "Sukces"})
})

router.get('/get-note', async(req, res) => {
    if(!req.query.id) return res.json({message: "Musisz podac id!"})
    const noteID = req.query.id

    const getNote = await NoteSchema.findOne({_id: noteID})
    if(!getNote) return res.json({message: "Taka notatka nie istnieje..."})
    res.json(getNote);
})
module.exports = router;