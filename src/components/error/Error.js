import { Button, Typography } from '@material-ui/core'
import React from 'react'
import errorImg from '@assets/orange-sad.png'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="text-center py-3">
      <Typography variant="h2">We have to admit, something went wrong...</Typography>
      <div className="py-5">
        <img className="mx-auto" src={errorImg} alt=""/>
      </div>
      <footer>
        <Link to="/">
          <Button variant="contained" size="large" color="secondary" className="text-uppercase">Go home</Button>
        </Link>
      </footer>
    </div>
  )
}

export default Error
