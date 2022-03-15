import React from "react";
import logo from "../../images/logo.svg";
import imgProfile from "../../images/img_profile.svg";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useMediaQuery } from "react-responsive";

function Header(props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      {props.loggedIn ? (
        <>
          {!isTabletOrMobile && (
            <ul className="header__links">
              <li className="header__link-item">
                <NavLink
                  to="/movies"
                  className="header__link header__link_login"
                  activeClassName="header__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="header__link-item ">
                <NavLink
                  to="/saved-movies"
                  className="header__link"
                  activeClassName="header__link_active"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          )}
          <>
          {!isTabletOrMobile && (
            <NavLink
              to="/profile"
              className="header__link header__profile-link"
              activeClassName="header__link_active"
            >
              <button class="header__profile-button">
                <img
                  class="header__profile-img"
                  src={imgProfile}
                  alt="profile"
                />
                Аккаунт
              </button>
            </NavLink>
            )}
          </>
          {isTabletOrMobile && ( 
            <>
              <button className="header__burger-button" type="button"></button>
              <Navigation />
            </>
          )}
        </>
      ) : (
        <ul className="header__links">
          <li className="header__link-item">
            <Link to="signup" className="header__link header__link_active header__link_logout">
              Регистрация
            </Link>
          </li>
          <li className="header__link-item">
            <Link to="signin" className="header__link header__link_active">
              <button className="header__button">Войти</button>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
