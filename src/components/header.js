import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Typed from 'react-typed'

import headerStyles from './header.module.scss'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          <Typed 
            strings={[data.site.siteMetadata.title]}
            typeSpeed={40}
            showCursor={false}
          />
        </Link>
      </h1>
      <nav>
        <ul className={headerStyles.navList}>
          <li><Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/">Home</Link></li>
          <li><Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/about">About</Link></li>
          <li><Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/destinations">Destinations</Link></li>
        </ul>
      </nav>
    </header>
  )
} 

export default Header