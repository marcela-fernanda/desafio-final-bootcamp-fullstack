const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

//Implementando rotas
exports.mainRoute = async (req, res) => {
  try {
    const data = await TransactionModel.find({
      yearMonth: req.query.period,
    }).sort({ day: 1 });

    if (data.length === 0) {
      res.status(400).send({
        error: 'Período inválido',
      });
    }

    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }

  if (!req.query.period) {
    res.status(400).send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
    return;
  }
};

exports.selectYearMouths = async (_, res) => {
  try {
    const yearMonths = await TransactionModel.find().distinct('yearMonth');

    res.send(yearMonths);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.findFilter = async (req, res) => {
  try {
    const data = await TransactionModel.find({
      description: new RegExp(req.query.filter, 'i'),
      yearMonth: req.query.period,
    });

    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.insertData = async (req, res) => {
  try {
    const data = await TransactionModel.create({
      description: req.body.data.description,
      value: req.body.data.value,
      category: req.body.data.category,
      year: req.body.data.year,
      month: req.body.data.month,
      day: req.body.data.day,
      yearMonth: req.body.data.yearMonth,
      yearMonthDay: req.body.data.yearMonthDay,
      type: req.body.data.type,
    });

    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    await TransactionModel.deleteOne({
      _id: req.query.id,
    });

    res.send('Deleção realizada com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    await TransactionModel.updateOne(
      {
        _id: req.body.id,
      },
      {
        description: req.body.data.description,
        value: req.body.data.value,
        category: req.body.data.category,
        year: req.body.data.year,
        month: req.body.data.month,
        day: req.body.data.day,
        yearMonth: req.body.data.yearMonth,
        yearMonthDay: req.body.data.yearMonthDay,
        type: req.body.data.type,
      }
    );

    res.send('Atualização realizada com sucesso!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
