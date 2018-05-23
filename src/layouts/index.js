import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// Styles
import '../styles/main.scss'

// Images
import LOGO from '../img/logo.svg'
import LOGO_WHITE from '../img/logo-white.svg'

// Google fonts
const isBrowser = typeof window !== 'undefined'
class Template extends React.Component {
  componentDidMount() {
    if (isBrowser) {
      const WebFont = require('webfontloader')      
      WebFont.load({
        google: {
          families: ['Rufina:400,700', 'Source+Sans+Pro:200,300,400,600,700']
        }
      })

      const particlesJSConfigs = require('../utils/particle').particlesJSConfigs
      window.particlesJS('site__bg', particlesJSConfigs)
    }
  }

  render() {
    const { children } = this.props
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
          
          {children()}
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
