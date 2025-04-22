import { Movie, TVSeries, MediaItem, SearchResult, Genre } from "@shared/schema";

// TMDB API configurations
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image sizes
export const backdropSizes = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original"
};

export const posterSizes = {
  xsmall: "w92",
  small: "w154",
  medium: "w185",
  large: "w342",
  xlarge: "w500",
  xxlarge: "w780",
  original: "original"
};

export const profileSizes = {
  small: "w45",
  medium: "w185",
  large: "h632",
  original: "original"
};

// Helper functions to get image URLs
export function getBackdropUrl(path: string | null, size = backdropSizes.large): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(path: string | null, size = posterSizes.medium): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(path: string | null, size = profileSizes.medium): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// VidSrc API integration
export function getVidSrcUrl(tmdbId: number, mediaType: string = 'movie'): string {
  return `https://vidsrc.xyz/embed/${mediaType}?tmdb=${tmdbId}`;
}

// Format movie runtime to hours and minutes
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return '?? min';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  
  return `${remainingMinutes} min`;
}

// Format movie release date to year
export function formatReleaseYear(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
}

// Get genres string from genre IDs
export function formatGenres(genres: Genre[]): string {
  if (!genres || !genres.length) return '';
  return genres.slice(0, 3).map(genre => genre.name).join(' • ');
}

// Format rating to one decimal place
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Format total runtime for TV series (in days and hours)
export function formatTotalRuntime(minutes: number | null): string {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days > 0) {
    return `${days}d ${remainingHours}h total`;
  } else {
    return `${hours}h total`;
  }
}
