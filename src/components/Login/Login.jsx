import React from 'react'
import "./Login.css";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Login({onLogin,apiResMessage}) {
  
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const { values, errors, isValid, handleChange, resetForm } = useFormValidation({});

  // function handleChangeEmail(e) {
  //     setEmail(e.target.value);
  // }

  // function handleChangePassword(e) {
  //     setPassword(e.target.value);
  // }

  function handleSubmit(e) {
      e.preventDefault();
      onLogin(values.email, values.password);
      resetForm();
  }
  
  // React.useEffect(() => {
  //     setEmail('');
  //     setPassword('');
  // }, []);

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
                  className={`login__input ${
                    errors.email && "login__input_invalid"
                }`}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  minLength="2"
                  maxLength="40"
                  value={values.email || ''}
                  onChange={handleChange}
                />
              <span className="login__input-error">{errors.email}</span>
              </label>
              <span className="login__input-error">{apiResMessage}</span>
              <label className="login__label">
                Пароль
                <input
                  className={`login__input ${
                    errors.password && "login__input_invalid"
                }`}
                  name="password"
                  type="password"
                  id="password"
                  minLength="8"
                  placeholder="Пароль"
                  required
                  maxLength="15"
                  value={values.password || ''}
                  onChange={handleChange}
                />
                <span className="login__input-error">{errors.password}</span>
              </label>
              <span className="login__input-error">{apiResMessage}</span>
              <button type="submit" className={`login__button ${
                        !isValid && "login__button_disable"
                    }`}
                    disabled={!isValid}>Войти</button>
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