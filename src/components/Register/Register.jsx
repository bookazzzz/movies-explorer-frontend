import React from 'react'
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
      <Link to="/">
        <img className="register__logo" src={logo} alt="Логотип" />
      </Link>
        <h2 className="register__entry">Добро пожаловать!</h2>
        <form className="register__form">
          <label className="register__label">
            Имя
            <input
              className="register__input"
              name="Имя"
              type="name"
              placeholder="Ваше имя"
              required
            />
          </label>
          <span className="register__input-error">Что-то пошло не так...</span>
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
          <span className="register__input-error">Что-то пошло не так...</span>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              name="password"
              type="password"
              minLength="8"
              placeholder="Пароль"
              required
            />
          </label>
          <span className="register__input-error">Что-то пошло не так...</span>
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
