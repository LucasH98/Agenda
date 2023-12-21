//exportando o contato para mostra-los na home 
const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contatos = await Contato.getContatos();
  res.render('index',{contatos});

};
