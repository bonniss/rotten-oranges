import { isPlainObject } from './object'
import { isArray, isUndefinedOrNull } from './types'

export const toString = (val, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, spaces)
      : String(val)
}

// Lower case a string
export const lowerCase = str => toString(str).toLowerCase()

// Upper case a string
export const upperCase = str => toString(str).toUpperCase()