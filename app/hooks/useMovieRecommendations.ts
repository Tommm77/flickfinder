// hooks/useMovieRecommendations.ts

import { useState, useEffect } from 'react';

export function useMovieRecommendations(prompt: string) {
    const [movies, setMovies] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieRecommendations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                });
                const data = await res.json();
                const moviesArray = data.movie;
                setMovies(moviesArray);
            } catch (error) {
                console.error('Error fetching movie recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (prompt) {
            fetchMovieRecommendations().then(r => r);
        }
    }, [prompt]);

    return { movies, loading };
}