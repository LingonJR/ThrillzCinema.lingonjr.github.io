import { useEffect, useRef } from "react";
import { getVidSrcUrl } from "@/lib/tmdb";

interface VideoPlayerProps {
  tmdbId: number;
  mediaType?: 'movie' | 'tv';
}

export default function VideoPlayer({ tmdbId, mediaType = 'movie' }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const vidSrcUrl = getVidSrcUrl(tmdbId, mediaType);

  useEffect(() => {
    // Set iframe attributes dynamically if needed
    if (iframeRef.current) {
      iframeRef.current.setAttribute("allowfullscreen", "true");
    }
  }, []);

  return (
    <div className="aspect-video bg-background rounded-xl overflow-hidden relative">
      <iframe
        ref={iframeRef}
        src={vidSrcUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={mediaType === 'tv' ? "TV Series Player" : "Movie Player"}
      ></iframe>
    </div>
  );
}
