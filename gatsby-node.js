const path = require('path')

module.exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/blog.js')
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  
  const posts = res.data.allContentfulBlogPost.edges
  posts.forEach((edge, index) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        prev: index === 0 ? null : `/blog/${posts[index - 1].node.slug}`,
        next: index === (posts.length - 1) ? null : `/blog/${posts[index + 1].node.slug}`
      }
    })
  })
}