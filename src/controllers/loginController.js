const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('logado');
    res.render('login');
  };

  exports.register = async function (req,res){ //o register é async logo retorna uma async

    try{
      const login = new Login(req.body);//lembrando que um login possui um user , errors e um body onde recebo os dados
      await login.register();
    
      if(login.errors.length>0){ //agora é a parte doq fazer se tiver erro ,no contexto da aplicacao,pro user
        req.flash('errors',login.errors);
        req.session.save(function(){
         return  res.redirect('/login/index');
        });
        return ; 
      }
      req.flash('sucess','Usuário criado com sucesso!');
      req.session.save(function(){
       return  res.redirect('/login/index');
      });
    }
    catch(e){
      console.log(e);
      res.render('404');
    }

  } ;

  exports.login = async(req,res)=>{

    try{
      const login = new Login(req.body);
      await login.login();
    
      if(login.errors.length>0){

        req.flash('errors',login.errors);
        req.session.save(function(){
         return  res.redirect('/login/index');
        });
        return ; 
      }
      req.flash('sucess','Usuário logado com sucesso!');
      req.session.user = login.user;
      req.session.save(function(){
       return  res.redirect('/login/index');
      });
    }

    catch(e){
      console.log(e);
      res.render('404');
    }

  } ;

  exports.logout = (req,resp) => {
    req.session.destroy();
    return  resp.redirect('/login/index');

  }

  