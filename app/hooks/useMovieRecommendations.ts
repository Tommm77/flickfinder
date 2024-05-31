import { useState, useEffect } from 'react';

export function useMovieRecommendations(prompt: string) {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieRecommendations = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                });
                if (!res.ok) {
                    new Error('Failed to fetch movie recommendations');
                }
                const data = await res.json();
                const moviesArray = data.movies;
                setMovies(moviesArray);
            } catch (error) {
                console.error('Error fetching movie recommendations:', error);
                setError('Failed to fetch movie recommendations');
            } finally {
                setLoading(false);
            }
        };

        if (prompt) {
            fetchMovieRecommendations();
        }
    }, [prompt]);

    return { movies, loading, error };
}
