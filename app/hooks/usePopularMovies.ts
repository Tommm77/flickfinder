// hooks/usePopularMovies.ts
import { useState, useEffect } from 'react';
import {Movie} from "@/app/types/movieTypes";

export function usePopularMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/popular-movies', {
                    method: 'GET',
                });
                if (!res.ok) {
                    new Error('Failed to fetch popular movies');
                }
                const data = await res.json();
                setMovies(data.movies);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
                setError('Failed to fetch popular movies');
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    return { movies, loading, error };
}
