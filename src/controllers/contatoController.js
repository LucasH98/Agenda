const Contato = require('../models/ContatoModel');
exports.index = (req,resp)=>{
    resp.render('contato-cadastro',{
        contato:{}
    });
};


exports.register = async(req, res) => {
    
    try {
      const contato = new Contato(req.body);
      await contato.criaContato();
  
      if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/index'));
        return;
      }
  
      req.flash('sucess', 'Contato registrado com sucesso.');
      req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
      return;
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };

exports.editIndex = async (req,resp)=>{
    
   if(!req.params.id){
    return resp.render('404'); 
   } 
    const contato = await Contato.findById(req.params.id);
    if(!contato) resp.render('404'); 
    resp.render('contato-cadastro',{contato});
}

exports.edit  = async(req,resp)=>{

    try{
        if(!req.params.id){
            return resp.render('404'); 
           }
              
           const contato = new Contato(req.body);
           await contato.edit(req.params.id);
    
           if(contato.errors.length>0){ 
            req.flash('errors',contato.errors);
            req.session.save(function(){
             return  resp.redirect('/contato/index');
            });
    
            return ; 
          }
          req.flash('sucess','Contato editado com sucesso!');
          req.session.save(function(){
           return  resp.redirect(`/contato/index/${contato.contato._id}`);
          });
    }
    catch(e){
    console.log(e);
    resp.render('404');
    }
}

exports.delete = async(req,resp)=>{

    if(!req.params.id){
        return resp.render('404'); 
       } 
        const contato = await Contato.delete(req.params.id);
        if(!contato) resp.render('404'); 

        req.flash('sucess','Contato apagado com sucesso!');
          req.session.save(function(){
           return  resp.redirect('/');
          });
        }

