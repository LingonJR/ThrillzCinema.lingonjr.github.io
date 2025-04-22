import { Link } from "wouter";
import { getBackdropUrl, getPosterUrl, formatReleaseYear, formatRuntime, formatGenres } from "@/lib/tmdb";
import { Movie } from "@shared/schema";

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");
  const year = formatReleaseYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const genres = formatGenres(movie.genres);

  return (
    <section id="hero" className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10"></div>
      
      {/* Background Image */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          className="absolute inset-0 object-cover h-full w-full"
        />
      )}
      
      {/* Featured Content */}
      <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold mr-2">NEW</span>
            <span className="text-gray-300 text-sm">{genres}</span>
          </div>
          
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-3">{movie.title}</h1>
          
          <div className="flex items-center mb-4">
            <span className="flex items-center mr-4">
              <i className="fas fa-star text-secondary mr-1"></i>
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </span>
            <span className="mr-4">{year}</span>
            <span>{runtime}</span>
          </div>
          
          <p className="text-gray-300 mb-6 line-clamp-3">
            {movie.overview}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Link href={`/movie/${movie.id}`} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-full flex items-center transition-colors">
              <i className="fas fa-play mr-2"></i> Watch Now
            </Link>
            <button className="bg-background border border-gray-700 hover:border-primary text-foreground py-3 px-6 rounded-full flex items-center transition-colors">
              <i className="fas fa-plus mr-2"></i> Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
