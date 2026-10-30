import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/anon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 3000;
const MAX_MESSAGE = 5000;

const RATE_LIMIT_WINDOW_MS = 60_000;
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
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
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

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const organisation = clean(body.organisation, 160);
  const inquiry = clean(body.inquiry, 80);
  const language = clean(body.language, 40);
  const message = clean(body.message, MAX_MESSAGE);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: "Please tell us a little more in your message." }, { status: 400 });

  // contact_messages only has subject + message, so the extra details travel inside them
  const subject = [inquiry || "General enquiry", organisation].filter(Boolean).join(" · ");
  const details = [
    organisation && `Organisation: ${organisation}`,
    language && `Preferred language: ${language}`,
  ].filter(Boolean).join("\n");

  try {
    const supabase = createAnonClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message: details ? `${details}\n\n${message}` : message,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form insert failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again or email us directly." }, { status: 500 });
  }
}
