import { NavLink } from "react-router-dom";
import imgProfile from "../../images/img_profile.svg";

import "./Navigation.css";

function Navigation() {
  return (
    <section className="navigate">
      <div className="navigate__container">
        <button className="navigate__close-button"></button>

        <ul className="navigate__links">
          <NavLink to="/" className="navigate__link ">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigate__link navigate__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="navigate__link ">
            Сохранённые фильмы
          </NavLink>
        </ul>

        <NavLink to="/profile">
          <button className="navigate__profile-button">
            <img
              src={imgProfile}
              alt="иконка профиля"
              className="navigate__profile-img"
            />
            Аккаунт
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default Navigation;
