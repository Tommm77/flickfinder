// app/api/openai/route.ts

import { NextResponse } from 'next/server';
import {OpenAIService} from "@/app/services/openaiService";

const openAIService = new OpenAIService();

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const movieRecommendations = await openAIService.getMovieRecommendations(prompt);

        return NextResponse.json({
            movie: movieRecommendations
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}