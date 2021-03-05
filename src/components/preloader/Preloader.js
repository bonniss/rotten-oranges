import React from 'react'
import preloaderPath from '@assets/preloader.svg';

function Preloader() {
  return (
    <div className="text-center py-5">
      <img src={preloaderPath} alt="Loader"/>
    </div>
  )
}

export default Preloader
