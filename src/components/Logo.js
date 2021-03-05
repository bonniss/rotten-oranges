import React from 'react'
import logoPath from '@assets/logo_text.png'
import logoGlowPath from '@assets/logo_text_stroke.png'
import { APP_NAME } from '../app/app.const'

function Logo({ isGlow, height }) {
  return (
    <div className="app-logo">
      <img src={isGlow ? logoGlowPath : logoPath} alt={APP_NAME} style={{height: height || 'auto'}}/>
    </div>
  )
}

export default Logo
