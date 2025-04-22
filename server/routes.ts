import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { storage } from "./storage";
import { MediaItem, Movie, TVSeries } from "@shared/schema";

const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for getting movie data from TMDB
  app.get("/api/movies/trending", async (req, res) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      res.status(500).json({ message: "Failed to fetch trending movies" });
    }
  });

  app.get("/api/movies/popular", async (req, res) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      res.status(500).json({ message: "Failed to fetch popular movies" });
    }
  });

  app.get("/api/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,similar`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      res.status(500).json({ message: "Failed to fetch movie details" });
    }
  });

  // Multi-search endpoint that includes both movies and TV shows
  app.get("/api/search/multi", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
      );
      
      // Sort the results by popularity (highest to lowest)
      const data = response.data;
      if (data.results && Array.isArray(data.results)) {
        data.results.sort((a: any, b: any) => b.popularity - a.popularity);
        
        // Calculate total runtime for TV series
        data.results = await Promise.all(data.results.map(async (item: any) => {
          if (item.media_type === 'tv') {
            try {
              // Get detailed TV show info to calculate total runtime
              const tvDetails = await axios.get(
                `${TMDB_BASE_URL}/tv/${item.id}?api_key=${TMDB_API_KEY}`
              );
              
              const episodeRuntime = tvDetails.data.episode_run_time && tvDetails.data.episode_run_time.length 
                ? tvDetails.data.episode_run_time[0] 
                : 30; // Default to 30 minutes if no runtime data
              
              const totalEpisodes = tvDetails.data.number_of_episodes || 0;
              const totalRuntime = episodeRuntime * totalEpisodes;
              
              return {
                ...item,
                number_of_seasons: tvDetails.data.number_of_seasons,
                number_of_episodes: totalEpisodes,
                episode_run_time: tvDetails.data.episode_run_time || [episodeRuntime],
                total_runtime: totalRuntime
              };
            } catch (err) {
              console.error(`Error fetching TV details for ${item.id}:`, err);
              return item;
            }
          }
          return item;
        }));
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error searching media:", error);
      res.status(500).json({ message: "Failed to search for media" });
    }
  });
  
  // Keep the original movie search endpoint for backward compatibility
  app.get("/api/search/movies", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );
      
      // Sort the results by popularity (highest to lowest)
      const data = response.data;
      if (data.results && Array.isArray(data.results)) {
        data.results.sort((a: any, b: any) => b.popularity - a.popularity);
      }
      
      res.json(data);
    } catch (error) {
      console.error("Error searching movies:", error);
      res.status(500).json({ message: "Failed to search movies" });
    }
  });

  app.get("/api/movies/genre/:genreId", async (req, res) => {
    try {
      const { genreId } = req.params;
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      res.status(500).json({ message: "Failed to fetch movies by genre" });
    }
  });

  // Get TV show details
  app.get("/api/tv/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await axios.get(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,similar`
      );
      
      // Calculate total runtime
      const episodeRuntime = response.data.episode_run_time && response.data.episode_run_time.length 
        ? response.data.episode_run_time[0] 
        : 30; // Default to 30 minutes if no runtime data
      
      const totalEpisodes = response.data.number_of_episodes || 0;
      const totalRuntime = episodeRuntime * totalEpisodes;
      
      const data = {
        ...response.data,
        total_runtime: totalRuntime
      };
      
      res.json(data);
    } catch (error) {
      console.error("Error fetching TV series details:", error);
      res.status(500).json({ message: "Failed to fetch TV series details" });
    }
  });
  
  // Get trending TV shows
  app.get("/api/tv/trending", async (req, res) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
      res.status(500).json({ message: "Failed to fetch trending TV shows" });
    }
  });
  
  // Get popular TV shows
  app.get("/api/tv/popular", async (req, res) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
      res.status(500).json({ message: "Failed to fetch popular TV shows" });
    }
  });

  app.get("/api/genres", async (req, res) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ message: "Failed to fetch genres" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
