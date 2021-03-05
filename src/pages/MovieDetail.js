import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChangeBackground, useChangeDocumentTitle, useFetch } from '../api/custom-hooks';
import MovieDetailDisplay from '../components/movie-detail/MovieDetailDisplay';
import Preloader from '../components/preloader/preloader';

const MovieDetail = () => {
  const { movieId } = useParams();

  const [{ data: movie, isLoading }, doFetch] = useFetch(null, {
    params: { 'append_to_response': 'credits' }
  });

  useEffect(() => {
    doFetch(movieId ? `movie/${movieId}` : null)
  }, [movieId])

  useChangeBackground(movie)
  useChangeDocumentTitle(movie && movie.title)

  if(isLoading) {
    return <Preloader />
  }

  return (
    <MovieDetailDisplay movie={movie} />
  )
}

export default MovieDetail
