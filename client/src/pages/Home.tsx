import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Movie, Genre } from "@shared/schema";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import CategoryCard from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mapping of genre IDs to icon names and colors for category cards
const GENRE_ICONS: Record<number, { icon: string; color: string }> = {
  28: { icon: "fire", color: "primary" },       // Action
  35: { icon: "laugh", color: "secondary" },    // Comedy
  18: { icon: "theater-masks", color: "blue-500" }, // Drama
  27: { icon: "skull", color: "red-600" },      // Horror
  878: { icon: "robot", color: "purple-500" },  // Sci-Fi
  16: { icon: "child", color: "green-500" },    // Animation
  10751: { icon: "home", color: "pink-500" },   // Family
  9648: { icon: "search", color: "yellow-500" }, // Mystery
};

export default function Home() {
  // Fetch trending movies
  const { data: trendingData, isLoading: isTrendingLoading } = useQuery({
    queryKey: ["/api/movies/trending"],
  });

  // Fetch popular movies (for latest section)
  const { data: popularData, isLoading: isPopularLoading } = useQuery({
    queryKey: ["/api/movies/popular"],
  });

  // Fetch genres
  const { data: genresData, isLoading: isGenresLoading } = useQuery({
    queryKey: ["/api/genres"],
  });

  const trendingMovies = trendingData?.results as Movie[] || [];
  const popularMovies = popularData?.results as Movie[] || [];
  const genres = genresData?.genres as Genre[] || [];

  // Featured movie is the first trending movie
  const featuredMovie = trendingMovies[0];

  // Filter genres to only those we have icons for
  const displayGenres = genres.filter(genre => GENRE_ICONS[genre.id]);

  return (
    <>
      {/* Hero Section */}
      {isTrendingLoading || !featuredMovie ? (
        <div className="relative h-[60vh] md:h-[80vh] bg-card">
          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative">
            <div className="max-w-2xl w-full space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HeroSection movie={featuredMovie} />
      )}

      {/* Trending Section */}
      <section id="trending" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-2xl">Trending Now</h2>
            <Link href="/category/trending" className="text-primary hover:text-secondary transition-colors">
              View All <i className="fas fa-chevron-right ml-1"></i>
            </Link>
          </div>
          
          {isTrendingLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-poster w-full rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {trendingMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="categories" className="py-10 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl mb-6">Browse by Category</h2>
          
          {isGenresLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="w-full h-24 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayGenres.slice(0, 6).map((genre) => (
                <CategoryCard 
                  key={genre.id} 
                  id={genre.id} 
                  name={genre.name} 
                  icon={GENRE_ICONS[genre.id].icon} 
                  color={GENRE_ICONS[genre.id].color} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Movies Section */}
      <section id="latest" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-2xl">Latest Movies</h2>
            <Link href="/category/popular" className="text-primary hover:text-secondary transition-colors">
              View All <i className="fas fa-chevron-right ml-1"></i>
            </Link>
          </div>
          
          {isPopularLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-poster w-full rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {popularMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
