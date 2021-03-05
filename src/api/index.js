import { ENV } from '../../environment'
import { isPlainObject } from '../utils/object'

export const apiPaths = {
  movie: id => `/movies/${id}`,
  trending: (mediaType = 'movie', period = 'week') => `/trending/${mediaType}/${period}`,
  discover: (mediaType = 'movie') => `/discover/${mediaType}`,
  genreList: (mediaType = 'movie') => `/genre/${mediaType}/list`,
}

export const joinPath = (...args) => {
  return args.map((part, i) => {
    if (i === 0) {
      return part.trim().replace(/[/]*$/g, '')
    } else {
      return part.trim().replace(/(^[/]*|[/]*$)/g, '')
    }
  }).filter(x=>x.length).join('/')
}

export const fetcher = (...args) => fetch(...args).then(t => t.json())

const bearer = 'Bearer ' + ENV.bearerToken
const dfOptions = {
  method: 'GET',
  withCredentials: true,
  headers: {
    'Authorization': bearer,
    'Content-Type': 'application/json'
  }
}

export const http = (path, query = null, options = dfOptions) => {
  let params = []

  if(isPlainObject(query)) {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const val = query[key];
        (val != null) && params.push(`${key}=${val}`)
      }
    }
  }

  const url = joinPath(ENV.apiUrl, path + (params.length ? ('?' + params.join('&')) : ''))
  let finalOptions = options
  if(options && options !== dfOptions) {
    finalOptions = {
      ...dfOptions,
      ...options
    }

    if(options.headers) {
      finalOptions.headers = {
        ...dfOptions.headers,
        ...options.headers
      }
    }
  }

  return fetcher(url, finalOptions)
}

export const posterSize = {
  '92': 'w92',
  '154': 'w154',
  '185': 'w185',
  '342': 'w342',
  '500': 'w500',
  '780': 'w780',
  original: 'original'
}

export const getPosterPath = (path, width = posterSize[500]) => {
  return path ? joinPath(ENV.imgApiUrl, 'p', width, path) : null
}