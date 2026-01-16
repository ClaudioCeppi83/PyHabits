"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/editor/code-editor";
import { ArrowLeft, Lightbulb, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Challenge Data (will fetch from API later)
const MOCK_CHALLENGE = {
    id: 1,
    title: "Condicionales Simples",
    description: "Crea una función llamada `check_number` que reciba un número `n`. Si el número si es mayor a 10, debe retornar la cadena \"Mayor\". Si no, retorna \"Menor\".",
    initialCode: "def check_number(n):\n    # Tu código aquí\n    pass",
    hints: [
        "Usa una sentencia `if` para comparar `n` con 10.",
        "Recuerda usar la indentación correcta en Python.",
        "Usa `return` para enviar el resultado."
    ]
};

export default function ChallengePage() {
    // const params = useParams(); // Unused in MVP
    // const router = useRouter(); // Unused in MVP
    const [code, setCode] = useState(MOCK_CHALLENGE.initialCode);
    const [output, setOutput] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
    const [hintIndex, setHintIndex] = useState(-1);

    const handleRun = async () => {
        setStatus("running");
        setOutput(null);
        
        // Mock Execution Delay
        setTimeout(() => {
            // Mock Validation Logic
            if (code.includes("if n > 10") && code.includes("return \"Mayor\"")) {
                setStatus("success");
                setOutput("✔ Test Pasado: check_number(11) -> 'Mayor'\n✔ Test Pasado: check_number(5) -> 'Menor'");
            } else {
                setStatus("error");
                setOutput("✘ Error: Tu función no retorna 'Mayor' cuando n es 11.");
            }
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">{MOCK_CHALLENGE.title}</h1>
                        <p className="text-xs text-muted-foreground">Reto #12 • Dificultad: Fácil</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleRun}
                        disabled={status === "running"}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all shadow-sm",
                            status === "running" ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                    >
                        <Play className="h-4 w-4 fill-current" />
                        {status === "running" ? "Ejecutando..." : "Ejecutar Código"}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Left: Editor */}
                <div className="flex flex-col gap-4 h-full relative">
                    <CodeEditor initialCode={MOCK_CHALLENGE.initialCode} onChange={setCode} />
                </div>

                {/* Right: Context & Output */}
                <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
                    {/* Description */}
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Objetivo</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {MOCK_CHALLENGE.description}
                        </p>
                    </div>

                    {/* Hints (Progressive) */}
                    <div className="bg-card border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-amber-500" />
                                Pistas
                            </h3>
                            {hintIndex < MOCK_CHALLENGE.hints.length - 1 && (
                                <button 
                                    onClick={() => setHintIndex(i => i + 1)}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Ver siguiente pista
                                </button>
                            )}
                        </div>
                        
                        {hintIndex === -1 ? (
                            <p className="text-xs text-muted-foreground italic">Si te atascas, pide una pista.</p>
                        ) : (
                            <ul className="space-y-2">
                                {MOCK_CHALLENGE.hints.slice(0, hintIndex + 1).map((hint, i) => (
                                    <li key={i} className="text-sm bg-muted/50 p-2 rounded border border-l-4 border-l-amber-500">
                                        {hint}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Output Console */}
                    <div className="flex-1 bg-zinc-950 rounded-lg p-4 font-mono text-sm text-zinc-300 overflow-auto border min-h-[200px]">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                            <span className="text-xs text-zinc-500 uppercase font-semibold">Consola</span>
                            {status === "success" && <span className="text-xs text-green-500 font-bold">EXITOSO</span>}
                            {status === "error" && <span className="text-xs text-red-500 font-bold">FALLÓ</span>}
                        </div>
                        {output ? (
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        ) : (
                            <span className="text-zinc-600 italic">Esperando ejecución...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
