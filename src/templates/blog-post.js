import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div className="site no-padding row-wrapper page--detail">
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

        <div className="left">
          <label htmlFor="" className="site__label">Episode #{post.frontmatter.episode}</label>
          <h1 className="site__title site__title--separator">Linda Watkins</h1>
        </div>

        <div className="right">
          <img src="assets/images/photos/original/1.png" alt="" className="episode__image" />
          <div className="audio-player site__playbar">
            <div className="loading">
              <div className="spinner"></div>
            </div>
            <button className="play-pause-btn play"></button>
            <div className="controls">
              <span className="current-time">0:00</span>
              <div className="slider" data-direction="horizontal">
                <div className="progress">
                  <div className="pin" id="progress-pin" data-method="rewind"></div>
                </div>
              </div>
              <span className="total-time">0:00</span>
            </div>

            <audio preload="true">
              <source src="assets/audio/example.ogg" type="audio/ogg" />
              <source src="assets/audio/example.mp3" type="audio/mpeg" />
            </audio>
          </div>

          <h4 className="site__secondary_title">Show Notes</h4>
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

        {/* <h1>{post.frontmatter.title}</h1>
        <p>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul> */}
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
      }
    }
  }
`
