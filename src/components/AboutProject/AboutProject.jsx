import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
<section className="about-project">
          <a name="project" className="about-project__title">О проекте</a>
          <div className="about-project__grid">
            <div >
              <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
              <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div >
              <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
              <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className="about-project__progress">
            <p className="about-project__info about-project__block-green">1 неделя</p>
            <p className="about-project__info about-project__block-grey">4 недели</p>
            <span className="about-project__info">Back-end</span>
            <span className="about-project__info">Front-end</span>
          </div>
        </section>
    );
}

export default AboutProject;