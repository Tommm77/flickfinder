import { Hero } from "@/app/components/mainPage/hero";
import RetroGrid from "@/app/components/magicui/retro-grid";
import { Navbar } from "@/app/components/mainPage/navbar";
import { CustomPolygon } from "@/app/components/polygon/polygon";

export default function Home() {
    return (
        <div className="w-full h-full">
            <Navbar />
            <RetroGrid className="h-full" />
            <div className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 lg:px-8">
                <Hero />
                <CustomPolygon leftPercentage={70} topPercentage={40} />
                <CustomPolygon leftPercentage={0} topPercentage={70} />
                <CustomPolygon leftPercentage={0} topPercentage={40} />
            </div>
        </div>
    );
}
