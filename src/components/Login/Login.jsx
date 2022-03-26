import React from 'react'
import "./Login.css";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";

function Login(props) {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
      setEmail(e.target.value);
  }

  function handleChangePassword(e) {
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      props.onLogin({email, password});
  }
  
  React.useEffect(() => {
      setEmail('');
      setPassword('');
  }, []);

  return (
    <section className="login">
          <div className="login__container">
          <Link to="/" className='login__logo-link'>
            <img className="login__logo" src={logo} alt="Логотип" />
          </Link>
            <h2 className="login__entry">Рады видеть!</h2>
            <form className="login__form" name="login" onSubmit={handleSubmit}>
              <label className="login__label">
                E-mail
                <input
                  className="login__input"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  minLength="2"
                  maxLength="40"
                  value={email || ''}
                  onChange={handleChangeEmail}
                />
              </label>
              <label className="login__label">
                Пароль
                <input
                  className="login__input"
                  name="password"
                  type="password"
                  id="password"
                  minLength="8"
                  placeholder="Пароль"
                  required
                  maxLength="15"
                  value={password || ''}
                  onChange={handleChangePassword}
                />
              </label>
              <button type="submit" className="login__button">Войти</button>
              <p className="login__text">
                Ещё не зарегистрированы?
                <Link className="login__link" to="/signup"> Регистрация </Link>
              </p>
            </form>
          </div>
        </section>
  );
}

export default Login;