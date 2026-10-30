import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Samuel Kobina Gyasi for a facilitation, workshop, team development programme, or podcast and interview — or send a question or suggestion.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Samuel Kobina Gyasi",
    description:
      "Book Samuel Kobina Gyasi for a facilitation, workshop, team development programme, or podcast and interview.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
