import { Typography } from '@material-ui/core'
import React from 'react'
import { useChangeDocumentTitle } from '../api/custom-hooks'

function About() {
  useChangeDocumentTitle('About us')

  return (
    <div>
      <Typography className="mb-4" variant="h1">About</Typography>
      <Typography variant="subtitle1" variantMapping={{ 'subtitle1': 'p' }}>This is one of my weekend projects to practice React Hook API.</Typography>
    </div>
  )
}

export default About
