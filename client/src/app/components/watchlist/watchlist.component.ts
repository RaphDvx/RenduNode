// client/src/app/components/watchlist/watchlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.movieService.getWatchlist().subscribe({
      next: (movies) => (this.watchlist = movies),
      error: (err) => console.error(err),
    });
  }

  // Optionnel : si vous voulez marquer un film comme "vu"
  markAsWatched(movie: Movie) {
    // On modifie le champ watched à true
    const updatedMovie = { ...movie, watched: true };
    this.movieService.updateMovie(movie.id!, updatedMovie).subscribe({
      next: () => this.loadWatchlist(),
      error: (err) => console.error(err),
    });
  }

  // Optionnel : supprimer de la watchlist
  deleteMovie(id?: number) {
    if (!id) return;
    this.movieService.deleteMovie(id).subscribe({
      next: () => this.loadWatchlist(),
      error: (err) => console.error(err),
    });
  }
}
