import React from 'react'
import { APP_NAME, DEFAULT_TITLE } from './app.const';

export const defaultBackground = '';

export const initialState = {
  title: DEFAULT_TITLE,
  mainBackground: defaultBackground,
}

export const APP_ACTIONS = {
  CHANGE_BACKGROUND: 'CHANGE_BACKGROUND',
  RESET_BACKGROUND: 'RESET_BACKGROUND',
  CHANGE_TITLE: 'CHANGE_TITLE'
}

export function reducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.CHANGE_BACKGROUND: {
      return {
        ...state,
        mainBackground: action.payload || defaultBackground
      }
    }

    case APP_ACTIONS.CHANGE_TITLE: {
      return {
        ...state,
        title: action.payload ? `${action.payload} | ${APP_NAME}` : DEFAULT_TITLE
      }
    }

    default:
      return state
  }
}

export const useAppReducer = () => {
  return React.useReducer(reducer, initialState)
}