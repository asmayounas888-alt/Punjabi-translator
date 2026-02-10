import { useHistory } from "@/hooks/use-translations";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function HistoryList() {
  const { data: history, isLoading } = useHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl bg-muted/30 border border-dashed border-border">
        <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">No recent translations</h3>
        <p className="text-muted-foreground text-sm">Your translation history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
        <Clock className="w-5 h-5 text-primary" />
        Recent History
      </h2>
      
      <div className="grid gap-3">
        {history.map((item) => (
          <div 
            key={item.id}
            className="group bg-card hover:bg-accent/5 rounded-xl border border-border/50 p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.sourceLang || 'Auto'}</span>
                <ArrowRight className="w-3 h-3" />
                <span className="bg-secondary px-2 py-0.5 rounded-full text-foreground">{item.targetLang}</span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {item.createdAt && formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <p className="text-foreground/90 font-medium line-clamp-2">{item.sourceText}</p>
              <div className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-1 shrink-0 hidden sm:block" />
                <p className="text-primary font-medium line-clamp-2">{item.translatedText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
