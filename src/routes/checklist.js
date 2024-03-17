const express = require('express');

const router = express.Router();

//Pegar coisas no servidor
router.get('/', (req, res) => {
    console.log('Olá');
    res.send();
})

//Adicionar coisas no servidor
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
})

//Pegar coisas no servidor com parametro
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`ID: ${req.params.id}`);
})

//Atualizar coisas no servidor
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`PUT ID: ${req.params.id}`);
})

//Deletar coisas no servidor
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`DELETE ID: ${req.params.id}`);
})

module.exports = router;