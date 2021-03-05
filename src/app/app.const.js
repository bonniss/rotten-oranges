import { app } from '../../package.json'

export const APP_NAME = app.name;
export const APP_TAGLINE = app.tagline;
export const DEFAULT_TITLE = `${app.name} | ${app.tagline}`

export const CARD_ORIENTATION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}