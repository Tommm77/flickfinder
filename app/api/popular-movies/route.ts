// app/api/popular-movies/route.ts
import { NextResponse } from 'next/server';
import {TMDbService} from "@/app/services/tmdbService";
import {Movie} from "@/app/types/movieTypes";

const tmdbService = new TMDbService();

export async function GET() {
    try {
        const movies = await tmdbService.getPopularMovies();
        const movieIds = movies.slice(0, 12).map((movie: { id: number }) => movie.id);

        const movieDetailsPromises = movieIds.map((id: number) => tmdbService.getMovieDetails(id));
        const moviesDetails: Movie[] = await Promise.all(movieDetailsPromises);

        return NextResponse.json({ movies: moviesDetails });
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return NextResponse.json({ error: 'Failed to fetch popular movies' }, { status: 500 });
    }
}
