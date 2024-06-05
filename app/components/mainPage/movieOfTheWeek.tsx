"use client";

// components/MovieOfTheWeek.tsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/app/components/magicui/marquee";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import StartRating from "@/app/components/mainPage/startRating";
import MovieModal from '@/app/components/mainPage/movieModal';
import AnimatedGradientText from "@/app/components/magicui/animated-gradient-text";
import {usePopularMovies} from "@/app/hooks/usePopularMovies";
import AnimatedGradientButton from "@/app/components/magicui/animated-gradient-button";
import {Movie} from "@/app/types/movieTypes";

export const MovieOfTheWeek = () => {
    const { movies, loading, error } = usePopularMovies();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    const firstRow = movies.slice(0, movies.length / 2);
    const secondRow = movies.slice(movies.length / 2);

    const MovieCard = ({
                           movie
                       }: {
        movie: Movie;
    }) => {
        return (
            <Card
                key={movie.id}
                className="bg-accent w-[20rem] group h-fit hover:scale-105 transition ease-in-out cursor-pointer"
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
                    <div
                        className="absolute bottom-0 left-0 right-0 p-4"
                        style={{
                            background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)`
                        }}
                    >
                        <AnimatedGradientText>
                            <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl text-center font-bold">
                                {movie.original_title}
                            </h1>
                        </AnimatedGradientText>
                        <div className="flex gap-x-1 -mt-2">
                            <p className="text-white">Rating :</p>
                            <StartRating rating={movie.vote_average / 2} />
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
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-10">
            <AnimatedGradientText>
                <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl text-center font-bold">
                    Movie of the Week
                </h1>
            </AnimatedGradientText>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
            </div>
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
