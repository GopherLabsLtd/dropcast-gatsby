import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Sound from 'react-sound'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: "0:00",
      position: "0:00",
      positionPercentage: 0,
      seek: 0,
      loaded: false,
      playing: true
    }
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      if (this.soundRef) {
        const { position, duration } = this.soundRef.sound
        this.setState({
          ...this.state,
          duration: this.formatAudioTime(duration),
          position: this.formatAudioTime(position),
          positionPercentage: position / duration * 100,
          seek: position
        })
      } else {
        clearInterval(this._interval)
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  formatAudioTime(time) {
    let seconds = Math.floor(time / 1000)
    const minutes = Math.floor(seconds / 60)

    seconds = seconds - (minutes * 60)
    if (seconds < 10) seconds = `0${seconds}`
    return `${minutes}:${seconds}`
  }

  audioLoaded() {
    this.setState({
      ...this.state,
      loaded: true,
      playing: false
    })
  }

  togglePlayingState(playing) {
    this.setState({
      ...this.state,
      playing
    })
  }

  sliderClicked(e) {
    const sliderElement = e.target
    const sliderElementRect = sliderElement.getBoundingClientRect();
    const clickPositionOnSlider = e.pageX - sliderElementRect.left
    const seekPercentage = clickPositionOnSlider / sliderElement.clientWidth

    const { duration } = this.soundRef.sound
    this.setState({
      ...this.state,
      seek: seekPercentage * duration
    })
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext
    const { image: postImage } = post.frontmatter

    const { duration, position, positionPercentage, seek, loaded, playing } = this.state

    return (
      <div className="site no-padding row-wrapper page--detail">
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

        <div className="left">
          <label htmlFor="" className="site__label">Episode #{post.frontmatter.episode}</label>
          <h1 className="site__title site__title--separator">{post.frontmatter.title}</h1>
        </div>

        <div className="right">
          <img
            src={postImage ? postImage.childImageSharp.resize.src : ""}
            alt="" className="episode__image"
          />

          {post.frontmatter.audio &&
            <div style={{ position: 'relative' }}>
              <Sound
                url={require(`../audio/${post.frontmatter.audio}`)}
                playStatus={playing ? Sound.status.PLAYING : Sound.status.PAUSED}
                loop={false}
                position={seek}
                onResume={this.togglePlayingState.bind(this, true)}
                onStop={this.togglePlayingState.bind(this, false)}
                onPause={this.togglePlayingState.bind(this, false)}
                onLoad={this.audioLoaded.bind(this)}
                ref={soundRef => this.soundRef = soundRef}
              />

              <div className="audio-player site__playbar">
                {!loaded &&
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                }

                {loaded &&
                  <button
                    className={"play-pause-btn " + (playing ? 'pause' : 'play')}
                    onClick={this.togglePlayingState.bind(this, !playing)}
                  ></button>
                }

                <div className="controls">
                  <span className="current-time">{position}</span>
                  <div className="slider" data-direction="horizontal" onClick={this.sliderClicked.bind(this)}>
                    <div className="progress" style={{ width: `${positionPercentage}%` }}>
                      <div className="pin" id="progress-pin" data-method="rewind"></div>
                    </div>
                  </div>
                  <span className="total-time">{duration}</span>
                </div>
              </div>
            </div>
          }

          <h4 className="site__secondary_title">Notes</h4>
          <p className="site__description" dangerouslySetInnerHTML={{ __html: post.html }}></p>
          <div className="site__navigation">
            {previous && (
              <Link to={previous.fields.slug} rel="prev" className="site__navigation_items site__navigation_items--left">
                <label htmlFor="">Previous Episode</label>
                <h4>{previous.frontmatter.title}</h4>
              </Link>
            )}

            {next && (
              <Link to={next.fields.slug} rel="next" className="site__navigation_items site__navigation_items--right">
                <label htmlFor="">Next Episode</label>
                <h4>{next.frontmatter.title}</h4>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        episode
        image {
          childImageSharp {
            resize(width: 200, height: 300, cropFocus: CENTER) {
              src
            }
          }
        }
        audio
      }
    }
  }
`
