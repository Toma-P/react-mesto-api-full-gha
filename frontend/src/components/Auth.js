import { useState } from "react";

function Auth({name, title, onSubmit, buttonText, children}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
      })
      
      function handleInputsChange(e) {
        const { name, value } = e.target;
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

      function handleSubmit(e) {
        e.preventDefault();
        if(!formValue.email || !formValue.password) {
            console.log("Не оставляйте поля пустыми");
            return;
        }
        onSubmit(formValue);
      }
    return (
      <section className="auth">
        <div className="auth__container" >
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" name={name} onSubmit={handleSubmit}>
          <input  className="auth__form-item"
            type="email" 
            name="email" 
            value={formValue.email} 
            onChange={handleInputsChange} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            className="auth__form-item" 
            name="password" 
            minLength="6" 
            maxLength="12" 
            value={formValue.password} 
            onChange={handleInputsChange} 
            placeholder="Пароль" 
            required 
          />
          <button type="submit" className="auth__form-submit">{buttonText}</button>
          {children}
        </form>
        </div>
      </section>
    )
}

export default Auth; 