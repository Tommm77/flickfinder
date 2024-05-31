// hooks/useMovieRecommendations.ts

import { useState, useEffect } from 'react';

export function useMovieRecommendations(prompt: string) {
    const [movies, setMovies] = useState<any[]>([]);
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
                const moviesArray = data.movies;
                setMovies(moviesArray);
            } catch (error) {
                console.error('Error fetching movie recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (prompt) {
            fetchMovieRecommendations();
        }
    }, [prompt]);

    return { movies, loading };
}
