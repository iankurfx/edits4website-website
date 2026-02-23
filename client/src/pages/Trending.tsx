import { useCollections } from "@/hooks/use-collections";
import Home from "./Home";

// Re-using Home component logic but forcing "trending" filter
export default function Trending() {
  return <Home filter="trending" />;
}
