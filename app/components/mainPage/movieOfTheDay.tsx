"use client";

import AnimatedGradientText from "@/app/components/magicui/animated-gradient-text";
import React, {useState} from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {Card, CardHeader} from "@/components/ui/card";
import {Movie} from "@/app/types/movieTypes";
import Image from "next/image";
import StartRating from "@/app/components/mainPage/startRating";
import AnimatedGradientButton from "@/app/components/magicui/animated-gradient-button";
import {cn} from "@/lib/utils";
import {useMoviesOfTheWeek} from "@/app/hooks/useMovieOfTheWeek";
import MovieModal from "@/app/components/mainPage/movieModal";

export const MovieOfTheDay = () => {
    const { movies, loading, error } = useMoviesOfTheWeek();
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



    const formatDate = (date: Date) => {
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="my-10 flex flex-col justify-center items-center">
            <AnimatedGradientText>
                <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl text-center font-bold">
                    Movie of the Day
                </h1>
            </AnimatedGradientText>
            <Carousel className="w-full max-w-xs mt-5">
                <CarouselContent>
                    {Array.from({ length: 7 }).map((_, index) => {
                        let today = new Date();
                        today.setDate(today.getDate() + index - 6);
                        return (
                            <CarouselItem key={index}>
                                <h2 className="text-center">{formatDate(today)}</h2>
                                <div className="p-1">
                                    {movies[index] && <MovieCard movie={movies[index]} />}
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="text-white" />
                <CarouselNext />
            </Carousel>
            {selectedMovie && (
                <MovieModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    movie={selectedMovie}
                />
            )}
        </div>
    );
}
