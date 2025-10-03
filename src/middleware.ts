
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import rateLimit from "next-rate-limit";

const minuteLimiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
});

const secondLimiter = rateLimit({
    interval: 1000,
    uniqueTokenPerInterval: 500
})

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    let limit

    if (path.startsWith('/api/v1/signup') || path.startsWith("/api/v1/otp-verify")) {
        limit = 10
        try {
            await minuteLimiter.checkNext(req, limit);
            return NextResponse.next();
        } catch {
            return NextResponse.json({ msg: "Rate limit exceeded" }, { status: 429 });
        }
    }

    if (req.headers.has("next-action") && req.method === "POST") {
        limit = 100
        try {
            await secondLimiter.checkNext(req, limit);
            return NextResponse.next();
        } catch {
            return NextResponse.json({ msg: "Rate limit exceeded" }, { status: 429 });
        }
    }

    if (path.startsWith("/api/v1/ws")) {
        limit = 100
        try {
            await secondLimiter.checkNext(req, limit);
            return NextResponse.next();
        } catch {
            return NextResponse.json({ msg: "Rate limit exceeded" }, { status: 429 });
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher: "/:path*",
};

