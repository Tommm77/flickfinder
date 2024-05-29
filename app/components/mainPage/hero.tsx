import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import RetroGrid from "@/app/components/magicui/retro-grid";
import AnimatedGradientText from "@/app/components/magicui/animated-gradient-text";
import {BsStars} from "react-icons/bs";

export const Hero = () => {
    return (
        <section key="1" className="w-full relative">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <AnimatedGradientText>
                            <h1
                                className="animate-gradient bg-gradient-to-r from-[#dbf26e] via-[#61fa74] to-[#dbf26e] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-8">
                                AI Powered <br/>Movie recommandation
                            </h1>
                        </AnimatedGradientText>
                        <p className="mx-auto max-w-[800px] md:text-xl">
                            Find the perfect movie for tonight with our AI-driven recommendation engine.
                        </p>
                    </div>
                    <div className="w-full max-w-5xl space-y-2">
                        <div className="relative">
                            <Input className="pr-12 max-w-5xl flex-1 rounded h-16" placeholder="Ask AI for a movie..."
                                   type="text"/>
                            <Button className="absolute top-0 right-0 w-20 h-full rounded-r" size="icon" type="submit">
                                <BsStars className="w-6 h-6"/>
                                <span className="sr-only">Send</span>
                            </Button>
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