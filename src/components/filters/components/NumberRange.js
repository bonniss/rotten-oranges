import { Box, MenuItem, Select, Slider, TextField } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { isArray } from '../../../utils/types';

const useStyles = makeStyles(theme => ({
  label: {
    minWidth: 150,
    marginRight: theme.spacing(1)
  },
  operatorSelect: {
    marginRight: theme.spacing(2)
  }
}))

const OPERATORS = {
  RANGE: 'range',
  EQUALS: 'eq',
  GREATER_THAN: 'gt',
  LESSER_THAN: 'lt'
}

const operatorOptions = [
  {
    value: OPERATORS.RANGE,
    label: 'between'
  },
  {
    value: OPERATORS.EQUALS,
    label: 'equals'
  },
  {
    value: OPERATORS.GREATER_THAN,
    label: 'greater than'
  },
  {
    value: OPERATORS.LESSER_THAN,
    label: 'lesser than'
  },
]

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const IOSSlider = withStyles({
  root: {
    color: orange[400],
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 22,
    width: 22,
    backgroundColor: orange[400],
    boxShadow: iOSBoxShadow,
    marginTop: -11,
    marginLeft: -11,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    fontSize: '1rem',
    left: 'calc(-50% + 8px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: orange[200],
  },
  mark: {
    backgroundColor: orange[200],
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: orange[400],
  },
})(Slider);

function NumberRange({ value, options, onChange, label, operators, slider, defaultValue }) {
  const classes = useStyles()
  const { step, min, max, valueLabelDisplay, marks } = options

  let initialOperator = operatorOptions[0]
  if(isArray(value)) {
    if(value.length === 1) {
      initialOperator = operatorOptions[1]
    } else {
      const [low, high] = value
      if(low != null && high == null) {
        initialOperator = operatorOptions[2]
      }
      if(low == null && high != null) {
        initialOperator = operatorOptions[3]
      }
    }
  }
  const [operator, setOperator] = useState(initialOperator.value)

  const handleOperatorChange = evt => {
    const _operator = evt.target.value
    setOperator(_operator)

    switch(_operator) {
      case OPERATORS.EQUALS:
        onChange(defaultValue.slice(0, 1))
        break
      case OPERATORS.LESSER_THAN:
        onChange([null, defaultValue[1]])
        break
      case OPERATORS.GREATER_THAN:
        onChange([defaultValue[0], null])
        break
      default:
        onChange(defaultValue)
        break
    }
  }

  const handleChange = (evt, evtValue) => {
    let newVal = null
    if(slider) {
      newVal = evtValue
    } else {
      let targetValue = (!evt.target.value || evt.target.value === 0) ? null : +evt.target.value
      if(targetValue < min) {
        targetValue = min
      }

      if(targetValue > max) {
        targetValue = max
      }

      if(evtValue === -1) {
        if(operator === OPERATORS.EQUALS) {
          newVal = [targetValue]
        }

        if(operator === OPERATORS.LESSER_THAN) {
          newVal = [null, targetValue]
        }

        if(operator === OPERATORS.GREATER_THAN) {
          newVal = [targetValue, null]
        }
      } else {
        newVal = [...value]
        newVal[evtValue] = targetValue
      }
    }
    onChange(newVal)
  }

  if(slider) {
    const sliderProps = {
      marks,
      valueLabelDisplay,
      step,
      min,
      max
    }

    return (
      <React.Fragment>
        <Box display="flex" my={4} alignItems="center" className="number-range-wrapper">
          {label && <label className={classes.label}>{label}</label>}
          <IOSSlider value={value} onChange={handleChange} {...sliderProps}/>
        </Box>
      </React.Fragment>
    )
  }

  const inputProps = {
    type: 'number',
    step,
    min,
    max
  }

  return (
    <Box display="flex" alignItems="center" className="number-range-wrapper">
      {label && <label className={classes.label}>{label}</label>}
      {
        operators && <Select className={classes.operatorSelect} value={operator} onChange={handleOperatorChange}>
          {
            operatorOptions.map(({ value: oVal, label: oLabel }) =>
              <MenuItem key={oVal} value={oVal}>{oLabel}</MenuItem>)
          }
        </Select>
      }
      {
        (operators && operator !== OPERATORS.RANGE) ? (
          <React.Fragment>
            <TextField variant="outlined" size="small" inputProps={inputProps}
              value={operator !== OPERATORS.LESSER_THAN ? value[0] : value[1]}
              onChange={evt => handleChange(evt, -1)} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TextField variant="outlined" size="small" inputProps={inputProps}
              value={value[0]} onChange={evt => handleChange(evt, 0)} />
            <RemoveIcon />
            <TextField variant="outlined" size="small" inputProps={inputProps}
              value={value[1]} onChange={evt => handleChange(evt, 1)} />
          </React.Fragment>
        )
      }
    </Box>
  )
}

export default NumberRange
