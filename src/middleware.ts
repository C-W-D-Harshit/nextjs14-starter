import { auth } from "./auth";

export default auth((req, res) => {
  if (!req.auth) {
    // const url = req.url.replace(req.nextUrl.pathname, "/login");
    return Response.redirect(new URL("/auth/login", req.url));
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|auth|_next/image|favicon.ico).*)"],
};
