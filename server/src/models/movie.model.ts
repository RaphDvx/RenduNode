export interface Movie {
    id?: number;
    title: string;
    director: string;
    notes?: string;
    recommendationIndex: number;
    watched: boolean;  // true si déjà vu, false si dans la watchlist
}
