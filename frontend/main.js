import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Cadastro from './modules/Cadastro';
import CadastroContato  from './modules/Cadastro-contato';

const cadastroContato = new CadastroContato('.form-cadastro-contato')
const cadastro = new Cadastro('.form-cadastro');
const login = new Login('.form-login');
cadastro.init();
//login.init();
cadastroContato.init();
