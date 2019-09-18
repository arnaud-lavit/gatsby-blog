import React from 'react'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/head'
import Layout from '../components/layout'
import Typed from 'react-typed'

import blogStyles from './blog.module.scss'
import { INLINES } from '@contentful/rich-text-types'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`

const Blog = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      },
      [INLINES.HYPERLINK]: node => {
        if((node.data.uri).includes("youtube.com/embed")) {
          const iframeTitle = node.data.uri.split('/').pop()
          return <span className={blogStyles.ytb}><iframe title={iframeTitle} src={node.data.uri}></iframe></span>
        }
      }
    }
  }
  
  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />
      <div className={blogStyles.container}>
        <h1 className={blogStyles.title}>
          <Typed
            strings={[props.data.contentfulBlogPost.title]}
            typeSpeed={50}
            showCursor={false}
          />
        </h1>
        <Typed
            className={blogStyles.date}
            strings={[props.data.contentfulBlogPost.publishedDate]}
            typeSpeed={50}
            showCursor={false}
          />
        {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
        {props.pageContext.prev &&
          <Link className={blogStyles.prev} to={props.pageContext.prev}>Précédent</Link>
        }
        {props.pageContext.next &&
          <Link className={blogStyles.next} to={props.pageContext.next}>Suivant</Link>
        }
      </div>   
    </Layout>
  )
}

export default Blog