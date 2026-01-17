"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { CodeEditor } from "@/components/editor/code-editor";
import { ArrowLeft, Lightbulb, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ChallengePage() {
    const params = useParams();
    const router = useRouter();
    const challengeId = params.id;
    
    const [challenge, setChallenge] = useState<any>(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [output, setOutput] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
    const [hintIndex, setHintIndex] = useState(-1);

    useEffect(() => {
        async function fetchChallenge() {
            try {
                const data = await apiRequest(`/challenges/${challengeId}`);
                setChallenge(data);
                setCode(data.initial_code || "");
            } catch (err) {
                console.error("Error fetching challenge:", err);
                router.push("/dashboard");
            } finally {
                setLoading(false);
            }
        }
        if (challengeId) fetchChallenge();
    }, [challengeId, router]);

    const handleRun = async () => {
        setStatus("running");
        setOutput(null);
        
        try {
            const data = await apiRequest("/execution/run", {
                method: "POST",
                body: JSON.stringify({
                    code,
                    challenge_id: parseInt(challengeId as string),
                    language: "python"
                })
            });

            setOutput(data.stdout + (data.stderr ? "\n" + data.stderr : ""));
            setStatus(data.status);
        } catch (err: any) {
            console.error("Execution error:", err);
            setOutput("Error de conexión con el servidor de ejecución.");
            setStatus("error");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (!challenge) return null;

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">{challenge.title}</h1>
                        <p className="text-xs text-muted-foreground">Reto #{challenge.id} • Dificultad: {challenge.difficulty}</p>
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
                    <CodeEditor initialCode={challenge.initial_code} onChange={setCode} />
                </div>

                {/* Right: Context & Output */}
                <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
                    {/* Description */}
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Objetivo</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {challenge.description}
                        </p>
                    </div>

                    {/* Hints (Progressive) */}
                    <div className="bg-card border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-amber-500" />
                                Pistas
                            </h3>
                            {hintIndex < (challenge.hints?.length || 0) - 1 && (
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
                                {(challenge.hints || []).slice(0, hintIndex + 1).map((hint: string, i: number) => (
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
