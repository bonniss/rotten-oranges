import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(0),
    quotes: `"\\201C""\\201D""\\2018""\\2019"`,
    fontWeight: 'bold',
    '&::before': {
      top: 0,
      left: 0,
      lineHeight: '.5',
      opacity: '.4',
      color: theme.palette.secondary.main,
      content: 'open-quote',
      position: 'absolute',
      fontSize: '5em',
      fontFamily: 'Playfair Display',
    }
  },
  overview: {
    textAlign: 'justify',
    color: theme.palette.text.secondary,
    lineHeight: 1.5
  }
}))

const MovieDetailOverview = (({ movie, className }) => {
  const classes = useStyles()

  const {
    tagline,
    overview
  } = movie;

  return (
    <section className={className}>
      <div className="mb-2">
        {
          tagline && <Box className={classes.root} color="secondary.main" fontStyle="italic">
            <Typography variant="subtitle1">{tagline}</Typography>
          </Box>
        }
        <Typography variant="subtitle1" component="p" className={classes.overview}>{overview}</Typography>
      </div>
    </section>
  )
})

export default MovieDetailOverview