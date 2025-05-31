// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /**
     * Match all routes except:
     * - static files
     * - API routes
     * - `/sign_in` and its children (important for Clerk)
     */
    "/((?!_next|sign_in|sign_in/.*|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
