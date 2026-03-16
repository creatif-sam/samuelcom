import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1814",
            border: "1px solid rgba(240,236,228,.12)",
            color: "#f0ece4",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: ".05em",
          },
        }}
        richColors
      />
      {children}
    </>
  );
}
