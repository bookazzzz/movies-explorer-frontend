import React from 'react'
import "./Login.css";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
          <div className="login__container">
          <Link to="/" className='login__logo-link'>
            <img className="login__logo" src={logo} alt="Логотип" />
          </Link>
            <h2 className="login__entry">Рады видеть!</h2>
            <form className="login__form">
              <label className="login__label">
                E-mail
                <input
                  className="login__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </label>
              <label className="login__label">
                Пароль
                <input
                  className="login__input"
                  name="password"
                  type="password"
                  minLength="8"
                  placeholder="Пароль"
                  required
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