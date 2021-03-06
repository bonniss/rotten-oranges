import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import React from 'react';
import { Link } from 'react-router-dom';
import { apiPaths, getPosterPath, posterSize } from '../../api';
import { CARD_ORIENTATION } from '../../app/app.const';
import MovieRating from '../shared/MovieRating';

const useVerticalStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 225
  },
  media: {
    height: 342,
  },
  title: {
    minHeight: '3em'
  },
  orderNumber: {
    fontWeight: 'bold'
  }
}));

const hozPosterWidth = 154;
const useHorizontalStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '20%',
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    color: theme.palette.secondary.main,
    fontSize: '3em'
  },
  details: {
    display: 'flex',
    flex: '8 1 auto',
    flexDirection: 'column',
  },
  cover: {
    width: hozPosterWidth,
  },
  overview: {
    maxWidth: '32rem',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontStyle: 'italic',
    textAlign: 'justify'
  }
}));

const createHozStyleObject = (backdrop_path, itemIdx) => {
  const isEven = itemIdx % 2 === 0;

  const clvHigh = isEven ? 'rgba(255, 255, 255, 1)' : 'rgba(240, 240, 240, 1)'
  const clvMid = isEven ? 'rgba(255, 255, 255, .78)' : 'rgba(240, 240, 240, .8)'
  const clvLow = isEven ? 'rgba(255, 255, 255, .6)' : 'rgba(240, 240, 240, .6)'
  return backdrop_path ? {
    backgroundImage: `linear-gradient(217deg, ${clvMid}, ${clvLow} 36.5%, ${clvHigh} 71.5%),
          url(${getPosterPath(backdrop_path)})`
  } : null
}

function MovieCard({ movie, orientation, itemIdx, showIndex }) {
  if(!movie) {
    return null
  }

  const {
    id,
    original_title,
    title,
    release_date,
    vote_average,
    vote_count,
    poster_path,
    backdrop_path,
    overview,

  } = movie;

  if(!orientation || orientation === CARD_ORIENTATION.VERTICAL) {
    const classes = useVerticalStyles();

    return (
      <Card className={classes.root}>
        <CardActionArea>
          {(showIndex && itemIdx != null) && <CardHeader title={<Box className={classes.orderNumber}>#{itemIdx + 1}</Box>} />}
          <Link to={apiPaths.movie(id)}>
            <CardMedia className={classes.media}
              image={getPosterPath(poster_path, posterSize[342])}
              title={original_title} />
            <CardContent>
              <div className={`mb-1 ${vote_count ? '' : 'invisible'}`}>
                <MovieRating voteAverage={vote_average} voteCount={vote_count} />
              </div>
              <Typography className={classes.title} variant="h6" component="h2">
                {title}
                {
                  (title !== original_title) && <span className="ml-2">
                    [{original_title}]
                  </span>
                }
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }

  if(orientation === CARD_ORIENTATION.HORIZONTAL) {
    const classes = useHorizontalStyles()

    return (
      <Card key={id} className={classes.root} style={createHozStyleObject(backdrop_path, itemIdx)}>
        <CardActionArea className={classes.actionArea}>
          {showIndex && (itemIdx != null) && <CardHeader title={<span className={classes.orderNumber}>{itemIdx + 1}</span>} />}
          <div className={classes.details}>
            <CardContent>
              <Link to={apiPaths.movie(id)} title="View detail">
                <Typography variant="h4">
                  {title}
                  {
                    (title !== original_title) && <span className="ml-2">
                      [{original_title}]
                    </span>
                  }
                  {
                    release_date && <span className="ml-2">
                      ({release_date.slice(0, 4)})
                    </span>
                  }
                </Typography>
              </Link>
              <MovieRating voteAverage={vote_average} voteCount={vote_count} />
              <Typography className={classes.overview} variant="body1" component="p">
                {overview}
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            component="img"
            className={classes.cover}
            image={getPosterPath(poster_path, posterSize[hozPosterWidth])}
            title={original_title}
          />
        </CardActionArea>
      </Card>
    )
  }

  return null
}

export default MovieCard
