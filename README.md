# GSIV23_abdul_mohammad

The Movie App is built with VITE and also uses VITEST for unit testing. The state management is done with Redux (toolkit) and routing is acheived through React router dom v6. For Infinite scroll i have used a utility component "react-infinite-scroll-component".

To run the app :

- npm run dev -> development mode
- npm run test -> testing

## Components

- There are only 4 components in the whole app i.e, **List movies component**, **Movie card**, **Movie details component** and **Header component**.

- There are three routes "**/**" where movies in desc order of release are displayed.
- "**/search?query=xxx***" route for searching any movie, here the same list movies component is rendered again just by changing the data being supplied to it.

- **details?id=xxxx** route where movie details are shown.

- Depending up on the route the header adapts between search bar and Movie details heading, no props are being passed between any components.

- App URL is the single source of truth for the state of the app and also this approch facilitates URL sharing, since all the state could be reconstructed from URL.


## State Management

- Whole app optimization is done with carefully structuring the store in such a way that **no same API call is made twice**. eg: you are on "/" route and browsing movies, you scrolled say 3 pages and decided to search something (say: dark knight and scrolled 1 page), now your search results will be stored in a seperate array so that when you click on that back button to go back to "/" route, now the app will not make any api call, but it renders the stored data before you left this page and as you continue to scroll down it will resume loading pages (as per eg: page 4 and so on...).

- Simillarly if you decide to go back to your same search, since that key word first page is already loaded no new request will be sent untill to scroll down to the bottom of the page. When you reach bottom page 2 will requested and stored.

- Again same thing for movie details, once clicked on a movie its details will all the other movies on which user clicked to see the details are stored in redux state, so in case user decides to revisit any one of them no API call will be made.

## Unit tests
- I have included only few unit tests for header and app components.


## Link : [deployed on firebase](https://movie-app-gsiv23.web.app/)
















