import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { TVSeries, CastMember } from "@shared/schema";
import {
  getBackdropUrl,
  getPosterUrl, 
  getProfileUrl,
  formatReleaseYear,
  formatGenres,
  formatRating,
  formatRuntime,
  formatTotalRuntime
} from "@/lib/tmdb";
import VideoPlayer from "@/components/VideoPlayer";
import MediaCard from "@/components/MediaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function TVSeriesDetails() {
  const { id } = useParams();
  
  // Fetch TV show details
  const { data: tvShow, isLoading } = useQuery({
    queryKey: [`/api/tv/${id}`],
  });
  
  if (isLoading) {
    return <TVSeriesDetailsLoading />;
  }

  const {
    name,
    first_air_date,
    overview,
    vote_average,
    poster_path,
    backdrop_path,
    genres = [],
    credits,
    similar,
    number_of_seasons,
    number_of_episodes,
    episode_run_time = [],
    total_runtime
  } = tvShow || {};

  const cast = credits?.cast as CastMember[] || [];
  const similarShows = similar?.results || [];
  const episodeRuntime = episode_run_time.length ? episode_run_time[0] : null;

  return (
    <div>
      {/* Hero section with backdrop */}
      <div 
        className="relative w-full aspect-video md:aspect-[2.4/1] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getBackdropUrl(backdrop_path)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="hidden md:block flex-shrink-0 w-48 lg:w-56 rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={getPosterUrl(poster_path, 'w342')} 
              alt={name} 
              className="w-full h-auto"
            />
          </div>
          
          {/* TV Show Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center mb-2 gap-2">
              <Badge className="bg-primary text-white border-none">TV Series</Badge>
              {vote_average > 0 && (
                <Badge variant="outline" className="border-gray-600 text-yellow-400">
                  <span className="mr-1">★</span> {formatRating(vote_average)}
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{name}</h1>
            
            <div className="flex flex-wrap gap-2 items-center mb-4 text-sm text-gray-300">
              {first_air_date && (
                <span>{formatReleaseYear(first_air_date)}</span>
              )}
              
              {genres.length > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{formatGenres(genres)}</span>
                </>
              )}
              
              {episodeRuntime && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>~{formatRuntime(episodeRuntime)} per episode</span>
                </>
              )}
            </div>
            
            {/* Series Stats */}
            <div className="flex gap-6 mb-4">
              <div>
                <div className="text-xl font-bold text-primary">{number_of_seasons}</div>
                <div className="text-xs text-gray-400">Season{number_of_seasons !== 1 ? 's' : ''}</div>
              </div>
              
              <div>
                <div className="text-xl font-bold text-primary">{number_of_episodes}</div>
                <div className="text-xs text-gray-400">Episode{number_of_episodes !== 1 ? 's' : ''}</div>
              </div>
              
              {total_runtime && (
                <div>
                  <div className="text-xl font-bold text-primary">{formatTotalRuntime(total_runtime)}</div>
                  <div className="text-xs text-gray-400">To watch all</div>
                </div>
              )}
            </div>
            
            <p className="text-sm md:text-base text-gray-300 line-clamp-3 md:line-clamp-4 mb-4">
              {overview}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition">
                Play Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-medium transition">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Player Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Stream</h2>
        <div className="aspect-video rounded-lg overflow-hidden">
          <VideoPlayer tmdbId={Number(id)} mediaType="tv" />
        </div>
      </div>
      
      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {cast.slice(0, 6).map((person) => (
              <div key={person.id} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square rounded-full overflow-hidden mb-2">
                  <img 
                    src={getProfileUrl(person.profile_path)} 
                    alt={person.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="font-medium text-sm">{person.name}</h3>
                <p className="text-xs text-gray-400">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Similar TV Shows */}
      {similarShows.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Similar TV Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarShows.slice(0, 10).map((show) => (
              <MediaCard 
                key={show.id} 
                item={{...show, media_type: 'tv'}} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TVSeriesDetailsLoading() {
  return (
    <div>
      {/* Hero section skeleton */}
      <div className="relative w-full aspect-video md:aspect-[2.4/1] bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row gap-6">
          {/* Poster skeleton */}
          <div className="hidden md:block flex-shrink-0 w-48 lg:w-56">
            <Skeleton className="w-full aspect-poster rounded-lg" />
          </div>
          
          {/* Info skeleton */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center mb-2 gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-60 mb-4" />
            <div className="flex gap-4 mb-4">
              <Skeleton className="h-12 w-16" />
              <Skeleton className="h-12 w-16" />
              <Skeleton className="h-12 w-16" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Video player skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="w-full aspect-video rounded-lg" />
      </div>
      
      {/* Cast skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-28 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="w-full aspect-square rounded-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Similar shows skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-poster w-full rounded-lg mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}