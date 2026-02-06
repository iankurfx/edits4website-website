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
    const slug = req.params.slug;
    if (typeof slug !== 'string') {
      return res.status(400).json({ message: "Invalid slug" });
    }
    const collection = await storage.getCollectionBySlug(slug);
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

/**
 * GUIDE: MANUALLY ADDING TEMPLATES
 * To add or change templates, edit the 'manualTemplates' array below.
 * Each entry creates one "Box" on the home page with 6 variants.
 */
async function seedDatabase() {
  const existing = await storage.getCollections();
  if (existing.length > 0) return;

  console.log("Seeding database with CapCut templates...");

  const manualTemplates = [
    {
      title: "Tiki Tiki",
      description: "Trending dance template with smooth transitions.",
      coverImage: "https://www.youtube.com/embed/dQw4w9WgXcQ", // YT Link for the Main Box cover
      isTrending: true,
      isNew: false,
      variants: [
        { name: "V1 Original", preview: "https://www.youtube.com/embed/dQw4w9WgXcQ", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Beat Sync", preview: "https://www.youtube.com/embed/jNQXAC9IVRw", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Slow Motion", preview: "https://www.youtube.com/embed/9bZkp7q19f0", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Flash", preview: "https://www.youtube.com/embed/kJQP7kiw5Fk", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "V2 Mix", preview: "https://www.youtube.com/embed/dQw4w9WgXcQ", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Reverb", preview: "https://www.youtube.com/embed/jNQXAC9IVRw", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
      ]
    },
    {
      title: "Slow Motion Blur",
      description: "Elegant slow-mo with aesthetic blur effects.",
      coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&h=800&fit=crop", // Unsplash or YT Link
      isTrending: true,
      isNew: false,
      variants: [
        { name: "Smooth Slow", preview: "https://www.youtube.com/embed/dQw4w9WgXcQ", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Motion Blur", preview: "https://www.youtube.com/embed/jNQXAC9IVRw", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "V3 Aesthetic", preview: "https://www.youtube.com/embed/9bZkp7q19f0", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Dark Mood", preview: "https://www.youtube.com/embed/kJQP7kiw5Fk", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "V4 Soft", preview: "https://www.youtube.com/embed/dQw4w9WgXcQ", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
        { name: "Cinematic", preview: "https://www.youtube.com/embed/jNQXAC9IVRw", link: "https://www.capcut.com/t/ZmFqA1B2C/" },
      ]
    },
    // Add more blocks here as needed...
  ];

  // Logic to insert the manual data
  for (const t of manualTemplates) {
    const slug = t.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
    
    const collection = await storage.createCollection({
      title: t.title,
      slug: slug,
      description: t.description,
      coverImage: t.coverImage,
      isTrending: t.isTrending,
      isNew: t.isNew,
    });

    for (const v of t.variants) {
      await storage.createVariant({
        collectionId: collection.id,
        name: v.name,
        previewVideoUrl: v.preview,
        templateLink: v.link,
      });
    }
  }

  // Optional: Auto-generate the rest to reach 50 boxes
  if (manualTemplates.length < 50) {
    for (let i = manualTemplates.length; i < 50; i++) {
      const title = `Extra Template ${i + 1}`;
      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
      const collection = await storage.createCollection({
        title,
        slug,
        description: "Explore more variations of this popular CapCut style.",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=800&fit=crop",
        isTrending: Math.random() > 0.5,
        isNew: Math.random() > 0.5,
      });
      for (let j = 0; j < 6; j++) {
        await storage.createVariant({
          collectionId: collection.id,
          name: `Variant ${j + 1}`,
          previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          templateLink: "https://www.capcut.com/t/ZmFqA1B2C/",
        });
      }
    }
  }
  
  console.log("Seeding complete.");
}
