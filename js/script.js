const API_KEY = 'b75e218ac89bb4857d579a5bb3339778';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Hämta top 10 högst rankade filmer
async function getTopRatedMovies() {
    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`);
        const data = await response.json();
        displayMovies(data.results.slice(0, 10), 'Top Rated');
    } catch (error) {
        handleError(error);
    } finally {
        toggleLoading(false);
    }
}

// Hämta top 10 populära filmer
async function getPopularMovies() {
    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`);
        const data = await response.json();
        displayMovies(data.results.slice(0, 10), 'Popular');
    } catch (error) {
        handleError(error);
    } finally {
        toggleLoading(false);
    }
}

// Sök filmer eller personer
async function search(query) {
    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${query}&page=1`);
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        handleError(error);
    } finally {
        toggleLoading(false);
    }
}

// Visa filmer
function displayMovies(movies, category) {
    const container = document.getElementById('movies-container');
    container.innerHTML = `<h2 class="text-center mb-4">${category} Movies</h2>`;
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'col-md-3 movie';
        movieElement.innerHTML = `
            <div class="card">
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">Release Date: ${movie.release_date}</p>
                </div>
            </div>
        `;
        container.appendChild(movieElement);
    });
}

// Visa sökresultat
function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    if (results.length === 0) {
        container.innerHTML = '<p class="text-center text-warning">Inga resultat hittades. Vänligen försök med en annan sökterm.</p>';
        return;
    }
    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.className = 'col-md-6 mb-4';

        if (item.media_type === 'movie') {
            resultElement.innerHTML = `
                <div class="card">
                    <img src="${IMAGE_BASE_URL}${item.poster_path}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Release Date: ${item.release_date}</p>
                        <p>${item.overview}</p>
                    </div>
                </div>
            `;
        } else if (item.media_type === 'person') {
            const knownForList = item.known_for.map(work => `
                <li>${work.media_type === 'movie' ? 'Movie: ' : 'TV: '}${work.title || work.name}</li>
            `).join('');

            resultElement.innerHTML = `
                <div class="card">
                    <img src="${IMAGE_BASE_URL}${item.profile_path}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Känd för: ${item.known_for_department}</p>
                        <ul>${knownForList}</ul>
                    </div>
                </div>
            `;
        }
        container.appendChild(resultElement);
    });
}

// Hantera fel
function handleError(error) {
    const errorContainer = document.getElementById('error-message');
    errorContainer.textContent = `Ett fel inträffade: ${error.message}`;
    errorContainer.style.display = 'block';
}

// Laddningsindikator
function toggleLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}

// Event listeners
document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (query) search(query);
});

document.getElementById('top-rated-btn').addEventListener('click', getTopRatedMovies);
document.getElementById('popular-btn').addEventListener('click', getPopularMovies);
