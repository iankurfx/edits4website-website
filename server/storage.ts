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
    const { db } = await import("./db");
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
    if (conditions.length > 0) {
      query = query.where(or(...conditions));
    }

    return await query.orderBy(desc(collections.createdAt));
  }

  async getCollectionBySlug(slug: string): Promise<(Collection & { variants: Variant[] }) | undefined> {
    const { db } = await import("./db");
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
    const { db } = await import("./db");
    const [collection] = await db
      .insert(collections)
      .values(insertCollection)
      .returning();
    return collection;
  }

  async createVariant(insertVariant: InsertVariant): Promise<Variant> {
    const { db } = await import("./db");
    const [variant] = await db
      .insert(variants)
      .values(insertVariant)
      .returning();
    return variant;
  }

  async createEditRequest(insertRequest: InsertEditRequest): Promise<EditRequest> {
    const { db } = await import("./db");
    const [request] = await db
      .insert(editRequests)
      .values(insertRequest)
      .returning();
    return request;
  }
}

class MemoryStorage implements IStorage {
  private nextCollectionId = 1;
  private nextVariantId = 1;
  private nextEditRequestId = 1;

  private collections: Collection[] = [];
  private variants: Variant[] = [];
  private editRequests: EditRequest[] = [];

  async getCollections(search?: string, filter?: 'trending' | 'new'): Promise<Collection[]> {
    let result = [...this.collections];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          (c.description ?? "").toLowerCase().includes(s),
      );
    }

    if (filter === "trending") {
      result = result.filter((c) => c.isTrending === true);
    } else if (filter === "new") {
      result = result.filter((c) => c.isNew === true);
    }

    // newest first (mirror DB behavior)
    result.sort((a, b) => (b.createdAt?.getTime?.() ?? 0) - (a.createdAt?.getTime?.() ?? 0));
    return result;
  }

  async getCollectionBySlug(slug: string): Promise<(Collection & { variants: Variant[] }) | undefined> {
    const collection = this.collections.find((c) => c.slug === slug);
    if (!collection) return undefined;
    const collectionVariants = this.variants.filter((v) => v.collectionId === collection.id);
    return { ...collection, variants: collectionVariants };
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const collection: Collection = {
      id: this.nextCollectionId++,
      title: insertCollection.title,
      slug: insertCollection.slug,
      description: insertCollection.description ?? null,
      coverImage: insertCollection.coverImage,
      isTrending: insertCollection.isTrending ?? false,
      isNew: insertCollection.isNew ?? false,
      createdAt: new Date(),
    };
    this.collections.push(collection);
    return collection;
  }

  async createVariant(insertVariant: InsertVariant): Promise<Variant> {
    const variant: Variant = {
      id: this.nextVariantId++,
      collectionId: insertVariant.collectionId,
      name: insertVariant.name,
      previewVideoUrl: insertVariant.previewVideoUrl,
      templateLink: insertVariant.templateLink,
      createdAt: new Date(),
    };
    this.variants.push(variant);
    return variant;
  }

  async createEditRequest(insertRequest: InsertEditRequest): Promise<EditRequest> {
    const request: EditRequest = {
      id: this.nextEditRequestId++,
      userEmail: insertRequest.userEmail,
      templateName: insertRequest.templateName,
      message: insertRequest.message ?? null,
      status: "pending",
      createdAt: new Date(),
    };
    this.editRequests.push(request);
    return request;
  }
}

const shouldUseMemoryStorage =
  process.env.USE_MEMORY_STORAGE === "true" ||
  process.env.USE_MEMORY_STORAGE === "1" ||
  !process.env.DATABASE_URL;

export const storage: IStorage = shouldUseMemoryStorage
  ? new MemoryStorage()
  : new DatabaseStorage();
