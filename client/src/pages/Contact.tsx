import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-card/40 rounded-xl p-6 md:p-8 shadow-lg">
        <h1 className="font-heading text-3xl font-bold mb-6 text-center fire-gradient-text">Contact Me</h1>
        
        <div className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-lg mb-4">
              Have questions or feedback about Thrillz Cinema? Join my Discord community or contact me directly!
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 127.14 96.36"
                fill="#f97316" // Discord color in orange to match theme
                className="w-10 h-10"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold mb-2 fire-gradient-text">Join My Discord Community</h2>
            <p className="text-center text-gray-300 mb-6">
              Join my active community to discuss movies, get recommendations, report issues, or just chat with fellow movie enthusiasts!
            </p>
            
            <a 
              href="https://discord.gg/4xH59bXENn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Button className="fire-gradient-bg text-white font-medium">
                Join Discord <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          <div className="bg-card rounded-lg p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-10 h-10"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Direct Contact</h2>
            <p className="text-center text-gray-300 mb-4">
              Need to reach out directly? Contact me through Discord:
            </p>
            
            <div className="bg-card/60 p-4 rounded-lg mb-6 fire-border">
              <code className="fire-gradient-text font-semibold text-lg">@lingonjr</code>
            </div>
            
            <p className="text-sm text-gray-400">
              I typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}