import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'

class BlogIndex extends React.Component {
  render() {
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const formatIndex = index => index / 10 >= 1 ? index : `0${index}`

    return (
      <div>
        <section className="episodes">
        {posts.map(({ node }, index) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const description = get(node, 'frontmatter.description')

          return (
            <article className="episode" key={node.fields.slug}>
              <h2 className="episode__number">{formatIndex(index + 1)}</h2>

              <div className="episode__media">
                <Link to={node.fields.slug} className="episode__image"></Link>
              </div>

              <div className="episode__detail">
                <Link to={node.fields.slug} className="episode__title"><h4>{title}</h4></Link>
                <p className="episode__description">{description}</p>
              </div>
            </article>
          )
        })}
        </section>

        <section className="site">
          <h1 className="site__title site__title--separator">{siteMetadata.title}</h1>
          <p className="site__description">{siteMetadata.description}</p>
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
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
