import useLocalstorage from '@rooks/use-localstorage';
import useSessionstorage from '@rooks/use-sessionstorage';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPosterPath, http, posterSize } from '.';
import { useGlobalContext } from '../app/context';

export const useFetch = (initials = [], options = {
  cacheSession: null,
  params: null,
}) => {
  const { params, cacheSession, cacheLocal } = options || {};
  const [sessionData, setSession] = useSessionstorage(cacheSession, null)
  const [localData, setLocal] = useLocalstorage(cacheLocal, null)

  const [initialData, initialUrl] = initials || [];

  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [queryParams, setQueryParams] = useState(params)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
    setIsLoading(true)

    const fetchData = async () => {
      try {
        if (cacheSession && sessionData) {
          setData(sessionData)
        } else if(cacheLocal && localData) {
          setData(localData)
        } else {
          const data = await http(url, queryParams)
          console.log('🚀 ~ file: custom-hooks.js ~ line 37 ~ fetchData ~ data', data, queryParams)
          setData(data)
          cacheSession && setSession(data)
          cacheLocal && setLocal(data)
        }
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    url && fetchData()
  }, [url, queryParams])

  return [{ data, isLoading, isError }, setUrl, setQueryParams]
}

export const useChangeBackground = movie => {
  const { changeBackground } = useGlobalContext()

  useEffect(() => {
    const { backdrop_path } = movie || {};
    changeBackground(backdrop_path ? `linear-gradient(217deg, rgba(0,0,0,.4), rgba(0,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(0,0,0,.5), rgba(0,0,0,0) 70.71%),
      linear-gradient(336deg, rgba(0,0,0,.6), rgba(0,0,0,0) 70.71%),
      url(${getPosterPath(backdrop_path, posterSize.original)})` : null)
  }, [movie])
}

export const useChangeDocumentTitle = title => {
  const { changeDocumentTitle } = useGlobalContext()

  useEffect(() => {
    changeDocumentTitle(title)
  }, [title])
}

// Skip the `didMount` render
// componentDidUpdate alternative in function
// Ref: https://stackoverflow.com/a/53180013/6755585
export const useDidUpdate = (fn, inputs) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if(didMountRef.current) {
      fn()
    } else {
      didMountRef.current = true
    }
  }, inputs)
}

export const useQuery = () => new URLSearchParams(useLocation().search)
