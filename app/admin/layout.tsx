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
            background: "rgba(255,255,255,.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(53,71,209,.15)",
            boxShadow: "0 10px 30px rgba(53,71,209,.15)",
            color: "#0f172a",
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            letterSpacing: ".02em",
          },
        }}
        richColors
      />
      {children}
    </>
  );
}
