import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes.
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware.

export default authMiddleware({
  publicRoutes: ["/api/db/cart", "/", "/shop/:path", "/products/:path","/cart"],
});
 
export const config = {
  // matcher: ['/api','/admin/:path*'],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 