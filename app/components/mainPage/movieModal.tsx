import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StartRating from "@/app/components/mainPage/startRating";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface MovieModalProps {
    isOpen: boolean;
    closeModal: () => void;
    movie: any;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, closeModal, movie }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="h-2/3 overflow-y-auto rounded-2xl">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                    width={800}
                    height={200}
                    className="object-cover rounded-t-2xl w-full h-[40rem]"
                />
                <DialogHeader className="flex flex-col items-center justify-center px-10 -mt-8 w-full rounded-2xl">
                    <DialogTitle className="text-3xl font-bold">{movie.original_title}</DialogTitle>
                    <div className={cn("flex flex-wrap gap-1 justify-center pt-3")}>
                        <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.release_date.split("-")[0]}</Badge>
                        <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.genres}</Badge>
                        <Badge className="bg-secondary rounded-2xl text-accent-foreground text-md">{movie.runtime} mins</Badge>
                    </div>
                    <div className="flex items-center justify-center pt-2 gap-x-1">
                        <p>Rating :</p>
                        <StartRating rating={movie.vote_average / 2} />
                    </div>
                </DialogHeader>
                <div className="flex items-start flex-col space-y-4 p-10">
                    <div>
                        <p className="text-lg font-bold">Overview :</p>
                        <DialogDescription className="text-lg mt-1">{movie.overview}</DialogDescription>
                    </div>
                    <div className="flex">
                        <p className="text-lg font-bold">Release date :</p>
                        <p className="text-lg ml-2">{formatDate(movie.release_date)}</p>
                    </div>
                    <div className="flex">
                        <p className="text-lg font-bold">Directed by :</p>
                        <p className="text-lg ml-2">{movie.cast.director}</p>
                    </div>
                    <div className="mt-4 w-full">
                        <p className="text-lg font-bold">Actors :</p>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {movie.cast.cast.map((actor: any, index: number) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <Avatar className="size-20">
                                        <AvatarImage src={`https://image.tmdb.org/t/p/original/${actor.image}`}
                                                     alt="@shadcn"/>
                                        <AvatarFallback>Error</AvatarFallback>
                                    </Avatar>
                                    <p className="text-lg ml-2 text-center">{actor.name}</p>
                                    <p className="text-lg ml-2 text-muted-foreground text-center">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <p className="text-lg font-bold">Watch Providers :</p>
                        {movie.watch_providers.rent.length > 0 ? (
                            <div>
                                <p className="text-lg font-bold text-center mb-5 mt-2 text-muted-foreground">Rent</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {movie.watch_providers.rent.map((provider: any, index: number) => (
                                        <div key={index} className="flex flex-col items-center justify-center">
                                            <Image src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                                   alt={provider.provider_name} width={100} height={100}
                                                   className="h-12 w-auto"/>
                                            <p className="text-sm text-center">{provider.provider_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-bold text-center my-5 text-muted-foreground">Rent</p>
                                <div className="flex items-center justify-center">
                                    <p className="text-lg ml-2 text-muted-foreground text-center">No Rent Providers Available</p>
                                </div>
                            </div> )}
                        {movie.watch_providers.buy.length > 0 ? (
                            <div>
                                <p className="text-lg font-bold text-center mb-5 mt-2 text-muted-foreground">Buy</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {movie.watch_providers.buy.map((provider: any, index: number) => (
                                        <div key={index} className="flex flex-col items-center justify-center">
                                            <Image src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                                   alt={provider.provider_name} width={100} height={100}
                                                   className="h-12 w-auto"/>
                                            <p className="text-sm text-center">{provider.provider_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-bold text-center my-5 text-muted-foreground">Buy</p>
                                <div className="flex items-center justify-center">
                                    <p className="text-lg ml-2 text-muted-foreground text-center">No Buy Providers Available</p>
                                </div>
                            </div> )}
                        {movie.watch_providers.flatrate.length > 0 ? (
                            <div>
                                <p className="text-lg font-bold text-center mb-5 mt-2 text-muted-foreground">Streaming</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {movie.watch_providers.flatrate.map((provider: any, index: number) => (
                                        <div key={index} className="flex flex-col items-center justify-center">
                                            <Image src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                                   alt={provider.provider_name} width={100} height={100}
                                                   className="h-12 w-auto"/>
                                            <p className="text-sm text-center">{provider.provider_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-bold text-center my-5 text-muted-foreground">Streaming</p>
                                <div className="flex items-center justify-center">
                                    <p className="text-lg ml-2 text-muted-foreground text-center">No Streaming Providers Available</p>
                                </div>
                            </div> )
                            }
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default MovieModal;
