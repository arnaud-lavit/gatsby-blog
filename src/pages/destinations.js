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
    return edge.node.location
  })
  
  return (
    <Layout>
      <Head title="Destinations" />
      <Map cities={coords}/>
    </Layout>
  )
}

export default DestinationsPage