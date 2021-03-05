export const isObject = obj => obj !== null && typeof obj === 'object'

export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
