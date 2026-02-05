import { z } from 'zod';
import { insertCollectionSchema, insertVariantSchema, insertEditRequestSchema, collections, variants, editRequests } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  collections: {
    list: {
      method: 'GET' as const,
      path: '/api/collections',
      input: z.object({
        search: z.string().optional(),
        filter: z.enum(['trending', 'new']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof collections.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/collections/:slug',
      responses: {
        200: z.custom<typeof collections.$inferSelect & { variants: typeof variants.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
    // Admin routes (optional for now, but good to have)
    create: {
      method: 'POST' as const,
      path: '/api/collections',
      input: insertCollectionSchema,
      responses: {
        201: z.custom<typeof collections.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  editRequests: {
    create: {
      method: 'POST' as const,
      path: '/api/edit-requests',
      input: insertEditRequestSchema,
      responses: {
        201: z.custom<typeof editRequests.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CollectionResponse = z.infer<typeof api.collections.get.responses[200]>;
export type EditRequestInput = z.infer<typeof api.editRequests.create.input>;
