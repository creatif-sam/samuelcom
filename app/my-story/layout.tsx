import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Story | Samuel Kobina Gyasi",
  description:
    "The story of Samuel Kobina Gyasi — born in Mpohor, Ghana; scholar, leader, program officer, and mentor. A life shaped chapter by chapter.",
};

export default function MyStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
