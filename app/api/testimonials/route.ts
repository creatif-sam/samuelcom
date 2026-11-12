import { createClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id,name,role,company,avatar_url,quote,rating")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(12);
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}

// ── Public submissions: saved as drafts for review in the admin Testimonials tab ──
const MIN_FILL_MS = 4000;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  // Timing trap: bots submit near-instantly after the form appears.
  if (typeof body.startedAt !== "number" || Date.now() - body.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ error: "Please try again." }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const role = clean(body.role, 80);
  const company = clean(body.company, 100);
  const quote = clean(body.quote, 800);
  const rating = Number(body.rating);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (quote.length < 20) return NextResponse.json({ error: "Please write at least a sentence or two." }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a rating." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Please confirm we may publish your testimony." }, { status: 400 });
  }

  try {
    const supabase = createAnonClient();
    // No .select() afterwards: visitors can't read drafts, so asking for the row back would fail.
    const { error } = await supabase.from("testimonials").insert({
      name,
      role: role || null,
      company: company || null,
      avatar_url: null,
      quote,
      rating,
      published: false,
      sort_order: 0,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Testimonial submission failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
