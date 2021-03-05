import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  item: {
    marginTop: 0,
    marginBottom: theme.spacing(1),

    '& > .item-label': {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1)
    },
    '& > .item-text': {
      color: theme.palette.text.dark
    }
  }
}))

const MovieDetailPanel = (({ movie, className }) => {
  const classes = useStyles()

  const {
    production_companies,
    credits: { cast, crew },
    release_date,
    runtime,
    revenue
  } = movie;

  if(!cast || !crew) return null;

  const directors = crew.filter(({ job }) => job === 'Director');

  return (
    <section className={className}>
      <Divider light />
      <div className={classes.root}>
        <p className={classes.item}>
          <span className="item-label">Cast:</span>
          <span className="item-text">
            {
              cast && cast.length ? cast.slice(0, 5).map(({ name }) => name).join(', ') : '-'
            }
          </span>
        </p>
        <p className={classes.item}>
          <span className="item-label">Director:</span>
          <span className="item-text">
            {
              directors && directors.length ? directors.map(({ name }) => name).join(', ') : '-'
            }
          </span>
        </p>
        <p className={classes.item}>
          <span className="item-label">Production:</span>
          <span className="item-text">
            {
              production_companies && production_companies.length ? production_companies.map(({ name }) => name).join(', ') : '-'
            }
          </span>
        </p>
        <p className={classes.item}>
          <span className="item-label">Duration:</span>
          <span className="item-text">{runtime ? runtime + ' mins' : '-'}</span>
        </p>
        <p className={classes.item}>
          <span className="item-label">Release Date:</span>
          <span className="item-text">{release_date}</span>
        </p>
        {
          revenue ? <p className={classes.item}>
            <span className="item-label">Revenue:</span>
            <span className="item-text">${revenue.toLocaleString('en')}</span>
          </p> : null
        }
      </div>
      <Divider light />
    </section>
  )
})

export default MovieDetailPanel