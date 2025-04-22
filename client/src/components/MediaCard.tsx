import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { MediaItem, Movie, TVSeries } from "@shared/schema";
import { 
  getPosterUrl, 
  formatReleaseYear, 
  formatRating, 
  formatTotalRuntime 
} from "@/lib/tmdb";

interface MediaCardProps {
  item: MediaItem;
  showRating?: boolean;
}

export default function MediaCard({ item, showRating = true }: MediaCardProps) {
  const isMovie = !item.media_type || item.media_type === 'movie';
  const isTVShow = item.media_type === 'tv';
  
  // Handle movie-specific data
  const movie = isMovie ? item as Movie : null;
  // Handle TV-specific data
  const tvShow = isTVShow ? item as TVSeries : null;
  
  // Common properties across both types
  const id = item.id;
  const posterPath = item.poster_path;
  const voteAverage = item.vote_average;
  
  // Media-type specific properties
  const title = isMovie ? movie?.title : tvShow?.name;
  const releaseDate = isMovie 
    ? movie?.release_date 
    : tvShow?.first_air_date;
  
  const linkUrl = isMovie 
    ? `/movie/${id}` 
    : `/tv/${id}`;
  
  // TV show specific display - total runtime
  const totalRuntime = isTVShow && tvShow?.total_runtime 
    ? formatTotalRuntime(tvShow.total_runtime) 
    : null;
  
  return (
    <Link href={linkUrl}>
      <div className="group cursor-pointer relative flex flex-col overflow-hidden rounded-lg transition-all">
        {/* Poster Image */}
        <div className="relative aspect-poster overflow-hidden rounded-lg bg-gray-800">
          <img
            src={getPosterUrl(posterPath, 'w342')}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Media Type Badge */}
          <div className="absolute top-2 left-2">
            <Badge 
              variant="outline" 
              className={`bg-black/70 text-white border-none text-xs ${
                isTVShow ? 'bg-primary/70' : 'bg-blue-500/70'
              }`}
            >
              {isTVShow ? 'TV' : 'Movie'}
            </Badge>
          </div>
          
          {/* Rating Badge */}
          {showRating && voteAverage > 0 && (
            <div className="absolute top-2 right-2">
              <Badge 
                variant="outline" 
                className="bg-black/70 text-white border-none"
              >
                <span className="text-yellow-400 mr-1">★</span> 
                {formatRating(voteAverage)}
              </Badge>
            </div>
          )}
        </div>
        
        {/* Title & Year */}
        <div className="mt-2">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-400">
              {releaseDate ? formatReleaseYear(releaseDate) : 'TBA'}
            </p>
            
            {/* Show total runtime for TV series */}
            {isTVShow && totalRuntime && (
              <p className="text-xs text-primary font-medium ml-auto">
                {totalRuntime}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}