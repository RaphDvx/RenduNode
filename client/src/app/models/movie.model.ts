export interface Movie {
  id?: number;
  title: string;
  director: string;
  notes?: string;
  recommendationIndex: number;
  watched: boolean; // true s’il est déjà vu, false sinon
}
