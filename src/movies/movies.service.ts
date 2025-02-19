import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException(`Movie with ID ${id} not found`);
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

  update(id: string, updateData): boolean {
    this.getOne(id);
    this.movies = this.movies.map((movie) =>
      movie.id === +id ? { ...movie, ...updateData } : movie,
    );
    return true;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
}
