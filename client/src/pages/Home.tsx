import { useState } from "react";
import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HistoryList } from "@/components/HistoryList";
import { useTranslate } from "@/hooks/use-translations";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, ArrowRight, Sparkles, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState<"english" | "urdu">("english");
  const [lastTranslation, setLastTranslation] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { mutate: translate, isPending } = useTranslate();
  const { toast } = useToast();

  const handleTranslate = () => {
    if (!text.trim()) {
      toast({
        title: "Please enter text",
        description: "Type something in Punjabi to translate.",
        variant: "destructive",
      });
      return;
    }

    translate(
      { text, targetLanguage: targetLang },
      {
        onSuccess: (data) => {
          setLastTranslation(data.translation);
        },
        onError: (error) => {
          toast({
            title: "Translation Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const copyToClipboard = () => {
    if (lastTranslation) {
      navigator.clipboard.writeText(lastTranslation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Translation copied to clipboard.",
      });
    }
  };

  const clearText = () => {
    setText("");
    setLastTranslation(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Header />

      <main className="flex-1 container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        <div className="bg-card rounded-3xl shadow-2xl shadow-black/5 border border-border/50 overflow-hidden mb-12">
          
          {/* Controls Bar */}
          <div className="border-b border-border/50 p-4 bg-muted/10">
            <LanguageSelector 
              targetLang={targetLang} 
              setTargetLang={setTargetLang} 
              className="max-w-xl mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50 min-h-[400px]">
            {/* Input Section */}
            <div className="p-6 md:p-8 flex flex-col relative group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Source Text (Punjabi)</span>
                {text && (
                  <button 
                    onClick={clearText}
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    title="Clear text"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <Textarea
                placeholder="Enter Punjabi text here..."
                className="flex-1 w-full resize-none border-0 p-0 text-xl md:text-2xl leading-relaxed bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/40 font-medium"
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck={false}
              />

              <div className="mt-6 flex justify-between items-center">
                <div className="text-xs text-muted-foreground font-medium">
                  {text.length} chars
                </div>
                <Button 
                  onClick={handleTranslate}
                  disabled={isPending || !text.trim()}
                  size="lg"
                  className="rounded-xl px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      Translate
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            <div className="p-6 md:p-8 flex flex-col bg-muted/10 relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Translation ({targetLang})
                </span>
                {lastTranslation && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-background px-3 py-1.5 rounded-lg border border-border/50 shadow-sm transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              <div className="flex-1">
                {isPending ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3 opacity-60">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm font-medium animate-pulse">Processing translation...</p>
                  </div>
                ) : lastTranslation ? (
                  <p className="text-xl md:text-2xl leading-relaxed font-medium text-foreground animate-in fade-in duration-500">
                    {lastTranslation}
                  </p>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium">Translation will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="max-w-4xl mx-auto">
          <HistoryList />
        </div>
      </main>
    </div>
  );
}
