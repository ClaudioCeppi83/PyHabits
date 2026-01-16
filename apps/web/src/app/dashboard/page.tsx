import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hola, Claudio 👋</h1>
        <p className="text-muted-foreground mt-1">Hoy solo necesitas avanzar un poco.</p>
      </div>

      {/* Daily Challenge Card */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">Reto del día</span>
                <h3 className="text-lg font-semibold mt-2">Condicionales Simples</h3>
                <p className="text-sm text-muted-foreground">Tiempo estimado: ~8 min</p>
            </div>
            <Link href="/dashboard/challenge/1" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium shadow-sm transition-all md:w-auto w-full text-center">
                ▶ Empezar Reto
            </Link>
        </div>
      </div>

      {/* Streak / Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold">3</span>
            <span className="text-xs text-muted-foreground font-medium uppercase mt-1">Días Racha</span>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold">12</span>
            <span className="text-xs text-muted-foreground font-medium uppercase mt-1">Retos Hechos</span>
        </div>
      </div>
    </div>
  );
}
