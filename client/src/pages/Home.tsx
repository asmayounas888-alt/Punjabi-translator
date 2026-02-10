import { useState } from "react";
import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HistoryList } from "@/components/HistoryList";
import { useTranslate } from "@/hooks/use-translations";
import { useToast } from "@/hooks/use-toast";
import {
  Copy, Check, ArrowRight, Sparkles, Loader2, X,
  Terminal, Cpu, Globe2, BookOpen, Mail, Github, ExternalLink,
  Code2, Languages, Database, Quote
} from "lucide-react";
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
        title: "Input required",
        description: "Please enter some Gurmukhi text to begin.",
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
            title: "Processing Error",
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
        title: "Success",
        description: "Copied to clipboard.",
      });
    }
  };

  const clearText = () => {
    setText("");
    setLastTranslation(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="mesh-bg" />
      <Header />

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">

        {/* HERO SECTION */}
        <section className="mb-32 text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 glow-primary">
            <Cpu className="w-3 h-3" />
            Computational Linguistics Researcher
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Bridging Languages with <br />
            <span className="text-gradient">Advanced NLP</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            I'm <span className="text-white font-bold">Aasma Younas</span>. I specialize in cross-script transliteration and neural machine translation, focusing on preserving the soul of South Asian languages through code.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Explore My Research
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 glass-dark hover:bg-white/5 font-bold transition-all hover:scale-105 active:scale-95">
              Contact Me
            </Button>
          </div>
        </section>

        {/* THE TOOL SECTION */}
        <section id="tool" className="mb-32 animate-fade-in-up delay-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Punjabi Transliteration Engine</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A high-precision real-time transliteration tool designed to convert Gurmukhi script into English and Urdu with semantic awareness.
            </p>
          </div>

          <div className="glass rounded-[2rem] overflow-hidden group">
            <div className="border-b border-white/5 p-6 bg-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary glow-primary">
                  <Languages className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">Powered by</p>
                  <p className="text-sm font-bold">NLP Engine v1.0</p>
                </div>
              </div>
              <LanguageSelector
                targetLang={targetLang}
                setTargetLang={setTargetLang}
                className="bg-black/20 border border-white/10 rounded-2xl"
              />
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 min-h-[450px]">
              {/* Input Section */}
              <div className="p-8 flex flex-col relative">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Source (Gurmukhi)</span>
                  {text && (
                    <button
                      onClick={clearText}
                      className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-all active:scale-90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <Textarea
                  placeholder="ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ..."
                  className="flex-1 w-full resize-none border-0 p-0 text-2xl md:text-3xl leading-relaxed bg-transparent focus-visible:ring-0 placeholder:text-white/10 font-bold"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  spellCheck={false}
                />

                <div className="mt-8 flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {text.length} Characters
                  </div>
                  <Button
                    onClick={handleTranslate}
                    disabled={isPending || !text.trim()}
                    className="rounded-xl px-6 bg-white text-black hover:bg-white/90 font-black shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">TRANSFORM <ArrowRight className="w-4 h-4" /></span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Output Section */}
              <div className="p-8 flex flex-col bg-primary/5 relative overflow-hidden">
                <div className="mesh-bg opacity-30" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">
                    Result ({targetLang})
                  </span>
                  {lastTranslation && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-[10px] font-black text-white bg-black/40 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95 uppercase"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Result"}
                    </button>
                  )}
                </div>

                <div className="flex-1 relative z-10">
                  {isPending ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-full blur-xl animate-pulse" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-primary">Computing Inference...</p>
                    </div>
                  ) : lastTranslation ? (
                    <p className="text-2xl md:text-3xl leading-relaxed font-bold text-white nlp-text-reveal">
                      {lastTranslation}
                    </p>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <Terminal className="w-10 h-10 text-white/20" />
                      </div>
                      <p className="text-lg font-bold text-white/20">Waiting for input stream...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH & EXPERTISE */}
        <section className="mb-32 grid lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-bold mb-8">Selected Research</h3>
            {[
              {
                title: "Neural Machine Transliteration for Low-Resource Languages",
                desc: "Exploring attention mechanisms in LSTM networks to preserve phonological nuance in Punjabi-to-Urdu conversions.",
                tags: ["Deep Learning", "Transliteration", "NMT"]
              },
              {
                title: "Sentiment Analysis in Multilingual Media Models",
                desc: "Developing hybrid lexicons for sentiment extraction across mixed Gurmukhi and Shahmukhi computational inputs.",
                tags: ["Sentiment Analysis", "NLP", "Hybrid Models"]
              }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl group hover-lift cursor-pointer flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary glow-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  <div className="flex gap-2">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-black uppercase px-2 py-1 bg-white/5 rounded-md border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8">Expertise</h3>
            <div className="glass p-8 rounded-3xl space-y-6">
              {[
                { icon: <Database className="w-5 h-5" />, label: "Dataset Curation", color: "text-blue-400" },
                { icon: <Code2 className="w-5 h-5" />, label: "Python & PyTorch", color: "text-red-400" },
                { icon: <Globe2 className="w-5 h-5" />, label: "Cross-Script NLP", color: "text-emerald-400" }
              ].map((skill, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${skill.color} transition-all group-hover:scale-110`}>
                    {skill.icon}
                  </div>
                  <span className="font-bold">{skill.label}</span>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5">
                <Quote className="w-8 h-8 text-primary opacity-20 mb-4" />
                <p className="text-sm italic text-muted-foreground italic">
                  "Linguistics is not just the study of words, but the science of human logic structured through syntax."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT HISTORY PREVIEW */}
        <section className="animate-fade-in-up delay-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Recent History</h3>
            <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <HistoryList />
        </section>

        {/* FOOTER / CONTACT */}
        <footer className="mt-40 pt-20 border-t border-white/5 text-center">
          <div className="flex justify-center gap-8 mb-10">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            <a href="https://github.com/asmayounas888-alt" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="w-6 h-6" /></a>
          </div>
          <p className="text-sm font-bold opacity-30 tracking-tighter uppercase">
            © 2026 Aasma Younas · Designed for Computational Excellence
          </p>
        </footer>

      </main>
    </div>
  );
}
