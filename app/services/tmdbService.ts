import fetch from 'node-fetch';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
    throw new Error('Missing TMDB_API_KEY environment variable');
}
const TMDB_API_URL = 'https://api.themoviedb.org/3';

export class TMDbService {
    async searchMovie(movieName: string) {
        const url = `${TMDB_API_URL}/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            return data.results[0].id;
        } catch (error) {
            console.error('Error searching for movie:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getMovieDetails(movieId: number) {
        const url = `${TMDB_API_URL}/movie/${movieId}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            const cast = await this.getMovieCast(movieId);
            const watchProviders = await this.getWatchProviders(movieId);

            return {
                original_title: data.original_title,
                overview: data.overview,
                release_date: data.release_date,
                vote_average: data.vote_average,
                poster_path: data.poster_path,
                genres: data.genres[0].name,
                runtime: data.runtime,
                cast: cast,
                watch_providers: watchProviders
            };
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getMovieCast(movieId: number) {
        const url = `${TMDB_API_URL}/movie/${movieId}/credits?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            return data.cast.slice(0, 10).map((actor: { name: string, character: string }) => ({
                name: actor.name,
                character: actor.character
            }));
        } catch (error) {
            console.error('Error fetching movie cast:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getWatchProviders(movieId: number) {
        const url = `${TMDB_API_URL}/movie/${movieId}/watch/providers`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();

            // Assuming you want to get all available providers
            return data.results.FR;
        } catch (error) {
            console.error('Error fetching watch providers:', error);
            throw new Error('Internal Server Error');
        }
    }
}
