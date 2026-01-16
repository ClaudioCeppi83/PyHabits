import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  title: "Dashboard - PyHabit",
  description: "Tu progreso diario",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:pl-64 min-h-screen pb-20 md:pb-0">
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
