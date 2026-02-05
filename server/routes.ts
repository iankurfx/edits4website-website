import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // === Collections ===
  app.get(api.collections.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const filter = req.query.filter as 'trending' | 'new' | undefined;
    const collections = await storage.getCollections(search, filter);
    res.json(collections);
  });

  app.get(api.collections.get.path, async (req, res) => {
    const collection = await storage.getCollectionBySlug(req.params.slug);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  });

  app.post(api.collections.create.path, async (req, res) => {
    try {
      const input = api.collections.create.input.parse(req.body);
      const collection = await storage.createCollection(input);
      res.status(201).json(collection);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === Edit Requests ===
  app.post(api.editRequests.create.path, async (req, res) => {
    try {
      const input = api.editRequests.create.input.parse(req.body);
      const request = await storage.createEditRequest(input);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data if Empty
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getCollections();
  if (existing.length > 0) return;

  console.log("Seeding database with CapCut templates...");

  const templates = [
    { title: "Tiki Tiki", isTrending: true, isNew: false },
    { title: "Slow Motion Blur", isTrending: true, isNew: false },
    { title: "Beat Sync 2024", isTrending: false, isNew: true },
    { title: "Cinematic Travel", isTrending: true, isNew: false },
    { title: "Anime Style", isTrending: false, isNew: true },
    { title: "Retro VHS", isTrending: false, isNew: true },
    { title: "Glitch Effect", isTrending: true, isNew: false },
    { title: "Neon Vibes", isTrending: true, isNew: true },
    { title: "Summer Vlog", isTrending: true, isNew: false },
    { title: "Sad Song Lyrics", isTrending: false, isNew: false },
    { title: "Fast Transitions", isTrending: true, isNew: false },
    { title: "3D Zoom Pro", isTrending: true, isNew: true },
  ];
  
  // Fill up to 50 items by repeating/varying
  const fullTemplates = [];
  for (let i = 0; i < 50; i++) {
    const base = templates[i % templates.length];
    fullTemplates.push({
      title: `${base.title} ${Math.floor(i / 12) + 1}`, // e.g. Tiki Tiki 1, Tiki Tiki 2...
      isTrending: base.isTrending,
      isNew: base.isNew,
    });
  }

  for (const t of fullTemplates) {
    const slug = t.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
    
    // Create Collection
    const collection = await storage.createCollection({
      title: t.title,
      slug: slug,
      description: `Create amazing videos with the ${t.title} CapCut template. Trending on TikTok and Reels.`,
      coverImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=500&h=800&fit=crop`, // Dummy unsplash
      isTrending: t.isTrending,
      isNew: t.isNew,
    });

    // Create 6 Variants for each
    const variantNames = ["Original", "Slow Motion", "Beat Sync", "Flash Warning", "Color Grade", "Speed Ramp"];
    
    for (const vName of variantNames) {
      await storage.createVariant({
        collectionId: collection.id,
        name: vName,
        previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4", // Placeholder video
        templateLink: "https://www.capcut.com/template/dummy-link", // Placeholder link
      });
    }
  }
  
  console.log("Seeding complete.");
}
