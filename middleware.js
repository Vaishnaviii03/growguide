import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // No need to manually protect — Clerk handles it
  if (isPublicRoute(req)) {
    return;
  }
  // Automatically protected by Clerk
});

export const config = {
  matcher: [
    // Protect everything except static files
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
