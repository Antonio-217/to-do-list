const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

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

router.get('/:id/edit', async (req, res) =>{
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist});
    } catch (error) {
        console.log(error)
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de listas de tarefas'});
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
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas de tarefas'});
    }
})

//Atualizar coisas no servidor
router.put('/:id', async (req, res) => {
    let {name} = req.body.checklist;
    try {
    let updatedChecklist = await Checklist.findOneAndUpdate(
        { _id: req.params.id }, // Filtro para encontrar o documento pelo ID
        { name: name }, // Atualizações a serem aplicadas
        { new: true } // Opção para retornar o documento atualizado
    );
    if (!updatedChecklist) {
        return res.status(404).send('Checklist não encontrado');
    }
    res.redirect('/checklists');
        res.status(200).json(checklist);
} catch (error) {
    console.log(error)
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}})
}
})

//Deletar coisas no servidor
router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect('/checklists')
    } catch (error) {
        console.log(error)
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista de tarefas'});
    }
})

module.exports = router;