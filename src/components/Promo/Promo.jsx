import React from "react";
import "./Promo.css";

function Promo() {
    return (
        <section class="promo">
          <h1 class="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <div class="promo__conteiner">
           <a href="#project" class="promo__link">О проекте</a>
           <a href="#techs" class="promo__link">Технологии</a>
           <a href="#me" class="promo__link">Студент</a>
          </div>
        </section>
    );
}

export default Promo;