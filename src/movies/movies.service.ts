import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  update(id: number, updateData): boolean {
    this.getOne(id);
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updateData } : movie,
    );
    return true;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}
