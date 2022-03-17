import React from "react";
import "./AboutMe.css";
import avatar from "../../images/avatar.jpg"

function AboutMe() {
    return (
<section className="about-me">
          <a name="me" className="about-me__title">Студент</a>
            <div className="about-me__conteiner">
              <div className="about-me__profile">
                  <h3 className="about-me__name">Денис</h3>
                  <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
                  <p className="about-me__info">Я родился и живу в Обнинске, закончил факультет экономики РГСУ. Женат. Я люблю слушать музыку, а ещё увлекаюсь спортом. Недавно начал кодить. С 2021 года работал в компании «Новый Город». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.</p>
                  <ul className="about-me__links">
                      <li className="about-me_item">
                          <a className="about-me__link" href="https://github.com/bookazzzz"> Github </a>
                      </li>
                  </ul>
              </div>
              <div>
              <img src={avatar} alt="foto" className="about-me__img" />
             </div>
            </div>
        </section>
    );
}

export default AboutMe;