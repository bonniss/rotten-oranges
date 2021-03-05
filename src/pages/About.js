import { Grid, Typography } from '@material-ui/core';
import { Facebook, Github, Twitter } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useChangeDocumentTitle } from '../api/custom-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    '& p': {
      marginBottom: '.5em'
    }
  },
  socialItem: {
    display: 'flex',
    alignItems: 'center'
  },
  primary: {
    color: theme.palette.primary.main
  }
}))

function About() {
  const classes = useStyles()

  useChangeDocumentTitle('About us')

  return (
    <div className={classes.root}>
      <Typography className="mb-4" variant="h1">About</Typography>
      <Typography variant="subtitle1" variantMapping={{ 'subtitle1': 'p' }}>
        This is one of my weekend projects to practice React Hook API.
        <a className={classes.primary} target="_blank" rel="noreferrer" href="https://github.com/bonniss/rotten-oranges"> Fork me on Github.</a>
      </Typography>
      <Typography variant="subtitle1" variantMapping={{ 'subtitle1': 'p' }}>
        You can contact me on:
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <p className={classes.socialItem}>
            <Github className="mr-2" />
            <a target="_blank" rel="noreferrer" href="https://github.com/bonniss">Github</a>
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <p className={classes.socialItem}>
            <Twitter className="mr-2" />
            <a target="_blank" rel="noreferrer" href="https://twitter.com/duytrung26">Twitter</a>
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <p className={classes.socialItem}>
            <Facebook className="mr-2" />
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/trung.duypham/">Facebook</a>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

export default About
