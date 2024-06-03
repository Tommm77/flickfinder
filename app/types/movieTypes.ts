// types/movieTypes.ts
export interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: string;
    runtime: number;
    overview: string;
    cast: {
        director: string;
        cast: {
            name: string;
            character: string;
            image: string;
        }[];
    };
    watch_providers: {
        rent: any[];
        flatrate: any[];
        buy: any[];
    };
}
