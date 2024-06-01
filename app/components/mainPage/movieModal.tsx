import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
            <DialogContent className="max-w-xl">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                    width={800}
                    height={200}
                    className="object-cover rounded-t-2xl w-full h-[40rem]"
                />
                <DialogHeader className="flex flex-col items-center justify-center px-10 -mt-8 w-full">
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
                    <div className="flex items-start flex-col space-y-4 w-fit">
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
                        <div className="mt-4 max-w-full">
                            <div className="flex gap-1 justify-center mt-2 space-x-5 max-w-full overflow-x-auto whitespace-nowrap">
                                {movie.cast.cast.map((actor: any, index: number) => (
                                    <Avatar key={index} className="size-14">
                                        <AvatarImage src={`https://image.tmdb.org/t/p/original/${actor.image}`} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MovieModal;
