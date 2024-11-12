import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  loginPage: "/",
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
