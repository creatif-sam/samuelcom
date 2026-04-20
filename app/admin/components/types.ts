// Shared types for admin dashboard components

export interface BlogPost {
  id: string; title: string; slug: string; category: string;
  published: boolean; excerpt: string | null; content: string | null;
  read_time_minutes: number; featured_image_url: string | null;
  cover_image_url: string | null; mid_image_url: string | null;
  infographic_url: string | null;
  photo_attachments?: { url: string; caption?: string; alt?: string }[] | null;
  spotify_url?: string | null;
  created_at: string;
}

export interface Subscriber {
  id: string; email: string; name: string | null;
  created_at: string; confirmed: boolean;
  interests?: string[] | null;
}

export interface Message {
  id: string; name: string; email: string; subject: string | null;
  message: string; read: boolean; created_at: string;
}

export interface EmailLog {
  id: string; resend_id: string | null; to_email: string;
  from_email: string; subject: string; body_html: string | null;
  body_text: string | null; status: string; opened_at: string | null;
  sent_at: string; template_id: string | null;
}

export interface EmailTemplate {
  id: string; name: string; subject: string;
  body_html: string; body_text: string; created_at: string;
}

export interface InboundEmail {
  id: string; from_email: string; from_name: string | null;
  to_email: string | null; subject: string | null;
  body_text: string | null; body_html: string | null;
  read: boolean; received_at: string;
}

export interface PageViewRow {
  page_path: string; visitor_id: string; created_at: string;
}

export interface AnalyticsData {
  totalViews: number; uniqueVisitors: number;
  topPages: { path: string; count: number }[];
  dailyViews: { date: string; count: number }[];
}

export interface Testimonial {
  id: string; name: string; role: string | null; company: string | null;
  avatar_url: string | null; quote: string; rating: number;
  published: boolean; sort_order: number; created_at: string;
}

export type Tab = "overview" | "analytics" | "posts" | "subscribers" | "messages" | "mail" | "whatsapp" | "testimonials";
export type MailSubTab = "compose" | "inbox" | "sent" | "templates";

export const CATEGORIES = ["leadership", "intellectuality", "transformation"] as const;

export function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}
