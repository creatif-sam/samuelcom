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

export const SAMPLE_POSTS: Post[] = [
  { id: "s2",  title: "Fifteen Years of Leading: What No One Taught Me",              slug: "fifteen-years-of-leading",         category: "leadership",      excerpt: "A personal inventory of hard-won lessons \u2014 from Class Prefect to Consortium President \u2014 about what leadership actually costs and what it gives back.",  created_at: "2026-02-10", read_time_minutes: 6, featured_image_url: null },
  { id: "s3",  title: "SARIMAX and Systems: Forecasting & Uncertainty",               slug: "sarimax-and-systems",             category: "intellectuality", excerpt: "While modelling irradiation data in Benguerrir, Samuel found unexpected parallels between statistical confidence intervals and the nature of strategic planning.", created_at: "2026-01-22", read_time_minutes: 5, featured_image_url: null },
  { id: "s4",  title: "Why Africa\u2019s Next Revolution Will Be Intellectual",       slug: "africa-next-revolution",          category: "transformation",  excerpt: "Resources are not what Africa lacks. The missing ingredient is epistemic infrastructure \u2014 ways of knowing and deciding that belong to Africa itself.",      created_at: "2025-12-15", read_time_minutes: 8, featured_image_url: null },
  { id: "s6",  title: "The Servant at the Centre: Rethinking Authority",             slug: "servant-at-the-centre",           category: "leadership",      excerpt: "True authority is not claimed from above \u2014 it is granted from below, by the people you serve.",                                                               created_at: "2025-10-05", read_time_minutes: 5, featured_image_url: null },
  { id: "s7",  title: "Collective Intelligence: A Primer for the Genuinely Curious", slug: "collective-intelligence-primer",  category: "intellectuality", excerpt: "How do groups think? What happens when diverse minds work on the same problem? A beginner\u2019s guide to the science Samuel studies every day.",                 created_at: "2025-09-18", read_time_minutes: 6, featured_image_url: null },
  { id: "s8",  title: "The Scholarship That Changed Everything",                     slug: "scholarship-that-changed-everything", category: "transformation", excerpt: "The moment a Government of Ghana award letter arrived \u2014 and the quiet understanding that it was not a reward for past effort but a commission for future work.", created_at: "2025-08-22", read_time_minutes: 4, featured_image_url: null },
  { id: "s10", title: "Managing Director at 17: What Running a Business Early Taught Me", slug: "managing-director-at-17",   category: "leadership",      excerpt: "Cash Washing Bay, Mpohor, 2017. Samuel\u2019s first experience of P&L, staff decisions, and the sharp education of early entrepreneurship.",                  created_at: "2025-06-08", read_time_minutes: 5, featured_image_url: null },
  { id: "s11", title: "Reading Non-Fiction as a Discipline",                         slug: "nonfiction-as-discipline",        category: "intellectuality", excerpt: "Every book is a conversation with a mind sharper than the moment. Samuel reflects on how reading non-fiction has been as formative as any formal education.",     created_at: "2025-05-20", read_time_minutes: 5, featured_image_url: null },
  { id: "s12", title: "Ghana to Morocco: The Interior Journey",                      slug: "ghana-to-morocco",                category: "transformation",  excerpt: "Geography changes everything \u2014 the food, the language, the weather \u2014 but the deepest transformation happens in the interior landscape of assumptions.", created_at: "2025-04-11", read_time_minutes: 7, featured_image_url: null },
];

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
