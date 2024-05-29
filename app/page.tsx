import {Hero} from "@/app/components/mainPage/hero";
import RetroGrid from "@/app/components/magicui/retro-grid";
import {Navbar} from "@/app/components/mainPage/navbar";

export default function Home() {
  return (
      <div className="w-full h-full">
          <Navbar/>
          <RetroGrid className="h-full "/>
          <div className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
              <Hero/>
              <div
                  className="absolute inset-x-0 top-[calc(40%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(40%-30rem)]"
                  aria-hidden="true"
              >
                  <div
                      className="relative left-[calc(20%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00ff00] via-[#00cc00] to-[#009900] opacity-20 sm:left-[calc(70%+36rem)] sm:w-[72.1875rem]"
                      style={{
                          clipPath:
                              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                  />
              </div>
              <div
                  className="absolute inset-x-0 top-[calc(40%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(70%-30rem)]"
                  aria-hidden="true"
              >
                  <div
                      className="relative left-[calc(20%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00ff00] via-[#00cc00] to-[#009900] opacity-20 sm:left-[calc(0%+36rem)] sm:w-[72.1875rem]"
                      style={{
                          clipPath:
                              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                  />
              </div>
          </div>
      </div>
  );
}
