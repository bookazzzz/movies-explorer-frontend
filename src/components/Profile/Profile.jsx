import React from 'react'
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from '../../hooks/validator';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const { values, errors, isValid, handleChange, resetForm } =
  useFormValidation({ email: currentUser.email, name: currentUser.name });

const [isValuesNotMatched, setisValuesNotMatched] = React.useState(false);

function checkValues() {
  if (
      currentUser.email === values.email &&
      currentUser.name === values.name
  ) {
      setisValuesNotMatched(false);
  } else {
      setisValuesNotMatched(true);
  }
}

React.useEffect(() => {
  checkValues();
}, [handleChange]);

function handleOnSubmit(evt) {
  evt.preventDefault();
  props.onEditProfile(values);
}

 
  return (
    <>
    <Header loggedIn={props.loggedIn} />
    <section className="profile">
          <div className="profile__container">
            <h2 className="profile__entry">{`Привет, ${currentUser.name}`}</h2>
            <form className="profile__edit-form" onSubmit={handleOnSubmit}>
              <label className="profile__label">
                Имя
                <input
                  className="profile__input"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  value={values.name || ""}
                  onChange={handleChange}
                />
              </label>
              <hr className="profile__splitter" />
              <label className="profile__label">
                Почта
                <input
                  className="profile__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email || ""} 
                  onChange={handleChange}
                />
              </label>
            </form>
            <div className="profile__buttons-container">
              <button type="submit" className="profile__button" onClick={handleOnSubmit}>
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
          </div>
        </section>
      </>
  );
}

export default Profile;