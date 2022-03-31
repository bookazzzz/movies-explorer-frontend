import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  console.log(user);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api.getUser(token).then((res) => {
        props.setIsLoading(false);
        if (res) {
          setUser({
            name: res.user.name,
            email: res.user.email,
          });
          setName(res.user.name);
          setEmail(res.user.email);
        }
      });
    }
  }, [props.isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name === user.name && email === user.email) return;
    props.onEditProfile({
      name: name,
      email: email,
    });
  }

  function handleName(e) {
    if (e.target.value === user.name) return;
    const target = e.target;
    const name = target.name;
    setName(e.target.value);
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleEmail(e) {
    if (e.target.value === user.email) return;
    const target = e.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
    setEmail(e.target.value);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      {props.isLoading ? (
        <Preloader />
      ) : (
        <section className="profile">
          <div className="profile__container">
            <h2 className="profile__entry">{`Привет, ${user.name}`}</h2>
            <form className="profile__edit-form" onSubmit={handleSubmit}>
              <label className="profile__label">
                Имя
                <input
                  className="profile__input"
                  name="name"
                  autocomplete="off"
                  type="text"
                  placeholder="Имя"
                  value={name || ""}
                  onChange={handleName}
                  pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                />
              </label>
              <span className="profile__input-error">{errors.name}</span>
              <hr className="profile__splitter" />
              <label className="profile__label">
                Почта
                <input
                  className="profile__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email || ""}
                  onChange={handleEmail}
                />
              </label>
              <span className="profile__input-error">{errors.email}</span>
              <div className="profile__buttons-container">
                <button
                  type="submit"
                  className={
                    isValid
                      ? "profile__button"
                      : "profile__button profile__button_invalid"
                  }
                  disabled={!isValid}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__button profile__button_logout"
                  onClick={props.onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
