const validator = require('validator');
const bcryptjs = require('bcryptjs');

const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema); //definindo um modelo que representa uma collection 


class Login {
  constructor(body) {
    this.body = body; 
    this.errors = [];
    this.user = null;
  } 

  async login() {
   // this.valida();

    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });


    if (!this.user) {
      this.errors.push('Usuário não encontrado!');
      return;
    }

    if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.errors.push('Senha inválida')
      this.user = null ;
      return;
    }

  };

  async register() {
    
    this.valida();

    //agora eu preciso garantir que se meu array de erros estiver com alguma coisa , eu n deixo criar um user

    if (this.errors.length > 0) return;

    await this.checkUserExists();

    if (this.errors.length > 0) return;
    
    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
    
    this.user = await LoginModel.create(this.body); //criando la no db o campo user com o objeto ja limpo
    //O await garante que a Promessa retornado por create seja resolvida antes de prosseguir.
    //agora posso acessar o user , de fora , por exemplo la na controller
  }

  valida() {

    this.cleanUp();
    //e-mail válido!
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');

    //senha entre 6 e 20 caracteres..
    if (this.body.senha.length < 6 || this.body.senha.length > 20) this.errors.push('senha deve conter entre 6 e 20 caracteres');
  }

  async checkUserExists() {
    
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Email já registrado!');
  }

  cleanUp() { //garante que tudo que está no body seja uma string !

    for (const key in this.body) { //for nas chaves do body

      if (typeof this.body[key] !== 'string') { //usando o for in para iterar sobre objetos 
        this.body[key] = ''; //caso  n seja ,converte para string vazia 
      }
    }

    //de fato definindo os campos que eu preciso na minha MODEL; 
    this.body = {
      email: this.body.email,
      senha: this.body.senha
    }
  }

};

module.exports = Login;
