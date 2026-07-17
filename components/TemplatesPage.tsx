import React from 'react';
import { DownloadIcon, ChevronLeftIcon, ImageIcon, LayoutIcon } from './Icons';

export const TemplatesPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-mec-teal transition-colors mb-8"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Voltar para Início
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-emerald-600 px-8 py-10 text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Templates para Apresentação</h1>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
              Faça o download dos modelos oficiais do evento para preparar sua apresentação oral ou pôster.
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Poster Template */}
              <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow bg-slate-50/50">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Modelo de Pôster</h3>
                <p className="text-slate-600 mb-8 flex-grow">
                  Formato padrão para apresentações na sessão de pôsteres. Arquivo em formato PowerPoint (PPTX).
                </p>
                <button className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-md flex justify-center items-center gap-2">
                  <DownloadIcon className="w-5 h-5" />
                  Baixar Pôster (Em Breve)
                </button>
              </div>

              {/* Oral Presentation Template */}
              <div className="border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow bg-slate-50/50">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <LayoutIcon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Apresentação Oral</h3>
                <p className="text-slate-600 mb-8 flex-grow">
                  Modelo de slides sugerido para apresentações orais. Arquivo em formato PowerPoint (PPTX).
                </p>
                <button className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-md flex justify-center items-center gap-2">
                  <DownloadIcon className="w-5 h-5" />
                  Baixar Slides (Em Breve)
                </button>
              </div>

            </div>

            <div className="mt-12 text-center text-slate-500 text-sm">
              <p>Os arquivos estarão disponíveis para download em breve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
