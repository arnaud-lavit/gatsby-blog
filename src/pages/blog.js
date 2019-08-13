import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Head from '../components/head'
import Layout from '../components/layout'
import blogStyles from './blog.module.scss'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost ( sort: { fields: publishedDate order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(fromNow:true)
          }
        }
      }
    }
  `)
  
  return (
    <Layout>
      <Head title="Blog" />
      <ol className={blogStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
                <p>{edge.node.publishedDate}</p>
              </Link>
            </li>
          )
        })}
      </ol>
      </Layout>
  )
}

export default BlogPage