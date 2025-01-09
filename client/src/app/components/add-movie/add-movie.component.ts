import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  newMovie: Movie = {
    title: '',
    director: '',
    notes: '',
    recommendationIndex: 0,
    watched: false
  };

  constructor(private movieService: MovieService, private router: Router) {}

  createMovie() {
    // Appel au service pour ajouter le film
    this.movieService.createMovie(this.newMovie).subscribe({
      next: (created) => {
        // Redirection vers la liste des films ou watchlist, selon le choix
        if (this.newMovie.watched) {
          // Si le film a été marqué comme "vu"
          this.router.navigate(['/movies']);
        } else {
          // Sinon, la watchlist
          this.router.navigate(['/watchlist']);
        }
      },
      error: (err) => console.error(err)
    });
  }
}
