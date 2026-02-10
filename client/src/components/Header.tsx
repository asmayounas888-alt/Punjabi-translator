import { Languages, Info } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-purple-900/10 text-white py-8 md:py-12 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 shadow-inner">
              <Languages className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                PunjabSync Translator
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium">
                Seamless Punjabi Translation
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm text-sm font-medium text-white/90">
            <Info className="w-4 h-4" />
            <span>Support for Gurmukhi & Shahmukhi</span>
          </div>
        </div>
      </div>
    </header>
  );
}
