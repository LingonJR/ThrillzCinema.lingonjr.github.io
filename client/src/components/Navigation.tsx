import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-primary/30 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary text-3xl mr-2 fire-gradient-text">
              <i className="fas fa-film"></i>
            </span>
            <span className="font-heading font-bold text-2xl">
              Thrillz<span className="fire-gradient-text">Cinema</span>
            </span>
          </Link>
        </div>
        
        {/* Search Bar - Medium screens and above */}
        <div className="hidden md:block flex-grow max-w-lg mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for movies & TV shows..."
              className="w-full bg-background/60 border-gray-700 rounded-full pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
        
        {/* Navigation links */}
        <div className="flex items-center">
          <Link href="/" className="px-3 py-2 text-foreground hover:fire-gradient-text transition-colors">
            Home
          </Link>
          <Link href="/category/28" className="px-3 py-2 text-foreground hover:fire-gradient-text transition-colors">
            Movies
          </Link>
          <Link href="/#trending" className="px-3 py-2 text-foreground hover:fire-gradient-text transition-colors">
            Trending
          </Link>
          <Link href="/contact" className="px-3 py-2 text-foreground hover:fire-gradient-text transition-colors">
            Contact
          </Link>
        </div>
      </nav>
      
      {/* Search bar - Mobile only */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search for movies & TV shows..."
            className="w-full bg-background/60 border-gray-700 rounded-full pl-10 pr-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
        </form>
      </div>
    </header>
  );
}
