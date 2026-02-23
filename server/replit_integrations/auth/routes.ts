import type { Express } from "express";
import { isAuthenticated } from "./replitAuth";

// Register auth-specific routes
export function registerAuthRoutes(app: Express): void {
  // Get current authenticated user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      // In local dev auth mode, we don't persist users to DB.
      if (process.env.USE_LOCAL_AUTH === "true" || process.env.USE_LOCAL_AUTH === "1" || !process.env.REPL_ID) {
        return res.json({
          id: "local-user",
          email: "local@example.com",
          firstName: "Local",
          lastName: "User",
          profileImageUrl: null,
        });
      }

      const userId = req.user.claims.sub;
      const { authStorage } = await import("./storage");
      const user = await authStorage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}
