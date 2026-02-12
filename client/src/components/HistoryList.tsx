import { useTranslate, Translation } from "@/hooks/use-translations";
import { ArrowRight, Database, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function HistoryList() {
  const { history } = useTranslate();

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-20 px-4 rounded-[2rem] border border-dashed border-white/10 glass-dark">
        <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Database className="w-8 h-8 text-white/10" />
        </div>
        <h3 className="font-bold text-xl text-white mb-2">No data in local storage</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto text-balance font-medium">
          Start translating Gurmukhi text to populate your local transcription history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {history.map((item: Translation) => (
          <div
            key={item.id}
            className="group glass p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="w-16 h-16 text-primary" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                  Punjabi
                </div>
                <ArrowRight className="w-3 h-3 text-white/20" />
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {item.targetLanguage}
                </div>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                {item.timestamp && formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-2">
                <p className="text-xs font-black text-white/20 uppercase tracking-widest">Origin</p>
                <p className="text-lg font-bold text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.text}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-primary uppercase tracking-widest">Transliteration</p>
                <p className="text-xl font-bold text-white line-clamp-3 leading-relaxed">
                  {item.translation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
