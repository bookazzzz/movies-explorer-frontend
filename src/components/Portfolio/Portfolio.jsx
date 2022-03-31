import React from "react";
import "./Portfolio.css";
import arrow from "../../images/strelka.svg"

function Portfolio() {
    return (
        <section className="portfolio">
          <h3 className="portfolio__title">Портфолио</h3>

          <ul className="portfolio__links">

            <li className="portfolio_item">
                <a className="portfolio__link" href="https://github.com/bookazzzz/how-to-learn" target="_blank" rel="noreferrer">
                    <button
                        className="portfolio__link-button"
                        type="button"
                        aria-label="Link Button"
                    >
                        Статичный сайт
                      <img src={arrow} alt="arrow" className="portfolio__arrow" />
                    </button>
                </a>
            </li>

            <li className="portfolio_item">
              <a className="portfolio__link" href="https://github.com/bookazzzz/mesto-react" target="_blank" rel="noreferrer">
                  <button
                      className="portfolio__link-button"
                      type="button"
                      aria-label="Link Button"
                  >
                    Адаптивный сайт
                    <img src={arrow} alt="arrow" className="portfolio__arrow" />
                  </button>
              </a>
          </li>

          <li className="portfolio_item">
            <a className="portfolio__link" href="https://github.com/bookazzzz/react-mesto-auth" target="_blank" rel="noreferrer">
                <button
                    className="portfolio__link-button portfolio__noborder"
                    type="button"
                    aria-label="Link Button"
                >
                 Одностраничное приложение
                  <img src={arrow} alt="arrow" className="portfolio__arrow" />
                </button>
            </a>
        </li>
          </ul>
        </section>
    );
}

export default Portfolio;