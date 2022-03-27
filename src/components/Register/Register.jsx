import React from 'react'
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Register({onRegister,apiResMessage}) {

const { values, errors, isValid, handleChange, resetForm } = useFormValidation({});
  
  const [name, setName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
}
  
//   function handleChangeEmail(e) {
//       setEmail(e.target.value);
//   }

//   function handleChangePassword(e) {
//       setPassword(e.target.value);
//   }

const handleSubmit = e => {
  e.preventDefault();
  isValid && onRegister(name, values.email, values.password);
  resetForm();
}

  // React.useEffect(() => {
  //     setEmail('');
  //     setPassword('');
  // }, []);


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
              className={`register__input ${
                errors.name && "register__input_invalid"
            }`}
              name="Имя"
              type="name"
              placeholder="Ваше имя"
              required
              onChange={handleChangeName}
              value={name}
            />
          <span className="register__input-error">{errors.name}</span>
          </label>
          <span className="register__input-error">{apiResMessage}</span>
          
          <label className="register__label">
            E-mail
            <input
              className={`register__input ${
                errors.email && "register__input_invalid"
            }`}
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={values.email || ""}
            />
          <span className="register__input-error">{errors.email}</span>
          </label>
          <span className="register__input-error">{apiResMessage}</span>
          
          <label className="register__label">
            Пароль
            <input
              className={`register__input ${
                errors.password && "register__input_invalid"
            }`}
              name="password"
              type="password"
              minLength="8"
              placeholder="Пароль"
              required
              onChange={handleChange}
              value={values.password || ""}
            />
          <span className="register__input-error">{errors.password}</span>
          </label>
          <span className="register__input-error">{apiResMessage}</span>

          <button type="submit" className={`register__button ${
                        !isValid && "register__button_disable"
                    }`}
                    disabled={!isValid}>
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
