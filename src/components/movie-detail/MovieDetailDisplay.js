import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { getPosterPath } from '../../api';
import MovieDetailHeader from './components/MovieDetailHeader';
import MovieDetailOverview from './components/MovieDetailOverview';
import MovieDetailPanel from './components/MovieDetailPanel';

import moviePlaceholder from '@assets/movie-placeholder.jpg';

const MovieDetailDisplay = ({ movie }) => {
  if(!movie) return null
  return (
    <>
      {
        movie && (
          <Paper elevation={3} style={{ overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, .85)' }}>
            <Grid container spacing={0}>
              <Box clone order={{ xs: 2, md: 1 }}>
                <Grid item xs={12} md={5}>
                  <img className="d-block w-100"
                    src={movie.poster_path ? getPosterPath(movie.poster_path) : moviePlaceholder} alt={movie.original_title}/>
                </Grid>
              </Box>
              <Box clone order={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={7}>
                  <div className="p-4">
                    <MovieDetailHeader movie={movie} />
                    <MovieDetailPanel movie={movie} className="my-4" />
                    <MovieDetailOverview movie={movie} className="mv-detail-body my-4" />
                  </div>
                </Grid>
              </Box>
            </Grid>
          </Paper>
        )
      }
    </>
  )
}

export default MovieDetailDisplay
