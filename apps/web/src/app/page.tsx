import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Code className="h-6 w-6 text-primary" />
          <span>PyHabit</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Entrar
          </Link>
          <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Empezar
          </Link>
        </div>
      </header>
      
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          El hábito de programar, <span className="text-primary">gamificado</span>.
        </h1>
        <p className="text-xl text-muted-foreground md:max-w-2xl">
          Olvida los cursos interminables. Construye tu racha diaria con retos de Python de 5 minutos. Sin teoría aburrida, solo código real.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Comenzar Hábito <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/login" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-lg text-lg font-medium hover:bg-muted transition-colors">
            Ya tengo cuenta
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © 2024 PyHabit. Construye tu futuro, línea a línea.
      </footer>
    </div>
  );
}
