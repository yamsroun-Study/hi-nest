import { Injectable } from '@nestjs/common';
import { Movie } from './entities/Movie.entitiy';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new Error(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  create(movieData): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  deleteOne(id: string): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
}
