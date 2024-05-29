import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedGradientText from "@/app/components/magicui/animated-gradient-text";
import {BsStars} from "react-icons/bs";
import {NeonGradientCard} from "@/app/components/magicui/neon-gradient-card";

export const Hero = () => {
    return (
        <section key="1" className="w-full relative">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <AnimatedGradientText>
                            <h1
                                className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-8">
                                AI Powered <br/>Movie Recommandation
                            </h1>
                        </AnimatedGradientText>
                        <p className="mx-auto max-w-[800px] md:text-xl">
                            Find the perfect movie for tonight with our AI-driven recommendation engine.
                        </p>
                    </div>
                    <div className="w-full max-w-5xl space-y-2">
                        <div className="relative h-fit">
                            <NeonGradientCard className="w-full h-[4.5rem]">
                            <Input className="pr-12 max-w-5xl flex-1 rounded-2xl h-16 bg-card" placeholder="Ask AI for a movie..."
                                   type="text"/>
                            <Button className="absolute top-1 right-1 w-20 h-16 rounded-r-2xl" size="icon" type="submit">
                                <BsStars className="w-6 h-6"/>
                                <span className="sr-only">Send</span>
                            </Button>
                            </NeonGradientCard>
                        </div>
                        <p className="text-xs">
                            Sign up to unlock exclusive features.
                            <Link className="underline underline-offset-2" href="#">
                                Terms & Conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}