import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      
      <h1 className="text-5xl font-display font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white/60 mb-8 text-center max-w-md">
        The page you are looking for has vanished into the digital void.
      </p>

      <Link href="/">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
