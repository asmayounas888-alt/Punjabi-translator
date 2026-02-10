import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  targetLang: "english" | "urdu";
  setTargetLang: (lang: "english" | "urdu") => void;
  className?: string;
}

export function LanguageSelector({ targetLang, setTargetLang, className }: LanguageSelectorProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 bg-white dark:bg-card p-2 rounded-2xl shadow-sm border border-border/50", className)}>
      
      <div className="flex-1 px-4 py-2 font-medium text-muted-foreground text-center">
        Punjabi (Auto)
      </div>

      <div className="p-2 rounded-full bg-muted/50 text-muted-foreground">
        <ArrowLeftRight className="w-4 h-4" />
      </div>

      <div className="flex-1 flex bg-muted/50 p-1 rounded-xl">
        <button
          onClick={() => setTargetLang("english")}
          className={cn(
            "flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
            targetLang === "english" 
              ? "bg-white dark:bg-background text-primary shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          English
        </button>
        <button
          onClick={() => setTargetLang("urdu")}
          className={cn(
            "flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
            targetLang === "urdu" 
              ? "bg-white dark:bg-background text-primary shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Urdu
        </button>
      </div>
    </div>
  );
}
