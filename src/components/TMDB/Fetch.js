import axios from 'axios';

const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
};

const defaultParams = {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    sort_by: 'popularity.desc'
}

async function fetchFromApi(endpoint, params = {}) {
    try {
        const finalParams = {
            api_key: process.env.REACT_APP_API_KEY,
            ...defaultParams,
            ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null))
        };

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
            params: finalParams,
            headers: headers
        });
        console.log('response:', response.data);
        return response || { data: [] };
    } catch (error) {
        console.error('Error fetching data: ', error);
        return { data: [] };
    }
}

async function getMovies(search, genres, page = 1) {
    const endpoint = search ? 'search/movie' : 'discover/movie';
    genres = genres.filter(genre => genre !== '0');
    const genres_string = genres ? genres.join(',') : null;
    return fetchFromApi(endpoint, { query: search, with_genres: genres_string, page: page });
}

async function getDefaultMovies() {
    return fetchFromApi('discover/movie');
}

async function getGenres() {
    return fetchFromApi('genre/movie/list');
}

export {
    getMovies,
    getDefaultMovies,
    getGenres
};