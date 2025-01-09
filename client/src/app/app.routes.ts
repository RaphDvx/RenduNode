import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'add', component: AddMovieComponent }, // <--- nouvelle route
  { path: '**', redirectTo: 'movies' }
];
