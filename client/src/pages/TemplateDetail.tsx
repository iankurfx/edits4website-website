import { useCollection } from "@/hooks/use-collections";
import { useRoute } from "wouter";
import { Loader2, ArrowLeft, Play, Lock, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { EditRequestDialog } from "@/components/ui/EditRequestDialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function TemplateDetail() {
  const [, params] = useRoute("/template/:slug");
  const slug = params?.slug || "";
  const { data: collection, isLoading, error } = useCollection(slug);
  const { user } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-background px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Template Not Found</h2>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  const handleUseTemplate = (url: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to use this premium template.",
        variant: "destructive",
      });
      // Optional: redirect to login after delay
      setTimeout(() => window.location.href = "/api/login", 1500);
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-10">
        <Link href="/" className="inline-flex items-center text-sm text-white/50 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 text-glow">
              {collection.title}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              {collection.description}
            </p>
          </div>
          <div className="flex gap-2">
            {collection.isTrending && (
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Trending
              </span>
            )}
            <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {collection.variants.length} Variations
            </span>
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {collection.variants.map((variant, idx) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.2)]"
          >
            {/* Video Preview Area */}
            <div className="relative aspect-[9/16] bg-black">
              {/* Using video tag if URL is valid video, else img for fallback */}
              <video
                src={variant.previewVideoUrl}
                poster={collection.coverImage} // Fallback poster
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                autoPlay
                muted
                loop
                playsInline
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-display font-bold text-white mb-4">{variant.name}</h3>
                
                <Button 
                  onClick={() => handleUseTemplate(variant.templateLink)}
                  className="w-full bg-white text-black hover:bg-primary hover:text-white font-bold transition-all duration-300 shadow-lg"
                >
                  {user ? (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" /> Use Template
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Login to Use
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 border border-primary/30 text-center">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Don't know how to edit?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Let our professional editors handle the complexity. Send us your clips and we'll deliver a viral-ready video using this template.
            </p>
            <EditRequestDialog />
          </div>
        </div>
      </section>
    </div>
  );
}
