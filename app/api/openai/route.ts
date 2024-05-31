import { NextResponse } from 'next/server';
import { OpenAIService } from "@/app/services/openaiService";
import { TMDbService } from "@/app/services/tmdbService";

const openAIService = new OpenAIService();
const tmdbService = new TMDbService();

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const movieRecommendations = await openAIService.getMovieRecommendations(prompt);

        const movieDetailsPromises = movieRecommendations.map(async (movie: string) => {
            const movieId = await tmdbService.searchMovie(movie);
            return await tmdbService.getMovieDetails(movieId);
        });
        const movieDetails = await Promise.all(movieDetailsPromises);

        return NextResponse.json({
            movies: movieDetails
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
