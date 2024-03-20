const express = require('express');
const path = require('path');

const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');

const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override')
 
require('./config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);
//setando a pasta padrão do sistema e a pasta das views
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

/*Utilizando está rota, tens acesso a todos os métodos (GET, POST, PUT, DELETE)*/
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDepedent);

app.listen(3000, () => {
    console.log('Servidor iniciado');
})