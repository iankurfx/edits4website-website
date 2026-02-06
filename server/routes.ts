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

  const youtubeEmbeds = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/jNQXAC9IVRw",
    "https://www.youtube.com/embed/9bZkp7q19f0",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
  ];

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
  
  for (let i = 0; i < 50; i++) {
    const base = templates[i % templates.length];
    const title = `${base.title} ${Math.floor(i / 12) + 1}`;
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
    
    const collection = await storage.createCollection({
      title: title,
      slug: slug,
      description: `Create amazing videos with the ${title} CapCut template.`,
      coverImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=500&h=800&fit=crop`,
      isTrending: base.isTrending,
      isNew: base.isNew,
    });

    const variantNames = ["Original", "Slow Motion", "Beat Sync", "Flash Warning", "Color Grade", "Speed Ramp"];
    
    for (const vName of variantNames) {
      await storage.createVariant({
        collectionId: collection.id,
        name: vName,
        previewVideoUrl: youtubeEmbeds[Math.floor(Math.random() * youtubeEmbeds.length)],
        templateLink: "https://www.capcut.com/t/ZmFqA1B2C/", // Real-looking example link
      });
    }
  }
  
  console.log("Seeding complete.");
}
