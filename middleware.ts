import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middlewareDebug = process.env.MIDDLEWARE_DEBUG;

// This middleware protects all /api routes except /api/promotional-tags
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log("Middleware Url :: ", pathname + '/n');
  // console.log("Middleware path Token :: ", EXCLUDED_PATHS.some(excluded => pathname.startsWith(excluded)));

  // ✅ Exclude /api/promotional-tags from auth check
  if (req.method === "GET" && EXCLUDED_PATHS.some(excluded => pathname.startsWith(excluded))) {
    // const origin = req.headers.get("x-site-origin");
    // const clientKey = req.headers.get("x-client-key");

    // console.log(`Origin - ${origin} :: ClientKEY - ${clientKey}`)

    // if ( origin !== process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || clientKey !== process.env.NEXT_PUBLIC_CLIENT_KEY) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Unauthorized access" }),
    //     {
    //       status: 403,
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // }

    // // Allow request if headers are valid
    return NextResponse.next();
  }

  const sessionToken =
    req.cookies.get("authjs.session-token") || // Auth.js default cookie name
    req.cookies.get("next-auth.session-token"); // fallback for older NextAuth.js setups

    if(middlewareDebug === 'true') {
       console.log("middleware executed ::", '');
      console.log("Middleware Url :: ", pathname + '\n');
      console.log("Middleware path Token :: ", EXCLUDED_PATHS.some(excluded => pathname.startsWith(excluded)));
       console.log("Middleware Session Token :: ", sessionToken);
    }

  if (!sessionToken) {
    // Block API access with JSON response
    if (pathname.startsWith("/api")) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Optional: redirect for non-API routes
    // return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all /api routes
export const config = {
  matcher: ["/api/:path*"],
};

const EXCLUDED_PATHS = [
  "/api/promotional-tags",
  "/api/categories",
  "/api/product",
  "/api/discounts",
  "/thankyou/",
  "/api/orders/"
]