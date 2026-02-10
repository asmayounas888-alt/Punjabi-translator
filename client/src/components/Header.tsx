import {
  Languages,
  Menu,
  Linkedin,
  Twitter,
  Github,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-md border-b border-white/5" />

      <div className="container max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary glow-primary group-hover:rotate-12 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter uppercase leading-none">Aasma Younas</span>
            <span className="text-[10px] font-black text-primary/60 tracking-[0.2em] uppercase">NLP Research</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {["The Engine", "Research", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-white/10 mr-4">
            {[Linkedin, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <Button size="sm" className="rounded-xl px-6 bg-white text-black font-black hover:bg-white/90">
            HIRE ME
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden rounded-xl bg-white/5">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
