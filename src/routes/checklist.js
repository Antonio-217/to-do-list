const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');
const checklist = require('../models/checklist');

//Pegar coisas no servidor
router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', {checklists: checklists})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas'});
    }
})

router.get('/new', async (req, res) =>{
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'});
    }
})

//Adicionar coisas no servidor
router.post('/', async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = new Checklist({name});
    try {
        await checklist.save()
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('/checklists/new', {checklist: {...checklist, error}})
    }
})

//Pegar coisas no servidor com parametro
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas de tarefas'});
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