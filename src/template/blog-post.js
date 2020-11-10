import "katex/dist/katex.min.css"
import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo.js"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Container } from "react-bootstrap"

const PostTemplate = ({ data }) => {
  const post = data.mdx
  var contentType = post.frontmatter.type
  if (contentType === "newsletter") {
    return (
      <Layout>
        <SEO title={post.frontmatter.title} />
        <Container className="newsletter">
          <center>
            <Container fluid className="newsletter-title-container">
              <h1 className="newsletter-title">{post.frontmatter.title}</h1>
              <div className="newsletter-metadata">
                {post.timeToRead === 1 ? (
                  <span className="timeToRead">{post.timeToRead} min</span>
                ) : (
                  <span className="timeToRead">{post.timeToRead} mins</span>
                )}
              </div>
            </Container>
          </center>

          {/* <hr /> <br /> */}
          <Container className="newsletter-body">
            <MDXRenderer>{post.body}</MDXRenderer>
          </Container>
        </Container>
      </Layout>
    )
  } else {
    // document.body.style.backgroundColor = "rgb(255, 25, 255)"
    const tagArray = data.mdx.frontmatter.tags
    return (
      <Layout>
        <SEO title={post.frontmatter.title} />
        <Container className="article">
          <center>
            <Container className="article-title-container">
              <h1 className="article-title">{post.frontmatter.title}</h1>
              <div className="article-metadata">
                <p className="tagArray">
                  {tagArray.map(tagItem => (
                    <Link
                      key={tagItem}
                      className="tagItem"
                      to={`/tags/${tagItem}`}
                    >
                      {tagItem}
                    </Link>
                  ))}
                </p>
                {post.timeToRead === 1 ? (
                  <span className="timeToRead">{post.timeToRead} min</span>
                ) : (
                  <span className="timeToRead">{post.timeToRead} mins</span>
                )}
              </div>
            </Container>
          </center>
          {/* <hr /> <br /> */}
          <Container className="article-body">
            <MDXRenderer>{post.body}</MDXRenderer>
          </Container>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      timeToRead
      body
      frontmatter {
        title
        tags
        type
      }
    }
  }
`

export default PostTemplate
