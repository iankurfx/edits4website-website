import { Link } from "wouter";
import { Play, TrendingUp, Sparkles } from "lucide-react";
import { type Collection } from "@shared/schema";
import { motion } from "framer-motion";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/template/${collection.slug}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative cursor-pointer overflow-hidden rounded-[16px] bg-card border border-white/5 hover:border-primary/50 hover:shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 mb-3 md:mb-4"
      >
        {/* Aspect Ratio Container (9:16) - Taller as requested */}
        <div className="relative aspect-[9/16] overflow-hidden">
          {/* Media Content */}
          {collection.coverImage?.includes("youtube.com/embed") ? (
            <iframe
              src={`${collection.coverImage}${collection.coverImage.includes('?') ? '&' : '?'}controls=1&rel=0&modestbranding=1`}
              className="w-full h-full border-0 pointer-events-none" // pointer-events-none to prevent iframe interaction stealing click
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <img
              src={collection.coverImage}
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}

          {/* Overlay Gradient - Stronger at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {collection.isTrending && (
              <div className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg">
                <TrendingUp size={10} /> TRENDING
              </div>
            )}
            {collection.isNew && (
              <div className="bg-blue-500/90 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg">
                <Sparkles size={10} /> NEW
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-display font-bold text-white mb-0.5 leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {collection.title}
            </h3>
            <p className="text-[10px] text-white/60 mb-2 line-clamp-1">
              {collection.description || "Viral CapCut Template"}
            </p>

            <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/80 group-hover:text-white transition-colors">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Play size={8} fill="currentColor" />
              </span>
              Preview
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
