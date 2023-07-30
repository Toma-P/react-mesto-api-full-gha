import Auth from "./Auth";
import { Link } from "react-router-dom";

function Register({onRegister}) {
  return (
    <Auth name="register" title="Регистрация" onSubmit={onRegister} buttonText="Зарегистрироваться" >
      <p className="auth__form-question">Уже зарегистрированы?<Link className="auth__form-link" to="/sign-in">Войти</Link></p>
    </Auth>
  )
}

export default Register;