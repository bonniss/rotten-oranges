import React from 'react'
import preloaderPath from '@assets/infinite-loader.svg';

function InfiniteLoader() {
  return (
    <div className="text-center py-2">
      <img src={preloaderPath} alt="Loader"/>
    </div>
  )
}

export default InfiniteLoader
