"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const displayName = formData.get("name") as string;

    try {
        await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password, display_name: displayName }),
        });

        // After registration, we could auto-login or redirect to login
        // For simple flow, let's login automatically if the API returned a token (usually it doesn't in register in this project)
        // So we redirect to login or just perform a login request
        const loginData = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("token", loginData.access_token);
        router.push("/dashboard");
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Crea tu hábito</h1>
        <p className="text-sm text-muted-foreground">
          Empieza hoy. Solo necesitas 5 minutos.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
            <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                {error}
            </div>
        )}
        <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input 
                id="email"
                name="email"
                type="email" 
                placeholder="hola@ejemplo.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Contraseña</label>
            <input 
                id="password"
                name="password"
                type="password" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
            />
        </div>
         <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Nombre (Opcional)</label>
            <input 
                id="name"
                name="name"
                type="text" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>

        <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
            {loading ? "Creando cuenta..." : "Empezar Hábito"}
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Ingresa aquí
        </Link>
      </div>
    </div>
  );
}
