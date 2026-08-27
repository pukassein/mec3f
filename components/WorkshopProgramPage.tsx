import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const WORKSHOP_PDF_URL = 'https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/Programa_Workshop-MEC3F.pdf';

export default function WorkshopProgramPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-600 hover:text-mec-teal font-semibold">
            <ArrowLeft className="w-5 h-5" /> Voltar ao site
          </button>
          <a href={WORKSHOP_PDF_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-mec-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600">
            Abrir PDF <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <p className="text-mec-teal font-bold uppercase tracking-wide text-sm">MEC3F 2026 · Hoje</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Programação do Workshop</h1>
          <p className="text-slate-600 mt-2">Workshop Estratégico Latino-Americano: Materiais Avançados para Eletroquímica</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <iframe src={WORKSHOP_PDF_URL} title="Programação do Workshop MEC3F" className="w-full h-[75vh] min-h-[600px]" />
        </div>
      </main>
    </div>
  );
}
