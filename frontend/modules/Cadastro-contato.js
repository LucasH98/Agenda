export default class CadastroContato {
  constructor(classForm) {
    this.form = document.querySelector(classForm);
  }

  init() {
    this.getEvent();
  }

  getEvent() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {

      e.preventDefault();
      if(this.checkFields()){
        this.form.submit();
      }
    });
  }

  checkFields() {
    let isValid = true;
  
    for (let err of this.form.querySelectorAll('.text-danger')) {
      err.remove();
    }
  
    for (let field of this.form.querySelectorAll('.form-control')) {
      const label = field.previousElementSibling.innerText;
  
      if (!field.value) {
        isValid = false;
        this.FieldWithError(field, `${label} não pode ser vazio!`);
      }
      if (field.name.includes('email')) {
        if (this.checkEmailCriteria(field) === false) {
          isValid = false;
        }
      }
      if (field.name.includes('telefone')) {
        if (isNaN(field.value)) {
          isValid = false;
          this.FieldWithError(field, `${label} deve conter  apenas números`);
        }
      }
    }
    return isValid;
  }
  

  checkEmailCriteria(campo) {
    const validator = require('validator');
    let valid = true;
    const email = campo.value;

    if(!validator.isEmail(email)) {
      this.FieldWithError(campo, 'Email inválido');
       valid = false;
    }
    return valid;
  }

  FieldWithError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('text-danger');
    field.insertAdjacentElement('afterend', div);
  }
}
