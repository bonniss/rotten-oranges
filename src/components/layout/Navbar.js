import { Box, Button, Container } from '@material-ui/core'
import React from 'react'
import Logo from '../Logo'
import SearchInput from '../search-input/SearchInput'
import { NavLink } from 'react-router-dom'

const navLinks = [
  {
    to: '/',
    label: 'Trending'
  },
  {
    to: '/greatest-of-all-time',
    label: 'G.O.A.T'
  },
  {
    to: '/about',
    label: 'About'
  },
];

const Navbar = ({ handleOptionSelect }) => {
  return (
    <nav className="main-nav py-3">
      <Container>
        <Box display="flex"
              justifyContent="space-between"
              alignItems="center">
          <Box className="left-col" display="flex"
            justifyContent="flex-start"
            alignItems="center">
            <div className="nav-brand mr-3">
              <NavLink to="/">
                <Logo isGlow height="4rem" />
              </NavLink>
            </div>
            <div className="wrapper" style={{width: '30rem'}}>
              <SearchInput onChange={handleOptionSelect}/>
            </div>
          </Box>
          <Box className="right-col">
            <ul className="nav-menu">
              {
                navLinks.map(({ to, label }, idx) => <li key={idx}>
                  <NavLink to={to}>
                    <Button size="large" color="primary">{label}</Button>
                  </NavLink>
                </li>)
              }
            </ul>
          </Box>
        </Box>
      </Container>
    </nav>
  )
}

export default Navbar
