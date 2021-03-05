import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import debounce from 'lodash.debounce';
import { getPosterPath, http, posterSize } from '../../api';
import moviePlaceholder from '@assets/movie-placeholder.jpg'
import { Typography } from '@material-ui/core';
import { apiPaths } from '../../api'

const filter = createFilterOptions();
const WAIT = 550;

const SearchInput = ({ width }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([])
  const [keyword, setKeyword] = useState(null)
  const [totalResults, setTotalResults] = useState(null)

  const loading = open && !!keyword && totalResults == null;
  const history = useHistory()

  useEffect(() => {
    setTotalResults(null)
    searchByKeyword(keyword, (data, localKeyword) => {
      if(data && localKeyword === keyword) {
        const { total_results, results } = data;
        setOptions(total_results > 10 ? results.slice(0, 5) : results)
        setTotalResults(total_results)
      }
    })
  }, [keyword])

  const searchByKeyword = useMemo(() => debounce((kw, callback) => {
    kw && kw.length > 1 && http('search/movie', {
      query: encodeURIComponent(kw)
    }).then(data => callback(data, kw))
  }, WAIT), [])

  const handleInputChange = (evt, newVal) => {
    !newVal && setOptions([])

    // when press enter, this is triggered first
    // then handleAutocompleteChange
    // only set new keyword if `evt` is InputEvent, not MouseEvent or pressing `Enter`
    !('clientX' in evt || 'charCode' in evt) && setKeyword(newVal)
  }

  const getOptionLabel = (option) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }

    // Regular option
    return option ? option.original_title : '';
  }

  const handleAutocompleteChange = (evt, newVal) => {
    newVal && newVal.id && history.push(apiPaths.movie(newVal.id))
  }

  const renderOption = opt => {
    const {
      poster_path,
      original_title,
      release_date,
      id
    } = opt

    return (
      <Link to={apiPaths.movie(id)} className="search-result-option text-dark">
        <div className="d-flex">
          <div className="autocomplete-option__poster" style={{ minWidth: '3rem', width: '3rem' }}>
            <img className="w-100" src={poster_path ? getPosterPath(poster_path, posterSize[92]) : moviePlaceholder} alt={original_title}/>
          </div>
          <div className="autocomplete-option__text px-3 py-2">
            <Typography variant="h6" className="m-0 font-weight-bold">{original_title}</Typography>
            {
              release_date ? <p className="m-0">{release_date.slice(0, 4)}</p> : null
            }
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="main-searchbar-wrapper" style={{ width: width || '100%' }}>
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={handleInputChange}
        onChange={handleAutocompleteChange}
        getOptionLabel={getOptionLabel}
        handleHomeEndKeys
        options={options}
        renderOption={renderOption}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        autoHighlight
        filterSelectedOptions
        loading={loading}
        loadingText="Searching..."
        renderInput={(params) => (
          <TextField {...params}
            placeholder="🔎 Search Rotten Oranges"
            autoFocus
            color="primary"
            margin="normal"
            variant="outlined"
            className="bg-white rounded py-0 my-0"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }} />
        )}
      />
    </div>
  )
}

export default SearchInput
