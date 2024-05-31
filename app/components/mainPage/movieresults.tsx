"use client";

import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import StartRating from "@/app/components/mainPage/startRating";
import Image from "next/image";

interface MovieResultsProps {
    movies: any[];
    loading: boolean;
    error: string | null;
}

export const MovieResults: React.FC<MovieResultsProps> = ({ movies, loading, error }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (loading) {
            interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        return 0;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 50);
        } else {
            setProgress(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [loading]);

    if (loading) {
        return (
            <div className="absolute top-4 left-0 right-0 flex items-center justify-center max-w-sm mx-auto">
                <Progress value={progress} />
            </div>
        );
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {movies.length > 0 ? (
                <div className="flex space-x-5">
                    {movies.map((movie, index) => (
                        <Card key={index} className="bg-accent">
                            <CardHeader className="bg-accent rounded-xl">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.original_title}
                                    width={400}
                                    height={200}
                                    className="object-cover rounded-2xl"
                                />
                            </CardHeader>
                            <CardContent>
                                <h2 className="-translate-y-3 font-bold text-2xl">{movie.original_title}</h2>
                                <div className="flex items-center justify-center space-x-1">
                                    <Badge
                                        className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.release_date.split("-")[0]}
                                    </Badge>
                                    <Badge
                                        className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.genres}
                                    </Badge>
                                    <Badge
                                        className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.runtime} mins
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-center mt-2 gap-x-1">
                                    <p>Rating :</p>
                                    <StartRating rating={movie.vote_average / 2}/>
                                </div>
                                <p className="mt-2 text-primary">Hover the Card to see more details</p>
                            </CardContent>
                            {/*<h2>{movie.original_title}</h2>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                            <p>Genres: {movie.genres.join(', ')}</p>
                            <h3>Cast:</h3>
                            <ul>
                                {movie.cast.map((actor: any, idx: number) => (
                                    <li key={idx}>{actor.name} as {actor.character}</li>
                                ))}
                            </ul>
                            <h3>Watch Providers:</h3>
                            <ul>
                                {Object.entries(movie.watch_providers).map(([country, provider]: [string, any]) => (
                                    <li key={country}>
                                        <strong>{country}:</strong>
                                        <ul>
                                            {provider.flatrate && provider.flatrate.map((p: any) => (
                                                <li key={p.provider_id}>{p.provider_name}</li>
                                            ))}
                                            {provider.rent && provider.rent.map((p: any) => (
                                                <li key={p.provider_id}>Rent: {p.provider_name}</li>
                                            ))}
                                            {provider.buy && provider.buy.map((p: any) => (
                                                <li key={p.provider_id}>Buy: {p.provider_name}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>*/}
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No movie recommendations found.</p>
            )}
        </div>
    );
};
