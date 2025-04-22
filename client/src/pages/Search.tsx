import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { MediaItem } from "@shared/schema";
import MediaCard from "@/components/MediaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const initialQuery = searchParams.get("query") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { data, isLoading } = useQuery({
    queryKey: [`/api/search/multi?query=${encodeURIComponent(debouncedSearchTerm)}`],
    enabled: debouncedSearchTerm.length > 0,
  });

  const mediaItems = data?.results as MediaItem[] || [];
  const totalResults = data?.total_results || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearchTerm(searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading font-bold text-3xl mb-6">Search Movies & TV Shows</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for movies and TV shows..."
            className="bg-card/60 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <i className="fas fa-search mr-2"></i> Search
          </Button>
        </form>
      </div>

      {debouncedSearchTerm && (
        <div className="mb-6">
          {isLoading ? (
            <Skeleton className="h-6 w-60" />
          ) : (
            <h2 className="text-xl">
              {totalResults > 0 
                ? `Found ${totalResults} results for "${debouncedSearchTerm}"` 
                : `No results found for "${debouncedSearchTerm}"`}
            </h2>
          )}
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-poster w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {mediaItems.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
      
      {!isLoading && !debouncedSearchTerm && (
        <div className="text-center py-12">
          <i className="fas fa-search text-4xl text-gray-500 mb-4"></i>
          <p className="text-gray-400">Enter a search term to find movies and TV shows</p>
        </div>
      )}
      
      {!isLoading && debouncedSearchTerm && mediaItems.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-film text-4xl text-gray-500 mb-4"></i>
          <p className="text-gray-400">No results found for your search. Try a different term.</p>
        </div>
      )}
    </div>
  );
}
