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
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-card border border-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 mb-6"
      >
        {/* Aspect Ratio Container (9:16 approx) */}
        <div className="relative aspect-[9/14] overflow-hidden">
          {/* Media Content */}
          {collection.coverImage?.includes("youtube.com/embed") ? (
            <iframe
              src={collection.coverImage}
              className="w-full h-full border-0 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <img 
              src={collection.coverImage} 
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {collection.isTrending && (
              <div className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                <TrendingUp size={12} /> TRENDING
              </div>
            )}
            {collection.isNew && (
              <div className="bg-blue-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                <Sparkles size={12} /> NEW
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {collection.title}
            </h3>
            <p className="text-xs text-white/60 mb-3 line-clamp-2">
              {collection.description || "Discover the best variations for this trending template."}
            </p>
            
            <div className="flex items-center gap-2 text-xs font-medium text-white/80 group-hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Play size={10} fill="currentColor" />
              </span>
              View Variations
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
