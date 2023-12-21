exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.sucess = req.flash('sucess');
  res.locals.user = req.session.user;

  next();
};


exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req,resp,next)=>{
  if(!req.session.user){
    req.flash('errors','É preciso estar logado para realizar esta operação!');
    req.session.save(()=>resp.redirect('/'));
    return;
  }
  next();
};