import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteLoader from '../preloader/InfiniteLoader';
import MovieListDisplay from './MovieListDisplay';

function MovieListInfinite({ title, list, fetchData, currentPage, totalPages, orientation }) {
  if(!list) {
    return null
  }

  return (
    <React.Fragment>
      {title}
      <InfiniteScroll
        dataLength={list.length}
        next={() => fetchData(currentPage + 1)}
        hasMore={currentPage < totalPages}
        loader={<InfiniteLoader />}>
        <MovieListDisplay title={title} list={list} orientation={orientation} showIndex />
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default MovieListInfinite
