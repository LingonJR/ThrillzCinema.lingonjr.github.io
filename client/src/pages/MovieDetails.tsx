import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Movie, CastMember } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  getPosterUrl, 
  getBackdropUrl, 
  getProfileUrl, 
  formatReleaseYear, 
  formatRuntime 
} from "@/lib/tmdb";
import VideoPlayer from "@/components/VideoPlayer";
import MovieCard from "@/components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const movieId = parseInt(id);

  const { data: movieData, isLoading } = useQuery({
    queryKey: [`/api/movies/${movieId}`],
  });

  if (isLoading) {
    return <MovieDetailsLoading />;
  }

  if (!movieData) {
    return <div className="container mx-auto px-4 py-12">Movie not found</div>;
  }

  const movie = movieData as Movie & { 
    credits: { cast: CastMember[] },
    similar: { results: Movie[] }
  };
  
  const cast = movie.credits?.cast || [];
  const similarMovies = movie.similar?.results || [];
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const year = formatReleaseYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);

  return (
    <section className="py-10 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl overflow-hidden">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="w-full aspect-poster bg-card flex items-center justify-center rounded-xl">
                  <i className="fas fa-film text-6xl text-gray-600"></i>
                </div>
              )}
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="lg:w-2/3">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <Link key={genre.id} href={`/category/${genre.id}`}>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm cursor-pointer">
                    {genre.name}
                  </span>
                </Link>
              ))}
            </div>
            
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">{movie.title}</h1>
            
            <div className="flex items-center mb-6">
              <span className="flex items-center mr-4">
                <i className="fas fa-star text-secondary mr-1"></i>
                <span>{movie.vote_average.toFixed(1)}/10</span>
              </span>
              <span className="mr-4">{year}</span>
              <span>{runtime}</span>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-2">Overview</h3>
              <p className="text-gray-300">
                {movie.overview}
              </p>
            </div>
            
            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-4">Cast</h3>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {cast.slice(0, 10).map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-24">
                      <div className="rounded-full overflow-hidden w-16 h-16 mx-auto mb-2">
                        {person.profile_path ? (
                          <img
                            src={getProfileUrl(person.profile_path)}
                            alt={person.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <i className="fas fa-user text-gray-500"></i>
                          </div>
                        )}
                      </div>
                      <p className="text-center text-sm font-bold line-clamp-1">{person.name}</p>
                      <p className="text-center text-xs text-gray-400 line-clamp-1">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Video Player */}
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-4">Stream</h3>
              <VideoPlayer tmdbId={movieId} />
            </div>
            
            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <div>
                <h3 className="font-bold text-xl mb-4">You May Also Like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {similarMovies.slice(0, 4).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} showRating={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MovieDetailsLoading() {
  return (
    <section className="py-10 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster Skeleton */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Skeleton className="aspect-poster w-full rounded-xl" />
            </div>
          </div>
          
          {/* Info Skeleton */}
          <div className="lg:w-2/3 space-y-6">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            
            <Skeleton className="h-10 w-3/4" />
            
            <div className="flex gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-8 w-24" />
              <div className="flex gap-4 overflow-x-auto">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-24 space-y-2">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="aspect-video w-full rounded-xl" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="aspect-poster w-full rounded-lg" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
