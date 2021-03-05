import { Chip, Typography } from '@material-ui/core';
import React from 'react';
import MovieRating from '../../shared/MovieRating';

const MovieDetailHeader = (({ movie, className }) => {
  const {
    original_title,
    title,
    vote_average,
    vote_count,
    genres,
  } = movie;

  return (
    <header className={className}>
      <Typography variant="h1" className="text-dark mb-1">
        {title}
        {(original_title !== title) && <span className="ml-2">[{original_title}]</span>}
      </Typography>
      <div className="mb-2 mv-detail__genres">
        {
          genres && genres.map(genre => (
            <Chip key={genre.id}
                  className="mr-2"
                  label={genre.name}
                  color="default"
                  size="small" />
          ))
        }
      </div>
      <MovieRating voteAverage={vote_average} voteCount={vote_count} />
    </header>
  )
})

export default MovieDetailHeader