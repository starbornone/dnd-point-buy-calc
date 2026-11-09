import { LOCALE_HEADER, readLocale } from "@/i18n/locale";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, readLocale(request.nextUrl.search));
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: "/" };
