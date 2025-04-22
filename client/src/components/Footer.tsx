import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-primary text-2xl mr-2">
                <i className="fas fa-film"></i>
              </span>
              <span className="font-heading font-bold text-xl">
                Thrillz<span className="text-primary">Cinema</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier destination for streaming the latest movies. Enjoy your favorite films anytime, anywhere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/28" className="text-gray-400 hover:text-primary transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/#trending" className="text-gray-400 hover:text-primary transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/28" className="text-gray-400 hover:text-primary transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/category/35" className="text-gray-400 hover:text-primary transition-colors">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/category/18" className="text-gray-400 hover:text-primary transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/category/27" className="text-gray-400 hover:text-primary transition-colors">
                  Horror
                </Link>
              </li>
              <li>
                <Link href="/category/878" className="text-gray-400 hover:text-primary transition-colors">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Thrillz Cinema. All rights reserved.</p>
          <p className="mt-2">This is a demo project. Movie data provided by TMDB. Movies streamed through vidsrc API.</p>
        </div>
      </div>
    </footer>
  );
}
