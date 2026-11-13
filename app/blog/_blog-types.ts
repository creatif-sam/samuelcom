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
  leadership:      "linear-gradient(135deg,#0b1230 0%,#3547d1 55%,#7c8ffc 100%)",
  intellectuality: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 40%,#60a5fa 100%)",
  transformation:  "linear-gradient(135deg,#121b45 0%,#2a3aa8 50%,#546cfa 100%)",
};

export const PAGE_SIZE = 6;

export function fmtCard(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
