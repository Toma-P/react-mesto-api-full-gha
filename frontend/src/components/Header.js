import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../images/header-logo-white.svg';
import { useLocation } from 'react-router-dom';

function Header({ email, onLinkClick}) {
  const location = useLocation();

  if(location.pathname ==="/") {
    return(
      <header className="header">
        <Link className="header__link" to="" ><img className="header__logo" src={headerLogo} alt="Логотип Место" /></Link>
        <nav className="header__nav-links">
          <NavLink className="header__link" to="">{email}</NavLink>
          <NavLink className="header__link header__link_type_exit" to="/sign-in" onClick={onLinkClick}>Выйти</NavLink> 
        </nav>
      </header>
    )
  }
  if(location.pathname === "/sign-in") {
    return (
      <header className="header">
        <Link className="header__link" to="" ><img className="header__logo" src={headerLogo} alt="Логотип Место" /></Link>
        <nav className="header__nav-links">
          <NavLink className="header__link" to="">{email}</NavLink>
          <NavLink className="header__link" to="/sign-up">Регистрация</NavLink> 
        </nav>
      </header>
    )
  }
  if(location.pathname === "/sign-up") {
    return (
      <header className="header">
        <Link className="header__link" to="" ><img className="header__logo" src={headerLogo} alt="Логотип Место" /></Link>
        <nav className="header__nav-links">
          <NavLink className="header__link" to="">{email}</NavLink>
          <NavLink className="header__link" to="/sign-in">Войти</NavLink> 
        </nav>
    </header>
    )
  }
}
  
export default Header;