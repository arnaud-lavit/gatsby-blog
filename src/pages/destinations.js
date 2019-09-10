import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import Map from '../components/map'
import destinationsStyles from './destinations.module.scss'

const DestinationsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            title
            location {
              lon
              lat
            }
          }
        }
      }
    }
  `)
  
  const coords = data.allContentfulBlogPost.edges.map(edge => {
    return {
      coordinates: edge.node.location,
      city: edge.node.title,
      link: edge.node.slug
    }
  })
  return (
    <Layout>
      <Head title="Destinations" />
      <Map className={destinationsStyles.map} cities={coords}/>
    </Layout>
  )
}

export default DestinationsPage