import { NextRequest, NextResponse } from "next/server";
import {
  refreshAccessToken,
  verifyAccessToken,
} from "helpers/jwt";
import configs from "configs";

const publicPages = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (publicPages.includes(req.nextUrl.pathname)) {
    if (accessToken) {
      try {
        await verifyAccessToken(accessToken);
        req.nextUrl.pathname = "/";
        return NextResponse.redirect(req.nextUrl);
      } catch {
        if (refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            response.cookies.set("accessToken", newAccessToken, {
              maxAge: Number(configs.jwt.accessTokenExpireIn),
              httpOnly: false
            });
          } catch {
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
          }
        }
        return response;
      }
    }
    if (!accessToken) {
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          response.cookies.set("accessToken", newAccessToken, {
            maxAge: Number(configs.jwt.accessTokenExpireIn),
            httpOnly: false
          });
        } catch (error) {
          response.cookies.delete("refreshToken");
        }
      }
      return response;
    }
  } else {
    if (accessToken) {
      try {
        await verifyAccessToken(accessToken);
      } catch {
        if (refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            response.cookies.set("accessToken", newAccessToken, {
              maxAge: Number(configs.jwt.accessTokenExpireIn),
              httpOnly: false
            });
            return response
          } catch {
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            req.nextUrl.pathname = "/login";
            return NextResponse.redirect(req.nextUrl);
          }
        }
        response.cookies.delete("accessToken");
        req.nextUrl.pathname = "/login";
        return NextResponse.redirect(req.nextUrl);
      }
    }
    if (!accessToken) {
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          response.cookies.set("accessToken", newAccessToken, {
            maxAge: Number(configs.jwt.accessTokenExpireIn),
            httpOnly: false
          });
          return response
        } catch {
          response.cookies.delete("refreshToken");
          req.nextUrl.pathname = "/login";
          return NextResponse.redirect(req.nextUrl);
        }
      }
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
