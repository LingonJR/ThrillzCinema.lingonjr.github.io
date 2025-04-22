import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Movie, Genre } from "@shared/schema";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

// Map of category IDs to titles
const CATEGORY_TITLES: Record<string, string> = {
  "trending": "Trending Movies",
  "popular": "Popular Movies",
};

export default function Category() {
  const { id } = useParams();
  const isNumeric = /^\d+$/.test(id);
  
  // Determine API endpoint based on category ID
  const apiEndpoint = isNumeric 
    ? `/api/movies/genre/${id}` 
    : id === "trending" 
      ? "/api/movies/trending" 
      : "/api/movies/popular";

  // Fetch movies for this category
  const { data: moviesData, isLoading: isMoviesLoading } = useQuery({
    queryKey: [apiEndpoint],
  });

  // Fetch genres to get the genre name
  const { data: genresData, isLoading: isGenresLoading } = useQuery({
    queryKey: ["/api/genres"],
    enabled: isNumeric,
  });

  const movies = moviesData?.results as Movie[] || [];
  const genres = genresData?.genres as Genre[] || [];
  
  // Find the genre name if this is a genre category
  let categoryTitle = "";
  if (isNumeric) {
    const genre = genres.find(g => g.id === parseInt(id));
    categoryTitle = genre ? `${genre.name} Movies` : "Loading...";
  } else {
    categoryTitle = CATEGORY_TITLES[id] || "Movies";
  }

  const isLoading = isMoviesLoading || (isNumeric && isGenresLoading);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading font-bold text-3xl mb-6">
        {isLoading && isNumeric ? (
          <Skeleton className="h-10 w-60" />
        ) : (
          categoryTitle
        )}
      </h1>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-poster w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      
      {!isLoading && movies.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-film text-4xl text-gray-500 mb-4"></i>
          <p className="text-gray-400">No movies found in this category.</p>
        </div>
      )}
    </div>
  );
}
