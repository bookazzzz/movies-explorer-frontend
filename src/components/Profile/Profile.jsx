import React from 'react'
import "./Profile.css";
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
    <Header loggedIn={props.loggedIn} />
    <section className="profile">
          <div className="profile__container">
            <h2 className="profile__entry">Привет, Денис!</h2>
            <form className="profile__edit-form">
              <label className="profile__label">
                Имя
                <input
                  className="profile__input"
                  name="name"
                  type="text"
                  placeholder="Имя"
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
                />
              </label>
            </form>
            <div className="profile__buttons-container">
              <button type="submit" className="profile__button">
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