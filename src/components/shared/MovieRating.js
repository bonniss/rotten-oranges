import { Typography } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Star } from '@material-ui/icons';
import React from 'react';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  icon: {
    color: yellow[700],
    marginRight: theme.spacing(1)
  },
  content: {
    lineHeight: 1.75
  }
}))

function MovieRating({ voteAverage, voteCount }) {
  const classes = useStyles()

  return (
    voteCount && <div className={classes.root}>
      <Star className={classes.icon} />
      <Typography className={classes.content} variant="body1">{voteAverage} ({voteCount.toLocaleString('en')})</Typography>
    </div>
  )
}

export default MovieRating
