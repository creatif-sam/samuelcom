export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  created_at: string;
  read_time_minutes: number;
  featured_image_url: string | null;
}

export const CAT_META: Record<string, { label: string; color: string; bg: string }> = {
  leadership:      { label: "Leadership",      color: "#b45309", bg: "#fef3c7" },
  intellectuality: { label: "Intellectuality", color: "#1d4ed8", bg: "#dbeafe" },
  transformation:  { label: "Transformation",  color: "#be123c", bg: "#fce7f3" },
};

export const CAT_GRADIENTS: Record<string, string> = {
  leadership:      "linear-gradient(135deg,#78350f 0%,#d97706 40%,#fbbf24 100%)",
  intellectuality: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 40%,#60a5fa 100%)",
  transformation:  "linear-gradient(135deg,#881337 0%,#e11d48 40%,#f472b6 100%)",
};

export const PAGE_SIZE = 6;

export function fmtCard(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
