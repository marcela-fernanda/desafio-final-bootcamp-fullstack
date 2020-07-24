const express = require('express');
const transactionRouter = express.Router();
const services = require('../services/transactionService');

module.exports = transactionRouter;

//Rota principal
transactionRouter.get('/', services.mainRoute);

//Rota para selecionar todos os meses disponíveis
transactionRouter.get('/months', services.selectYearMouths);

//Rota para filtrar dados
transactionRouter.get('/filter', services.findFilter);

//Rota para inserir um dado
transactionRouter.post('/insert', services.insertData);

//Rota para deletar um dado
transactionRouter.delete('/delete', services.deleteData);

//Rota para atualizar um dado
transactionRouter.put('/update', services.updateData);
