import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import Head from '../components/head'
import Layout from '../components/layout'
import Typed from 'react-typed'

import indexStyles from './index.module.scss'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost ( sort: { fields: publishedDate order: DESC }) {
        edges {
          node {
            title
            slug
            subtitle
            publishedDate(formatString: "MMMM Do, YYYY")
            picture {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `)
  
  return (
    <Layout>
      <Head title="Home" />
      <ol className={indexStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li key={edge.node.slug} className={indexStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>
                  <Typed 
                  strings={[edge.node.title]}
                  typeSpeed={50}
                  showCursor={false}
                  />
                </h2>
                <Typed
                  className={indexStyles.date}
                  strings={[edge.node.publishedDate]}
                  typeSpeed={50}
                  showCursor={false}
                />
                <div className={indexStyles.imgContainer}>
                  <Img className={indexStyles.img} fluid={edge.node.picture.fluid}/>
                  <p className={indexStyles.subtitle}>{edge.node.subtitle}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
      </Layout>
  )
}

export default IndexPage