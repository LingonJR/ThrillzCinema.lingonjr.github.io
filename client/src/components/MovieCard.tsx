import { Link } from "wouter";
import { getPosterUrl, formatReleaseYear, formatRating } from "@/lib/tmdb";
import { Movie } from "@shared/schema";

interface MovieCardProps {
  movie: Movie;
  showRating?: boolean;
}

export default function MovieCard({ movie, showRating = true }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const year = formatReleaseYear(movie.release_date);
  const rating = formatRating(movie.vote_average);

  return (
    <div className="movie-card group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-xl">
      <Link href={`/movie/${movie.id}`}>
        <div className="aspect-poster bg-card relative overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-card">
              <i className="fas fa-film text-4xl text-gray-600"></i>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
            {showRating && (
              <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                {rating}
              </span>
            )}
            <button className="bg-background/80 hover:bg-primary/80 text-foreground p-2 rounded-full transition-colors">
              <i className="fas fa-play text-xs"></i>
            </button>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold line-clamp-1 text-sm">{movie.title}</h3>
          <p className="text-xs text-gray-400">{year}</p>
        </div>
      </Link>
    </div>
  );
}
