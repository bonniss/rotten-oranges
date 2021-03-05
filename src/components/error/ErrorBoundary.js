import React, { Component } from 'react'
import Error from './Error'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  componentDidCatch(err, errInfo) {
    console.log('🚀 ~ file: ErrorBoundary.js ~ line 18 ~ ErrorBoundary ~ componentDidCatch ~ err, errInfo', err, errInfo)
  }

  render() {
    if(this.state.hasError) {
      return <Error />
    }

    return this.props.children
  }
}
