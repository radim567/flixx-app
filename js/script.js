const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies

async function displayPopularMovies() {
  const { results } = await fetchApiData('/movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
           class="card-img-top"
           alt="${movie.title}" />`
          : `<img src="../images/no-image.jpg" 
           class="card-img-top"
           alt="${movie.title}" />`
      }
      </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display 20 most popular TV shows
async function displayPopularShows() {
  const { results } = await fetchApiData('/tv/popular');
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
           class="card-img-top"
           alt="${show.name}" />`
          : `<img src="../images/no-image.jpg" 
           class="card-img-top"
           alt="${show.name}" />`
      }
      </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air date: ${show.first_air_date}</small>
          </p>
        </div>`;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  console.log(window.location.search);
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchApiData(`/movie/${movieId}`);
  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
      <div class="details-top">
          <div>
              ${
                movie.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
           class="card-img-top"
           alt="${movie.title}" />`
                  : `<img src="../images/no-image.jpg" 
           class="card-img-top"
           alt="${movie.title}" />`
              }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres
                .map(
                  (genre) => `<li class="list-group-item">${genre.name}</li>`
                )
                .join('')}
            </ul>
            ${
              movie.homepage !== ''
                ? `<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>`
                : `<span class="btn">No Homepage</span>`
            }
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">  ${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(div);
}

// Display Show Details
async function displayShowDetails() {
  console.log(window.location.search);
  const showId = window.location.search.split('=')[1];
  const show = await fetchApiData(`/tv/${showId}`);
  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
      <div class="details-top">
          <div>
              ${
                show.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
           class="card-img-top"
           alt="${show.name}" />`
                  : `<img src="../images/no-image.jpg" 
           class="card-img-top"
           alt="${show.name}" />`
              }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres
                .map(
                  (genre) => `<li class="list-group-item">${genre.name}</li>`
                )
                .join('')}
            </ul>
            ${
              show.homepage !== ''
                ? `<a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>`
                : `<span class="btn">No Homepage</span>`
            }
          </div>
        </div>
        <div class="details-bottom">
          <h2>show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode To Air:</span> .${
              show.last_episode_to_air.air_date
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              show.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">  ${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;

  document.querySelector('#show-details').appendChild(div);
}

//Display Backdrop in Details Pages
function displayBackgroundImage(type, backdropPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.2';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
  const API_KEY = '071f2c75b917ebd7880005c5e28c7563';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

function addCommasToNumber(num) {
  let numStr = num.toString(); // convert number to string
  let numArr = numStr.split('.'); // split the string at decimal point
  let wholeNum = numArr[0]; // get the whole number part
  let decimalNum = numArr[1]; // get the decimal part (if any)
  let regex = /\B(?=(\d{3})+(?!\d))/g; // regex pattern to match every 3 digits
  wholeNum = wholeNum.replace(regex, ','); // add commas to the whole number
  if (decimalNum) {
    return wholeNum + '.' + decimalNum; // if there is a decimal part, add it back
  } else {
    return wholeNum; // if there is no decimal part, return only the whole number
  }
}

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
