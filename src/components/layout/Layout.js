import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from './Navbar';

const Layout = (({ children }) => (
    <Container className="py-2">
      <Navbar />
      <main>{children}</main>
    </Container>
  )
)

export default Layout