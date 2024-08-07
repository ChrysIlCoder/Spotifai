# Spotifai

## The project
"Spotifai" it's a copy of [Spotify](https://open.spotify.com/) using their [Web API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started). The project was made to get the hang of working with big APIs and datasets. The endpoints used in this projects are:

- **Authentication endpoint**
  - ```/api/token```
- **Album endpoint**
  - ```/albums/{id}```
  - ```/browse/new-releases```
- **Artists endpoint**
  - ```/artists/{id}```
- **Categories endpoint**
  - ```/browse/categories```
- **Search endpoint**
  - ```/search```
- **Tracks endpoint**
  - ```/tracks/{id}```

All of the above use the ```https://api.spotify.com/v1``` URL (Expect for the **Authentication** which uses ```https://accounts.spotify.com```). </br>
To make the APIs calls i used [Redux Saga](https://redux-saga.js.org/) and [Redux](https://redux.js.org/) for global state management. For the App itself i used [React](https://react.dev/) and [SCSS](https://sass-lang.com/) for the styles. </br>
The Spotify [Figma Design](https://www.figma.com/design/KcvdSnWF6jPjEZFPOuqbxy/Spotify-Music-UI-Design-%26-Prototype-(Community)?node-id=124-2941&t=PsvK8PDsgaHgHGpq-0) that i followed was made by [davedirect3](https://www.figma.com/@davedirect3).

## How to start
Write in the **root folder** of the project ```npm run dev``` and replace the **API Auth Credentials** (```Client ID```, ```Client Secret```) with the ones of your Spotify App
