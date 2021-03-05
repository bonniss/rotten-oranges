# Rotten Oranges - A React TMDb Client

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/src/assets/logo_text.png" alt="Logo" height="125">
</p>

This is one of my weekend projects to practice React Hook API. It is originally inspired by [reactjs-tmdb-app](https://github.com/SKempin/reactjs-tmdb-app) by Stephen Kempin.

Technologies used:

- Backend (Data Source)
  - [The TMDb API](https://www.themoviedb.org/documentation/api)
- Frontend
  - [React Material UI](https://material-ui.com/)

## Authentication

Before you start, you __must__ provide information for TMDb to recognize your application.

TMDb application level authentication is controlled by one of either a single query parameter, `api_key`, or by using your v4 access token as a `Bearer` token. This project use the latter by setting `ENV.bearerToken` in `environment.js`.

You can request an API key by [logging in to your account](https://www.themoviedb.org/login) or [sign up if you do not have one](https://www.themoviedb.org/signup) on TMDb, then clicking the `API` link in the left hand side bar of your account page.

## Get Started

```bash
git clone https://github.com/bonniss/rotten-oranges.git
cd rotten-oranges
```

-  Install dependencies

```bash
npm install
```

- Run dev server: `npm start`, default port `8001`

```bash
npm start
```

- Build project, output folder `dist`

```bash
npm run build
```

## Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-home.jpg" alt="Homepage" width="750">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-autocomplete.jpg" alt="Autocomplete" width="750">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-movie-detail.jpg" alt="Movie detail" width="750">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-goat-horizontal.jpg" alt="Horizontal card" width="750">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-goat-vertical.jpg" alt="Vertical card" width="750">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/bonniss/rotten-oranges/main/screenshots/ross-goat-filters.jpg" alt="Filters" width="750">
</p>

## Todo

- Search TV Shows, Actors, Directors
- Random Movie Suggestion
- Favorite List
