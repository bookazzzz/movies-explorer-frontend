import React from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, Redirect } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import useFormValidation from "../../hooks/useFormValidation";

function Login(props) {

  const { resetForm } = useFormValidation({});

  const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

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
		props.onLogin({ email, password });
    resetForm();
	}

	React.useEffect(() => {
		setEmail('');
		setPassword('');
	}, []);

  return (
    <div>
      {!props.loggedIn ? (
        <section className="login">
			{props.isLoading ? (
				<Preloader />
			) : (
          <div className="login__container">
            <Link to="/" className="login__logo-link">
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
                  value={email || ""}
                  onChange={handleChangeEmail}
                />
                <span className="login__input-error">{errors.email}</span>
              </label>
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
                  value={password || ""}
                  onChange={handleChangePassword}
                />
                <span className="login__input-error">{errors.password}</span>
              </label>
              <button
                type="submit"
                className={`login__button ${
                  !isValid && "login__button_disable"
                }`}
                disabled={!isValid}
              >
                Войти
              </button>
              <p className="login__text">
                Ещё не зарегистрированы?
                <Link className="login__link" to="/signup">
                  {" "}
                  Регистрация{" "}
                </Link>
              </p>
            </form>
          </div>
		  )}
        </section>
      ) : (
        <Redirect to="./" />
      )}
    </div>
  );
}

export default Login;
