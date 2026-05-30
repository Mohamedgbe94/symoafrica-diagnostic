import DiagnosticForm from "./DiagnosticForm";

export const metadata = {
  title: "Diagnostic Gratuit — SymoAfrica",
  description:
    "Obtenez un diagnostic personnalisé de votre entreprise en 2 minutes.",
};

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1f9460] text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">SymoAfrica</span>
        </div>
        <span className="text-sm opacity-80 hidden sm:block">
          Conseil & Transformation Digitale
        </span>
      </header>

      {/* Hero */}
      <section className="bg-[#e8f5ee] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#1f9460] uppercase tracking-widest mb-2">
          Diagnostic 100% gratuit
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Découvrez ce qui freine
          <br className="hidden sm:block" /> la croissance de votre entreprise
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-base sm:text-lg">
          En 2 minutes, obtenez une analyse personnalisée et des recommandations
          concrètes pour votre business.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#1f9460]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Réponse en 24h
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#1f9460]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            100% confidentiel
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#1f9460]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Sans engagement
          </span>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 px-5 py-10">
        <div className="max-w-xl mx-auto">
          <DiagnosticForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-5 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} SymoAfrica — Conseil & Transformation Digitale
        <span className="mx-2">·</span>
        <a href="mailto:symoservice@gmail.com" className="hover:text-[#1f9460]">
          symoservice@gmail.com
        </a>
      </footer>
    </main>
  );
}
