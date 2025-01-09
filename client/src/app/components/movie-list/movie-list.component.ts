import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error(err),
    });
  }

  deleteMovie(id?: number) {
    if (!id) return;
    this.movieService.deleteMovie(id).subscribe({
      next: () => this.loadMovies(),
      error: (err) => console.error(err),
    });
  }
}
