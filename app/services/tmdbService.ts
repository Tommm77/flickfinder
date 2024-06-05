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

            const director = data.crew.find((member: { job: string }) => member.job === 'Director');
            const actors = data.cast.slice(0, 9).map((actor: { name: string, character: string, profile_path: string }) => ({
                name: actor.name,
                character: actor.character,
                image: actor.profile_path
            }));

            return {
                director: director ? director.name : 'Unknown',
                cast: actors
            };
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
            const providers = data.results?.FR || data.results.US;

            return {
                rent: providers?.rent || [],
                flatrate: providers?.flatrate || [],
                buy: providers?.buy || [],
            };
        } catch (error) {
            console.error('Error fetching watch providers:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getPopularMovies() {
        const url = `${TMDB_API_URL}/movie/popular?language=en-US&page=1`;
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
            return data.results;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getMoviesOfTheWeek() {
        const dateNow = new Date();
        const dateStartOfYear = new Date(dateNow.getFullYear(), 0, 0);
        const diffTime = Math.abs(dateNow.getTime() - dateStartOfYear.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let page = Math.ceil(diffDays / 20);
        let url = `${TMDB_API_URL}/movie/popular?language=en-US&page=${page}`;

        const movies = [];
        let fetchedMovies = 0;

        while (fetchedMovies < 7) {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${TMDB_API_KEY}`
                    }
                });
                const data = await res.json();
                const moviesOnPage = data.results;
                const remainingMoviesNeeded = 7 - fetchedMovies;
                const moviesToAdd = moviesOnPage.slice(0, remainingMoviesNeeded);
                movies.push(...moviesToAdd);
                fetchedMovies += moviesToAdd.length;
                if (fetchedMovies < 7) {
                    url = `${TMDB_API_URL}/movie/popular?language=en-US&page=${page + 1}`;
                }
            } catch (error) {
                console.error('Error fetching movies of the week:', error);
                throw new Error('Internal Server Error');
            }
        }

        return movies;
    }

}
