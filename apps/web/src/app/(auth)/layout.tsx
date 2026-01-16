import { Code } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left: Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white">
            <div className="flex items-center gap-2 font-bold text-xl">
                <Code className="h-6 w-6 text-blue-500" />
                <span>PyHabit</span>
            </div>
            <div className="max-w-md">
                <blockquote className="text-xl font-medium leading-relaxed">
                    &quot;La motivación es lo que te hace empezar. El hábito es lo que te mantiene.&quot;
                </blockquote>
                <div className="mt-4 font-normal text-zinc-400">— Jim Ryun</div>
            </div>
            <div className="text-sm text-zinc-500">
                © 2024 PyHabit.
            </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col items-center justify-center p-6 bg-background">
            <div className="w-full max-w-sm space-y-6">
                 {/* Mobile Logo */}
                 <div className="lg:hidden flex items-center justify-center gap-2 font-bold text-xl mb-8">
                    <Code className="h-6 w-6 text-blue-600" />
                    <span>PyHabit</span>
                </div>
                
                {children}
            </div>
        </div>
    </div>
  );
}
