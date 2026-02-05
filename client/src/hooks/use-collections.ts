import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CollectionResponse, type EditRequestInput } from "@shared/routes";

// === Collections ===

export function useCollections(filter?: 'trending' | 'new', search?: string) {
  return useQuery({
    queryKey: [api.collections.list.path, { filter, search }],
    queryFn: async () => {
      const url = new URL(window.location.origin + api.collections.list.path);
      if (filter) url.searchParams.append("filter", filter);
      if (search) url.searchParams.append("search", search);
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch collections");
      return api.collections.list.responses[200].parse(await res.json());
    },
  });
}

export function useCollection(slug: string) {
  return useQuery({
    queryKey: [api.collections.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.collections.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch collection");
      return api.collections.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// === Edit Requests ===

export function useCreateEditRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EditRequestInput) => {
      const res = await fetch(api.editRequests.create.path, {
        method: api.editRequests.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.editRequests.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create request");
      }
      return api.editRequests.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Could invalidate admin queries here if we had them
    },
  });
}
