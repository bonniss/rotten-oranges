import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { CARD_ORIENTATION } from '../../app/app.const'
import MovieCard from './MovieCard'

const useVerticalStyles = makeStyles(theme => ({
  root: {
    display: 'block'
  },
  item: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '33.333%'
    },
    [theme.breakpoints.up('md')]: {
      width: '25%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%'
    },
  }
}))

function MovieListDisplay({ list, title, orientation, showIndex }) {
  if(!list) {
    return null
  }

  if(!orientation || orientation === CARD_ORIENTATION.VERTICAL) {
    const classes = useVerticalStyles()

    return (
      <React.Fragment>
        {title}
        <Box className={classes.root}>
        {
          list.map((movie, idx) => {
            return (
              <div className={classes.item} key={movie.id}>
                <MovieCard movie={movie} itemIdx={idx} orientation={orientation} showIndex={showIndex} />
              </div>
            )
          })
        }
        </Box>
      </React.Fragment>
    )
  }

  if(orientation === CARD_ORIENTATION.HORIZONTAL) {
    return (
      <React.Fragment>
        {title}
        {
          list.map((movie, idx) =>
            <MovieCard key={movie.id} movie={movie} itemIdx={idx} orientation={orientation} showIndex={showIndex} />)
        }
      </React.Fragment>
    )
  }

  return null
}

export default MovieListDisplay
