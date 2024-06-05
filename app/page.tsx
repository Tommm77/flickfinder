import { Hero } from "@/app/components/mainPage/hero";
import { Navbar } from "@/app/components/mainPage/navbar";
import {MovieOfTheWeek} from "@/app/components/mainPage/movieOfTheWeek";
import {MovieOfTheDay} from "@/app/components/mainPage/movieOfTheDay";

export default function Home() {
    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 lg:px-8">
                <Hero />
            </div>
            <div className="max-w-7xl mx-auto">
                <MovieOfTheWeek />
                <MovieOfTheDay />
            </div>
        </div>
    );
}
