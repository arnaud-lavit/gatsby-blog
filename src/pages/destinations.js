import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import Map from "../components/map"

const DestinationsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost {
        edges {
          node {
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
      city: edge.node.title
    }
  })
  return (
    <Layout>
      <Head title="Destinations" />
      <Map cities={coords}/>
    </Layout>
  )
}

export default DestinationsPage