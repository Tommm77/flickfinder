"use client";

import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import StartRating from "@/app/components/mainPage/startRating";

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
                <div className="flex flex-wrap gap-4 justify-center">
                    {movies.map((movie, index) => (
                        <Card key={index} className="bg-accent w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
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
                                <div className="flex flex-wrap gap-1 justify-center">
                                    <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.release_date.split("-")[0]}</Badge>
                                    <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.genres.join(", ")}</Badge>
                                    <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.runtime} mins</Badge>
                                </div>
                                <div className="flex items-center justify-center mt-2 gap-x-1">
                                    <p>Rating :</p>
                                    <StartRating rating={movie.vote_average / 2} />
                                </div>
                                <p className="mt-2 text-primary">Hover the Card to see more details</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No movie recommendations found.</p>
            )}
        </div>
    );
};
