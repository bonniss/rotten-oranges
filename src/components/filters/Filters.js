import { Box, Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { isArray } from '../../utils/types'
import NumberRange from './components/NumberRange'


const currentYear = new Date().getFullYear()
const filtersDesc = {
  'General': [
    {
      label: 'Include adult movies',
      key: 'include_adult',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      label: 'Duration (mins)',
      key: 'with_runtime',
      type: 'number_range',
      defaultValue: [80, 150],
      options: {
        min: 10,
        max: 300,
        step: 10
      }
    }
  ],
  // 'Region & Language': [
  //   {
  //     label: 'Region',
  //     key: 'region',
  //     type: 'select'
  //   },
  //   {
  //     label: 'Language',
  //     key: 'language',
  //     type: 'select'
  //   },
  // ],
  'Release Date': [
    {
      label: 'Release Year',
      key: 'primary_release_date',
      type: 'number_range',
      defaultValue: [currentYear - 3, currentYear],
      options: {
        min: 1900,
        max: currentYear,
        step: 1,
        keyWhenEquals: 'primary_release_year',
      }
    },
  ],
  'Rating': [
    {
      label: 'Vote average',
      key: 'vote_average',
      type: 'slider',
      defaultValue: [7, 9],
      options: {
        min: 0,
        max: 10,
        step: .1,
        marks: [2, 5, 7, 8, 9].map(item => ({
          value: item,
          label: null
        })),
        valueLabelDisplay: 'on'
      }
    },
    {
      label: 'Minimum Vote count',
      key: 'vote_count.gte',
      type: 'slider',
      defaultValue: 4000,
      options: {
        min: 500,
        max: 30000,
        step: 500,
        marks: [4000, 10000, 15000, 20000, 25000].map(item => ({
          value: item,
          label: null
        })),
        valueLabelDisplay: 'on'
      }
    },
  ],
  // TODOS: with_cast
}
const filterSections = Object.keys(filtersDesc)

const Section = ({ content, value, onChange, label }) => <React.Fragment>
  <Typography variant="h5">{label}</Typography>
  <Box px={2} py={1}>
    {
      content.map(({ label, key, type, options, defaultValue }) => {
        switch (type) {
          case 'checkbox':
            return <div key={key}>
              <FormControlLabel control={<Checkbox checked={value[key] != null ? value[key] : defaultValue} onChange={evt => onChange(evt, null, key, type)} name={key} />} label={label} />
            </div>

          case 'number_range':
            return (
              <NumberRange key={key}
                operators
                label={label}
                defaultValue={defaultValue}
                value={value[key]}
                options={options}
                onChange={values => onChange({ values, options }, values, key, type)} />
            )

          case 'slider':
            return (
              <NumberRange key={key}
                slider
                label={label}
                defaultValue={defaultValue}
                value={value[key]}
                options={options}
                onChange={values => onChange({ values, options }, values, key, type)} />
            )

          default:
            return null
        }
      })
    }
  </Box>
</React.Fragment>


/*********************
 * PARENT COMPONENT
*********************/
const processOutputValue = (key, val, extra) => {
  if(val != null) {
    if(key.endsWith('_date')) {
      if(extra === 'low') {
        return `${val}-01-01`
      }

      if(extra === 'high') {
        return `${val}-12-31`
      }
    }
  }

  return val
}

function Filters({ providerValue }) {
  const { handleApplyFilters, handleClearFilters, filterSpecs } = providerValue

  const [state, setState] = useState(filterSpecs.current || filterSections.reduce((acc, sect) => {
    const sectFilters = filtersDesc[sect]
    sectFilters.forEach(({ key, defaultValue }) => acc[key] = defaultValue || null)
    return acc
  }, {}))

  const handleStateChange = (evt, value, key, type) => {
    let newValue = null

    switch(type) {
      case 'checkbox':
        newValue = evt.target.checked
        break

      case 'slider':
      case 'number_range': {
        newValue = value
        break
      }

      default:
        break
    }

    setState(old => {
      const newState = {
        ...old,
        [key]: newValue
      }
      return newState
    })
  }

  const clearFilters = () => {
    filterSpecs.current = null

    handleClearFilters()
  }

  const applyFilters = () => {
    const output = {
      'include_adult': null,
      'with_runtime.lte': null,
      'with_runtime.gte': null,
      'region': null,
      'language': null,
      'primary_release_year': null,
      'primary_release_date.lte': null,
      'primary_release_date.gte': null,
      'vote_average.lte': null,
      'vote_average.gte': null,
      'vote_count.gte': null,
      'with_genres': null
    }

    filterSections.forEach(sect => {
      filtersDesc[sect].forEach(filt => {
        const { key, options } = filt
        const val = state[key]

        if(isArray(val)) {
          if(val.length === 1) {
            if(options.keyWhenEquals) {
              output[options.keyWhenEquals] = val[0]
            } else {
              output[`${key}.lte`] = processOutputValue(key, val[0], 'high')
              output[`${key}.gte`] = processOutputValue(key, val[0], 'low')
            }
          } else {
            const [low, high] = val
            output[`${key}.lte`] = processOutputValue(key, high, 'high')
            output[`${key}.gte`] = processOutputValue(key, low, 'low')
          }
        } else {
          output[key] = val
        }
      })
    });

    filterSpecs.current = state
    handleApplyFilters(output)
  }

  return (
    <div className="p-3">
      {
        filterSections.map(sect => (
          <Box pb={3} pt={1}
            border={1}
            borderColor="grey.300"
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            key={sect}>
            <Section content={filtersDesc[sect]} label={sect} value={state} onChange={handleStateChange} />
          </Box>
        ))
      }
      <Box clone textAlign="center" py={4}>
        <footer>
          <Button size="large"
            variant="contained"
            className="mr-2"
            onClick={clearFilters}
            disableElevation>Clear Filters</Button>
          <Button size="large"
            variant="outlined"
            color="primary"
            onClick={applyFilters}
            disableElevation>Apply</Button>
        </footer>
      </Box>
    </div>
  )
}

export default Filters
