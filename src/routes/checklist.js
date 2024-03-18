const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist')

//Pegar coisas no servidor
router.get('/', async (req, res) => {
    try {
        let checklist = await Checklist.find({});
        res.status(200).json(checklist);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Adicionar coisas no servidor
router.post('/', async (req, res) => {
    let {name} = req.body;

    try {
        let checklist = await Checklist.create({name})
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

//Pegar coisas no servidor com parametro
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

//Atualizar coisas no servidor
router.put('/:id', async (req, res) => {
    try {
        let {name} = req.body
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

//Deletar coisas no servidor
router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

module.exports = router;