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
    <a href="movie-details.html?id=${show.id}">
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
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchApiData(`/movie/${movieId}`);
  const div = document.createElement('div');
  div.innerHTML = `
      <div class="details-top">
          <div>
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </div>
          <div>
            <h2>Movie Title</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              8 / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              atque molestiae error debitis provident dolore hic odit, impedit
              sint, voluptatum consectetur assumenda expedita perferendis
              obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
              quae molestiae cupiditate modi libero dolorem commodi obcaecati!
              Ratione quia corporis recusandae delectus perspiciatis consequatur
              ipsam. Cumque omnis ad recusandae.
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>Genre 1</li>
              <li>Genre 2</li>
              <li>Genre 3</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(div);
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

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case 'shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
