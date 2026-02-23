import { useCollections } from "@/hooks/use-collections";
import { CollectionCard } from "@/components/collections/CollectionCard";
import Masonry from "react-masonry-css";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { useSearch } from "@/lib/search-context";

export default function Home({ filter }: { filter?: 'trending' | 'new' }) {
  const { data: collections, isLoading, error } = useCollections(filter);
  const { searchQuery } = useSearch();

  const breakpointColumns = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">Could not load templates. Please try again later.</p>
      </div>
    );
  }

  // Hero Section Image (Unsplash)
  // Cyberpunk city night scene for dark aesthetic
  const heroImage = "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop";

  // Filter collections based on search query
  const filteredCollections = collections?.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-background z-10" />
          <img
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
        </div>

        <div className="container mx-auto relative z-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 tracking-tight"
          >
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary text-glow">Perfect Template/Edit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Curated, trending CapCut templates/edits for your next viral video.
            Updated daily with the freshest edits.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-2 md:px-4 pb-24">
        <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-white/10 pb-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Latest Collections</h2>
          <div className="text-xs md:text-sm text-muted-foreground">Showing {filteredCollections.length} results</div>
        </div>

        {filteredCollections.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-2xl border border-white/5 border-dashed">
            <p className="text-white/40">No templates found matching "{searchQuery}". Check back soon!</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto -ml-3 md:-ml-4"
            columnClassName="pl-3 md:pl-4 bg-clip-padding"
          >
            {filteredCollections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="mb-6">
                  <CollectionCard collection={collection} />
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </section>
    </div>
  );
}
