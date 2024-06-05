// app/api/movie-week/route.ts
import { NextResponse } from 'next/server';
import {TMDbService} from "@/app/services/tmdbService";
import {Movie} from "@/app/types/movieTypes";

const tmdbService = new TMDbService();

export async function GET() {
    try {
        const movies = await tmdbService.getMoviesOfTheWeek();
        const movieIds = movies.map((movie: { id: number }) => movie.id);

        const movieDetailsPromises = movieIds.map((id: number) => tmdbService.getMovieDetails(id));
        const moviesDetails: Awaited<{
            overview: any;
            cast: { cast: any; director: any };
            watch_providers: { buy: any; rent: any; flatrate: any };
            original_title: any;
            release_date: any;
            genres: any;
            vote_average: any;
            runtime: any;
            poster_path: any
        }>[] = await Promise.all(movieDetailsPromises);

        return NextResponse.json({ movies: moviesDetails });
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return NextResponse.json({ error: 'Failed to fetch popular movies' }, { status: 500 });
    }
}
