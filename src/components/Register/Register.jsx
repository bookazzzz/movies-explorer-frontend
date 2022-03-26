import React from 'react'
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props) {
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
}
  
  function handleChangeEmail(e) {
      setEmail(e.target.value);
  }

  function handleChangePassword(e) {
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      props.onRegister({name, email, password});
  }

  React.useEffect(() => {
      setEmail('');
      setPassword('');
  }, []);


  return (
    <section className="register">
      <div className="register__container">
      <Link to="/">
        <img className="register__logo" src={logo} alt="Логотип" />
      </Link>
        <h2 className="register__entry">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label">
            Имя
            <input
              className="register__input"
              name="Имя"
              type="name"
              placeholder="Ваше имя"
              required
              value={name || ''} 
              onChange={handleChangeName}
            />
          </label>
          <span className="register__input-error"></span>
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email || ''} 
              onChange={handleChangeEmail}
            />
          </label>
          <span className="register__input-error"></span>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              name="password"
              type="password"
              minLength="8"
              placeholder="Пароль"
              required
              value={password || ''} 
              onChange={handleChangePassword}
            />
          </label>
          <span className="register__input-error"></span>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?
            <Link className="register__link" to="/signin"> Войти </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
