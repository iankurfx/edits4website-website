import {
  collections, variants, editRequests,
  type InsertCollection, type InsertVariant, type InsertEditRequest,
  type Collection, type Variant, type EditRequest
} from "@shared/schema";
import { eq, desc, or, ilike } from "drizzle-orm";
import { db } from "./db";

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
      conditions.push(ilike(collections.title, `%${search}%`));
    }
    if (filter === 'trending') {
      conditions.push(eq(collections.isTrending, true));
    }
    if (filter === 'new') {
      conditions.push(eq(collections.isNew, true));
    }

    if (conditions.length > 0) {
      return await db.select().from(collections).where(or(...conditions)).orderBy(desc(collections.createdAt));
    }

    return await db.select().from(collections).orderBy(desc(collections.createdAt));
  }

  async getCollectionBySlug(slug: string): Promise<(Collection & { variants: Variant[] }) | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.slug, slug));

    if (!collection) return undefined;

    const collectionVariants = await db
      .select()
      .from(variants)
      .where(eq(variants.collectionId, collection.id));

    return { ...collection, variants: collectionVariants };
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [newCollection] = await db
      .insert(collections)
      .values({ ...collection, createdAt: new Date() })
      .returning();
    return newCollection;
  }

  async createVariant(variant: InsertVariant): Promise<Variant> {
    const [newVariant] = await db
      .insert(variants)
      .values({ ...variant, createdAt: new Date() })
      .returning();
    return newVariant;
  }

  async createEditRequest(request: InsertEditRequest): Promise<EditRequest> {
    const [newRequest] = await db
      .insert(editRequests)
      .values({ ...request, createdAt: new Date() })
      .returning();
    return newRequest;
  }
}

export const storage: IStorage = new DatabaseStorage();
