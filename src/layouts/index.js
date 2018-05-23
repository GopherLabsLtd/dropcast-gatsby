import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { particlesJSConfigs } from '../utils/particle'

// Styles
import '../styles/main.scss'

// Images
import LOGO from '../img/logo.svg'
import LOGO_WHITE from '../img/logo-white.svg'

// Google fonts
import WebFont from 'webfontloader'
WebFont.load({
  google: {
    families: ['Rufina:400,700', 'Source+Sans+Pro:200,300,400,600,700']
  }
})

class Template extends React.Component {
  componentDidMount() {
    window.particlesJS('site__bg', particlesJSConfigs)
  }

  render() {
    return (
      <div>
        <Helmet>
          <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
        </Helmet>

        <div id="site__bg"></div>

        <div className="main">
          <nav>
            <div className="logo nav__logo">
              <a href="index.html"><img src={LOGO} alt="logo"/></a>
            </div>
            <ul className="nav__list">
              <li className="nav__item"><a href="#">Episodes</a></li>
            </ul>
            <ul className="nav__social">
              <li><a href="#" className="nav_social__item"><i className="fab fa-google-play"></i></a></li>
              <li><a href="#" className="nav_social__item"><i className="fab fa-itunes-note"></i></a></li>
              <li><a href="#" className="nav_social__item"><i className="fas fa-rss-square"></i></a></li>
            </ul>
          </nav>
          <section className="site">
            <h1 className="site__title site__title--separator"><a href="index.html">Dropcast</a></h1>
            <p className="site__description">A podcast discussing anything web related with the world’s experts</p>
          </section>
          <section className="episodes">
            <article className="episode">
              <h2 className="episode__number">01</h2>
              <div className="episode__media">
                <a href="detail.html" className="episode__image"></a>
              </div>
              <div className="episode__detail">
                <a href="detail.html" className="episode__title"><h4>Linda Watkins</h4></a>
                <p className="episode__description">Linda talks about how machine learning models can be used as effective substitutes for classic data structures.</p>
              </div>
            </article>
            <article className="episode">
              <h2 className="episode__number">02</h2>
              <div className="episode__media">
                <a href="detail.html" className="episode__image"></a>
              </div>
              <div className="episode__detail">
                <a href="detail.html" className="episode__title"><h4>Dylan Perry</h4></a>
                <p className="episode__description">Dylan talks to us about how he started programming, challenges he has faced and what keeps him hooked till this day.</p>
              </div>
            </article>
            <article className="episode">
              <h2 className="episode__number">03</h2>
              <div className="episode__media">
                <a href="detail.html" className="episode__image"></a>
              </div>
              <div className="episode__detail">
                <a href="detail.html" className="episode__title"><h4>Olivia Valdez</h4></a>
                <p className="episode__description">Olivia talks about how machine learning models can be used as effective substitutes for classic data structures.</p>
              </div>
            </article>
            <article className="episode">
              <h2 className="episode__number">04</h2>
              <div className="episode__media">
                <a href="detail.html" className="episode__image"></a>
              </div>
              <div className="episode__detail">
                <a href="detail.html" className="episode__title"><h4>Samuel Chavezy</h4></a>
                <p className="episode__description">Sam talks to us about how he started programming and what keeps him hooked till this day.</p>
              </div>
            </article>
          </section>
        </div>

        <footer>
          <p className="footer__content">Made by <a href="https://amie-chen.com" target="_blank">Amie Chen</a> & <a href="https://gopher.it" target="_blank">Gopher Labs</a></p>
          
          <div className="logo footer__logo">
            <a href="https://tympanus.net/codrops/"><img src={LOGO_WHITE} alt="logo"/></a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Template
