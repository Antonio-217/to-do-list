const express = require('express');
const path = require('path');

const path = require('path');

const checkListRouter = require('./src/routes/checklist');
const rootRouter = require('./src/routes/index');
 
require('./config/database');
const rootRouter = require('./src/routes/index');
 
require('./config/database');

const app = express();
app.use(express.json());

//setando a pasta padrão do sistema e a pasta das views
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
//setando a pasta padrão do sistema e a pasta das views
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
/*Utilizando está rota, tens acesso a todos os métodos (GET, POST, PUT, DELETE)*/
app.use('/checklists', checkListRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado');
})