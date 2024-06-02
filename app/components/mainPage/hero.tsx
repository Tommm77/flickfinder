"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedGradientText from '@/app/components/magicui/animated-gradient-text';
import { BsStars } from 'react-icons/bs';
import { NeonGradientCard } from '@/app/components/magicui/neon-gradient-card';
import { useMovieRecommendations } from "@/app/hooks/useMovieRecommendations";
import {MovieResults} from "@/app/components/mainPage/movieresults";
import AnimatedGridPattern from "@/app/components/magicui/animated-grid-pattern";
import {cn} from "@/lib/utils";

export const Hero = () => {
    const [prompt, setPrompt] = React.useState('');
    const { movies, loading, error } = useMovieRecommendations(prompt);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const prompt = formData.get('prompt') as string;
        setPrompt(prompt);
    };

    return (
        <section key="1" className="w-full">
            <div className="container px-4 md:px-6 z-10 relative">
                <AnimatedGridPattern
                    numSquares={20}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-20%] h-[100%] skew-y-12",
                    )}
                />
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="flex justify-center items-center space-x-5">
                            <AnimatedGradientText>
                                <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-2">
                                    AI
                                </h1>
                            </AnimatedGradientText>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-2">
                                Powered
                            </h1>
                        </div>
                        <div className="flex justify-center items-center space-x-5">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10">
                                Movie
                            </h1>
                            <AnimatedGradientText>
                                <h1 className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10">
                                    Search
                                </h1>
                            </AnimatedGradientText>
                        </div>
                        <p className="mx-auto max-w-[800px] md:text-xl text-accent">
                            Find the perfect movie for tonight with our AI-driven recommendation engine.
                        </p>
                    </div>
                    <div className="w-full max-w-5xl space-y-2 pt-2">
                        <div className="h-fit relative flex items-center justify-center">
                            <NeonGradientCard className="w-2/3 h-[3.5rem]">
                                <form onSubmit={handleFormSubmit}>
                                    <Input className="pr-12 max-w-5xl flex-1 rounded-2xl h-12 bg-card"
                                           placeholder="Ask AI for a movie..." type="text" name="prompt"/>
                                    <Button className="absolute top-1 right-1 w-16 h-12 rounded-r-2xl" size="icon"
                                            type="submit">
                                        <BsStars className="w-6 h-6"/>
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </NeonGradientCard>
                        </div>
                        <p className="text-xs text-accent">
                            Sign up to unlock exclusive features.
                            <Link className="underline underline-offset-2" href="#">
                                Terms & Conditions
                            </Link>
                        </p>
                    </div>
                    <MovieResults movies={movies} loading={loading} error={error} />
                </div>
            </div>
        </section>
    );
};
