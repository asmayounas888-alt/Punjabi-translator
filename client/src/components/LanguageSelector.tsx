import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  targetLang: "english" | "urdu";
  setTargetLang: (lang: "english" | "urdu") => void;
  className?: string;
}

export function LanguageSelector({ targetLang, setTargetLang, className }: LanguageSelectorProps) {
  return (
    <div className={cn("flex items-center gap-2 p-1.5", className)}>

      <div className="px-5 py-2 group flex items-center gap-2 cursor-default">
        <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">Auto-Detect</span>
        <span className="text-[8px] font-black uppercase text-primary/50 leading-none px-1.5 py-0.5 rounded-sm bg-primary/10 border border-primary/20">Script</span>
      </div>

      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
        <ArrowLeftRight className="w-3 h-3" />
      </div>

      <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5">
        <button
          onClick={() => setTargetLang("english")}
          className={cn(
            "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
            targetLang === "english"
              ? "bg-white text-black shadow-xl scale-100"
              : "text-muted-foreground hover:text-white scale-95"
          )}
        >
          English
        </button>
        <button
          onClick={() => setTargetLang("urdu")}
          className={cn(
            "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
            targetLang === "urdu"
              ? "bg-white text-black shadow-xl scale-100"
              : "text-muted-foreground hover:text-white scale-95"
          )}
        >
          Urdu
        </button>
      </div>
    </div>
  );
}
