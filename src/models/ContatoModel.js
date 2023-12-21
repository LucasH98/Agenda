const validator = require('validator');
const mongoose = require('mongoose');
const ContatoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nome: { type: String, required: true },
    telefone: { type: Number, required: true,default:''},
    endereco: { type: String, required: true,default:''},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);


class Contato {

    constructor(body) {
        this.body = body;
        this.contato = null;
        this.errors = [];
    }

     static async findById(id){
        if(typeof(id)!=='string')return ;
        const user = await ContatoModel.findById(id);
        return user ;

    }

    static async getContatos(){
        const contatos = await ContatoModel.find();
        return contatos ;
    }

    async criaContato() {

        this.validaCampos();

        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.create(this.body);
    }

        async edit(id) {
            
            try {
                if (typeof id !== 'string') return;
    
                this.validaCampos();
    
                if (this.errors.length > 0) return;
    
                this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
                return this.contato;
            }
             catch (error) {
                console.error(error);
                
            }
        }

          static async delete(id){

            try {
                if (typeof id !== 'string') return        
                this.contato = await ContatoModel.findOneAndDelete({_id:id});
                return this.contato;
            }
             catch (error) {
            console.error(error);
            }

        }
    

    validaCampos() {
        this.cleanUp();
        
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(isNaN(this.body.telefone)) this.errors.push('O campo telefone deve conter apenas números');

    }

    cleanUp() {

        for (const key in this.body) {

            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        //de fato definindo os campos que eu preciso na minha MODEL; 
        this.body = {

            email: this.body.email,
            nome: this.body.nome,
            telefone: this.body.telefone,
            endereco: this.body.endereco,

        }
    };

};



module.exports = Contato;
