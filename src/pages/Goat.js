import { Box, Button, Divider, Drawer, IconButton, Paper, Tab, Tabs, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronLeftRounded, FilterList, ViewList, ViewModule } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { apiPaths } from '../api'
import { useChangeDocumentTitle, useDidUpdate, useFetch, useQuery } from '../api/custom-hooks'
import { CARD_ORIENTATION } from '../app/app.const'
import Filters from '../components/filters/Filters'
import MovieListInfinite from '../components/movie-list/MovieListInfinite'
import { lowerCase } from '../utils/string'
import { isBoolean } from '../utils/types'

const GoatContext = React.createContext()
export const useGoatContext = () => {
  return useContext(GoatContext)
}

const useDrawerStyles = makeStyles({
  list: {
    width: 550,
  },
  fullList: {
    width: 'auto',
  },
});

const FiltersDrawer = ({ anchor }) => {
  const { openDrawer: open, toggleDrawer: toggle } = useGoatContext()

  const drawerClasses = useDrawerStyles()
  const contextValue = useGoatContext()
  const { filterActive } = contextValue

  const handleClickFilterButton = () => {
    toggle(true)
  }

  return (
    <React.Fragment>
      <Tooltip title={ filterActive ? 'Filtering is on' : 'Filter list' }>
        <Button onClick={handleClickFilterButton}>
          <Box clone color={filterActive ? 'info.main' : 'text.primary'}>
            <FilterList />
          </Box>
        </Button>
      </Tooltip>
      <Drawer anchor={anchor || 'right'}
        elevation={20}
        transitionDuration={550}
        open={open}
        onClose={() => toggle(false)}>
        <header className="text-right">
          <IconButton onClick={() => toggle(false)}>
            <ChevronLeftRounded />
          </IconButton>
        </header>
        <Divider />
        <div className={drawerClasses.list}>
          <Filters providerValue={contextValue} />
        </div>
      </Drawer>
    </React.Fragment>
  )
}

const MenuBar = ({ onChangeView }) => {
  const { openDrawer, toggleDrawer } = useGoatContext()

  return (
    <Paper elevation={1} className="p-2 mb-4">
      <Box display="flex" justifyContent="space-between">
        <Box className="left-col">
          <Tooltip title="View grid">
            <Button onClick={() => onChangeView(CARD_ORIENTATION.VERTICAL)}>
              <ViewModule />
            </Button>
          </Tooltip>
          <Tooltip title="View list">
            <Button onClick={() => onChangeView(CARD_ORIENTATION.HORIZONTAL)}>
              <ViewList />
            </Button>
          </Tooltip>
        </Box>
        <Box className="right-col">
          <FiltersDrawer anchor="left"
            open={openDrawer}
            toggle={toggleDrawer} />
        </Box>
      </Box>
    </Paper>
  )
}


function a11yTabProps(idx) {
  return {
    id: `scrollable-auto-tab-${idx}`,
    'aria-controls': `scrollable-auto-tabpanel-${idx}`,
  };
}
const GenreTabs = ({ list, loading, current, onChange }) => (
  <Tabs value={current}
    className="mb-4"
    onChange={onChange}
    indicatorColor="secondary"
    textColor="secondary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="genre list">
    {
      list.map(
        ({ id, name }, idx) => <Tab key={id} label={name} {...a11yTabProps(idx)} disabled={loading} />
      )
    }
  </Tabs>
)

const ResultInfo = ({ className, total, hints }) => (
  <Alert className={className} severity="info">
    <AlertTitle>{total} results</AlertTitle>
    {hints}
  </Alert>
)

const PageHeader = () => (
  <header className="mb-4">
    <Typography variant="h2" component="h1">Greatest movies of all/your time</Typography>
    <Box clone color="text.secondary">
      <Typography variant="subtitle1">Explore spectacular movies at your finger tips by our powerful filters</Typography>
    </Box>
  </header>
)

/*********************
 * PARENT COMPONENT
*********************/
const fixedParams = {
  'sort_by': 'vote_average.desc',
  'page': 1,
}

const initialFilterable = {
  'include_adult': false,
  'vote_count.gte': 4000,
}

function Goat() {
  useChangeDocumentTitle('Greatest Movies of All Time')
  const urlQuery = useQuery()

  const genreList = useRef([])

  const totalPages = useRef(0)
  const totalResults = useRef(0)
  const filterSpecs = useRef(null)

  const [orientation, setOrientation] = useState(CARD_ORIENTATION.VERTICAL)
  const [filterableParams, setFilterableParams] = useState(initialFilterable);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [page, setPage] = useState(1)
  const [genreIdx, setGenreIdx] = useState(0)
  const [movies, setMovies] = useState([])

  const [{ data: genreResp }] = useFetch([null, apiPaths.genreList()], {
    cacheLocal: 'movie-genre-list'
  })

  const [{ data: movieResp, isLoading }, setUrl, setParams] = useFetch([null, apiPaths.discover()], {
    params: {
      ...fixedParams,
      ...filterableParams
    },
  })

  // TODOS
  // lấy danh sách genre về
  // xác định genre ban đầu
  // tìm movies theo genre nếu có
  useEffect(() => {
    if(genreResp) {
      genreList.current = [
        {
          id: -999,
          name: 'All Genres'
        },
        ...genreResp.genres
      ]

      const qGenre = urlQuery.get('genre')
      if(qGenre) {
        const idx = genreList.current.findIndex(({ name }) => lowerCase(name) === lowerCase(qGenre))
        if(idx > 0) {
          // const { id: genreId } = genreList.current[idx]
          // setFilterableParams(old => ({
          //   ...old,
          //   'with_genres': genreId < 0 ? null : genreId
          // }))
          // setCurrentGenre(idx)
          handleGenreTabChange(null, idx)
        }
      }
    }
  }, [genreResp])

  useEffect(() => {
    if(movieResp) {
      const { page: currentPage, results, total_pages, total_results } = movieResp;
      totalPages.current = total_pages
      totalResults.current = total_results
      setPage(currentPage)
      setMovies(oldVal => movieResp ? (oldVal && oldVal.length ? oldVal.concat(results) : results) : [])
    }
  }, [movieResp])

  useDidUpdate(() => {
    setMovies([])
    setParams({
      ...fixedParams,
      ...filterableParams
    })

  }, [filterableParams])

  const toggleDrawer = bool => setOpenDrawer(bool)

  const handleChangeOrientation = val => setOrientation(val)

  const handleFetchNextPage = nextPage => {
    if(nextPage !== page) {
      setParams({
        ...fixedParams,
        ...filterableParams,
        page: nextPage
      })
    }
  }

  const handleGenreTabChange = (evt, tabIdx) => {
    const { id: genreId } = genreList.current[tabIdx]
    setFilterableParams(old => ({
      ...old,
      'with_genres': genreId < 0 ? null : genreId
    }))
    setGenreIdx(tabIdx)
  }

  const handleApplyFilters = paramData => {
    toggleDrawer(false)
    if(paramData) {
      paramData['with_genres'] = genreIdx === 0 ? null : genreList.current[genreIdx].id
      setFilterActive(true)
      setFilterableParams(paramData)
    }
  }

  const handleClearFilters = () => {
    toggleDrawer(false)
    setFilterActive(false)
    setFilterableParams(initialFilterable)
  }

  const makeFilterHint = () => {
    let text = []

    for (const key in filterableParams) {
      if (Object.hasOwnProperty.call(filterableParams, key)) {
        const val = filterableParams[key];
        if(val != null) {
          let keyText = key.replace(/[^a-z]/g, ' ')
            .replace('gte', '≥')
            .replace('lte', '≤')
            .replace('runtime', 'duration')

          if(isBoolean(val) && val) {
            text.push(keyText)
          } else {
            if(keyText.endsWith('genres')) {
              text.push(`${keyText} ${genreList.current[genreIdx].name}`)
            } else {
              text.push(`${keyText} ${val}`)
            }
          }
        }
      }
    }

    return text.join('; ')
  }

  const props = {
    list: movies,
    currentPage: page,
    totalPages: totalPages.current,
    orientation,
    fetchData: handleFetchNextPage,
  }

  return (
    <GoatContext.Provider value={{
      filterSpecs,
      filterActive,
      handleApplyFilters,
      handleClearFilters,
      openDrawer,
      toggleDrawer
    }}>
      <PageHeader />
      <MenuBar onChangeView={handleChangeOrientation} />
      <GenreTabs list={genreList.current}
        loading={isLoading}
        current={genreIdx}
        onChange={handleGenreTabChange} />
      {
        !isLoading && filterActive &&
          <ResultInfo className="my-3" total={totalResults.current} hints={makeFilterHint()} />
      }
      <MovieListInfinite {...props} />
    </GoatContext.Provider>
  )
}

export default Goat
