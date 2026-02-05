import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export auth models so they are available
export * from "./models/auth";

// === TABLE DEFINITIONS ===

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  coverImage: text("cover_image").notNull(),
  isTrending: boolean("is_trending").default(false),
  isNew: boolean("is_new").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const variants = pgTable("variants", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull(),
  name: text("name").notNull(), // e.g., "V1", "Beat Sync", "Slow Motion"
  previewVideoUrl: text("preview_video_url").notNull(),
  templateLink: text("template_link").notNull(), // The actual CapCut link
  createdAt: timestamp("created_at").defaultNow(),
});

export const editRequests = pgTable("edit_requests", {
  id: serial("id").primaryKey(),
  userEmail: text("user_email").notNull(),
  templateName: text("template_name").notNull(),
  message: text("message"),
  status: text("status", { enum: ["pending", "completed"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===

export const collectionsRelations = relations(collections, ({ many }) => ({
  variants: many(variants),
}));

export const variantsRelations = relations(variants, ({ one }) => ({
  collection: one(collections, {
    fields: [variants.collectionId],
    references: [collections.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertCollectionSchema = createInsertSchema(collections).omit({ id: true, createdAt: true });
export const insertVariantSchema = createInsertSchema(variants).omit({ id: true, createdAt: true });
export const insertEditRequestSchema = createInsertSchema(editRequests).omit({ id: true, createdAt: true, status: true });

// === EXPLICIT API CONTRACT TYPES ===

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Variant = typeof variants.$inferSelect;
export type InsertVariant = z.infer<typeof insertVariantSchema>;
export type EditRequest = typeof editRequests.$inferSelect;
export type InsertEditRequest = z.infer<typeof insertEditRequestSchema>;

// Response types
export type CollectionWithVariants = Collection & { variants: Variant[] };

// Query params
export interface CollectionsQueryParams {
  search?: string;
  filter?: 'trending' | 'new';
}
