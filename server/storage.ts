import { db } from "./db";
import {
  collections, variants, editRequests,
  type InsertCollection, type InsertVariant, type InsertEditRequest,
  type Collection, type Variant, type EditRequest
} from "@shared/schema";
import { eq, desc, or, ilike } from "drizzle-orm";

export interface IStorage {
  // Collections
  getCollections(search?: string, filter?: 'trending' | 'new'): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<(Collection & { variants: Variant[] }) | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  
  // Variants
  createVariant(variant: InsertVariant): Promise<Variant>;
  
  // Edit Requests
  createEditRequest(request: InsertEditRequest): Promise<EditRequest>;
}

export class DatabaseStorage implements IStorage {
  async getCollections(search?: string, filter?: 'trending' | 'new'): Promise<Collection[]> {
    let query = db.select().from(collections);
    
    const conditions = [];
    
    if (search) {
      conditions.push(
        or(
          ilike(collections.title, `%${search}%`),
          ilike(collections.description, `%${search}%`)
        )
      );
    }
    
    if (filter === 'trending') {
      conditions.push(eq(collections.isTrending, true));
    } else if (filter === 'new') {
      conditions.push(eq(collections.isNew, true));
    }
    
    // Default sort by creation date
    return await query
      .where(or(...conditions))
      .orderBy(desc(collections.createdAt));
  }

  async getCollectionBySlug(slug: string): Promise<(Collection & { variants: Variant[] }) | undefined> {
    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, slug));
      
    if (!collection) return undefined;
    
    const collectionVariants = await db
      .select()
      .from(variants)
      .where(eq(variants.collectionId, collection.id));
      
    return { ...collection, variants: collectionVariants };
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const [collection] = await db
      .insert(collections)
      .values(insertCollection)
      .returning();
    return collection;
  }

  async createVariant(insertVariant: InsertVariant): Promise<Variant> {
    const [variant] = await db
      .insert(variants)
      .values(insertVariant)
      .returning();
    return variant;
  }

  async createEditRequest(insertRequest: InsertEditRequest): Promise<EditRequest> {
    const [request] = await db
      .insert(editRequests)
      .values(insertRequest)
      .returning();
    return request;
  }
}

export const storage = new DatabaseStorage();
