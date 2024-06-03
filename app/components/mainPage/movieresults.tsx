"use client";

import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import MovieModal from '@/app/components/mainPage/movieModal';
import StartRating from "@/app/components/mainPage/startRating";
import {FastAverageColor} from "fast-average-color";
import {cn} from "@/lib/utils";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import AnimatedGradientButton from "@/app/components/magicui/animated-gradient-button";
import AnimatedGradientText from "@/app/components/magicui/animated-gradient-text";

interface MovieResultsProps {
    movies: any[];
    loading: boolean;
    error: string | null;
}

export const MovieResults: React.FC<MovieResultsProps> = ({ movies, loading, error }) => {
    const [progress, setProgress] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});

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

    useEffect(() => {
        const fac = new FastAverageColor();
        const getColor = async (imgUrl: string) => {
            try {
                const color = await fac.getColorAsync(imgUrl);
                return color.hex;
            } catch (error) {
                console.error('Error getting average color:', error);
                return 'rgba(0, 0, 0, 0.8)';
            }
        };

        const fetchColors = async () => {
            const colorPromises = movies.map(async (movie) => {
                const imgUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
                const color = await getColor(imgUrl);
                return { [movie.poster_path]: color };
            });

            const colors = await Promise.all(colorPromises);
            const colorMap = colors.reduce((acc, color) => ({ ...acc, ...color }), {});
            setColorMap(colorMap);
        };

        fetchColors();
    }, [movies]);

    const openModal = (movie: any) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="absolute -top-40 left-0 right-0 flex items-center justify-center max-w-sm mx-auto">
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
                <div className="flex flex-wrap sm:flex-nowrap gap-8 justify-center mt-12">
                    {movies.map((movie, index) => (
                        <Card
                            key={index}
                            className="bg-accent w-full md:w-1/2 lg:w-1/3 xl:w-1/2 group h-fit hover:scale-110 transition ease-in-out cursor-pointer"
                            onClick={() => openModal(movie)}
                        >
                            <CardHeader className="bg-accent rounded-xl relative">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.original_title}
                                    width={600}
                                    height={400}
                                    className="object-cover rounded-xl"
                                />
                                <div style={{
                                    background: `linear-gradient(to top, ${colorMap[movie.poster_path] || 'rgba(0, 0, 0, 0.8)'}, transparent)`
                                }} className="absolute bottom-0 h-72 w-full rounded-b-xl bg-red-800"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <AnimatedGradientText>
                                        <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl text-center font-bold">
                                            {movie.original_title}
                                        </h1>
                                    </AnimatedGradientText>
                                    <div className="flex gap-x-1 -mt-2">
                                        <p className="text-white">Rating :</p>
                                        <StartRating rating={movie.vote_average / 2}/>
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-start mt-2">
                                        <AnimatedGradientButton className="rounded-xl">
                                            <hr className=" h-4 w-[1px] shrink-0 bg-transparent"/>{" "}
                                            <span
                                                className={cn(
                                                    `inline animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                                )}
                                            >
                                          {movie.release_date.split("-")[0]}
                                        </span>
                                        </AnimatedGradientButton>
                                        <AnimatedGradientButton className="rounded-xl">
                                            <hr className=" h-4 w-[1px] shrink-0 bg-transparent"/>{" "}
                                            <span
                                                className={cn(
                                                    `inline animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                                )}
                                            >
                                          {movie.genres}
                                        </span>
                                        </AnimatedGradientButton>
                                        <AnimatedGradientButton className="rounded-xl">
                                            <hr className=" h-4 w-[1px] shrink-0 bg-transparent"/>{" "}
                                            <span
                                                className={cn(
                                                    `inline animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                                )}
                                            >
                                          {movie.runtime} mins
                                        </span>
                                        </AnimatedGradientButton>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center text-2xl text-accent hidden">Ask something to see result...</div>
            )}
            {selectedMovie && (
                <MovieModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    movie={selectedMovie}
                />
            )}
        </div>
    );
};
