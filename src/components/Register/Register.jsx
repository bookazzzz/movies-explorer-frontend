import React from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link, Redirect } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import useFormValidation from "../../hooks/useFormValidation";

function Register(props) {
  const { resetForm } = useFormValidation({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChangeName =(e) => {
	const target = e.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
	setName(e.target.value);
  }

  function handleChangeEmail(e) {
	const target = e.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
	setEmail(e.target.value);
  }

  function handleChangePassword(e) {
	const target = e.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
	setPassword(e.target.value);
  }

  function handleSubmit(e) {
	  e.preventDefault();
	  props.onRegister({ name, email, password });
	  resetForm();
  }

  React.useEffect(() => {
    setName('');
	  setEmail('');
	  setPassword('');
  }, []);

  return (
 <div>
	{!props.loggedIn ? (
    <section className="register">
      {props.isLoading ? (
        <Preloader />
      ) : (
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
                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                name="Имя"
                type="name"
                placeholder="Ваше имя"
                required
                value={name || ""}
                onChange={handleChangeName}
              />
            </label>
            <span className="register__input-error">{errors.name}</span>
            <label className="register__label">
              E-mail
              <input
                className="register__input"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email || ""}
                onChange={handleChangeEmail}
              />
            </label>
            <span className="register__input-error">{errors.email}</span>
            <label className="register__label">
              Пароль
              <input
                className="register__input"
                name="password"
                type="password"
                minLength="8"
                placeholder="Пароль"
                required
                value={password || ""}
                onChange={handleChangePassword}
              />
            </label>
            <span className="register__input-error">{errors.password}</span>
            <button
              type="submit"
              className={`register__button ${
                !isValid && "register__button_disable"
              }`}
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <p className="register__text">
              Уже зарегистрированы?
              <Link className="register__link" to="/signin">
                {" "}
                Войти{" "}
              </Link>
            </p>
          </form>
        </div>
      )}
    </section>) : (
        <Redirect to="./" />
      )}
    </div>
  );
}

export default Register;
