export const toType = val => typeof val

export const toRawType = val => Object.prototype.toString.call(val).slice(8, -1)

export const isArray = val => Array.isArray(val)

export const isUndefined = val => val === undefined

export const isNull = val => val === null

export const isEmptyString = val => val === ''

export const isUndefinedOrNull = val => isUndefined(val) || isNull(val)

export const isUndefinedOrNullOrEmpty = val => isUndefinedOrNull(val) || isEmptyString(val)

export const isFunction = val => toType(val) === 'function'

export const isBoolean = val => toType(val) === 'boolean'

export const isString = val => toType(val) === 'string'

export const isNumber = val => toType(val) === 'number'

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val)

export const isRegExp = val => toRawType(val) === 'RegExp'

export const isDate = val => val instanceof Date

export const isPromise = val =>
  !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch)
