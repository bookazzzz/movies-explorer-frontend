import React from "react";
import "./Techs.css";

function Techs() {
    return (
        <section className="techs">
          <a name="techs" className="techs__title">Технологии</a>
          <div className="techs__conteiner">
            <h2 className="techs__subtitle">7 технологий</h2>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          </div>
          <ul className="techs__stack">
            <li className="techs_item">HTML</li>
            <li className="techs_item">CSS</li>
            <li className="techs_item">JS</li>
            <li className="techs_item">React</li>
            <li className="techs_item">Git</li>
            <li className="techs_item">Express.js</li>
            <li className="techs_item">mongoDB</li>
        </ul>
        </section>
    );
}

export default Techs;