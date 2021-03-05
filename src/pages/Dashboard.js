import { Typography } from '@material-ui/core';
import React from 'react';
import { apiPaths } from '../api';
import { useChangeDocumentTitle, useFetch } from '../api/custom-hooks';
import MovieListDisplay from '../components/movie-list/MovieListDisplay';

const DashBoard = () => {
  useChangeDocumentTitle(null)

  const [{ data: response }] = useFetch([null, apiPaths.trending()], {
    cacheSession: 'trending-movie'
  })

  return (
    <>
      <MovieListDisplay list={response && response.results}
        title={<Typography className="text-center mb-3" variant="h2">Trending this week</Typography>} />
    </>
  )
}

export default DashBoard