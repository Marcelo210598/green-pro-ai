// Simple in-memory rate limiter — persists during warm serverless instances.
// Limits: 30 req/min for general API, 5 req/min for auth endpoints.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function check(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= max) return false;
  bucket.count++;
  return true;
}

// Clears stale entries periodically to avoid memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, 5 * 60_000);
}

export function rateLimit(ip: string, type: "api" | "auth" = "api"): boolean {
  const max = type === "auth" ? 5 : 30;
  const window = 60_000; // 1 minute
  return check(`${type}:${ip}`, max, window);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
