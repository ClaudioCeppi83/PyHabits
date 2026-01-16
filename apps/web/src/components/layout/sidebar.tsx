"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Code,
  LayoutDashboard,
  Trophy,
  BookOpen,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Retos", href: "/dashboard/challenges", icon: Code },
  { name: "Progreso", href: "/dashboard/progress", icon: Trophy },
  { name: "Recursos", href: "/dashboard/resources", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="hidden border-r bg-card md:flex md:w-64 min-h-screen fixed top-0 left-0 flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code className="h-6 w-6 text-primary" />
          <span>PyHabit</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="border-t p-4 flex flex-col gap-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          Ajustes
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full text-left"
        >
          {mounted ? (
             theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
          ) : (
             <div className="h-4 w-4" /> // Placeholder to avoid layout shift
          )}
          <span>{mounted ? (theme === "dark" ? "Modo Claro" : "Modo Oscuro") : "Cambiar Tema"}</span>
        </button>

         <button
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left mt-2"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
