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
            <div className="grid gap-6">
              
              {/* Poster Template */}
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left hover:shadow-lg transition-shadow bg-slate-50/50 gap-8">
                
                <div className="flex-shrink-0 w-48 h-64 md:h-auto rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
                  <img 
                    src="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/porta_banner%20mec3f.png" 
                    alt="Exemplo de Porta-banner" 
                    className="w-full h-full object-cover sm:object-contain p-2" 
                    loading="lazy"
                  />
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Modelo de Pôster</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6">
                    Formato padrão para apresentações na sessão de pôsteres. Arquivo em formato PowerPoint (PPTX).
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-8 text-sm text-emerald-800 space-y-3">
                    <h4 className="font-bold text-emerald-900 mb-2 uppercase tracking-wider text-xs">Especificações de Impressão</h4>
                    <p className="flex items-start gap-2">
                      <span className="font-bold min-w-24">Dimensões:</span> 
                      <span>90cm (largura) x 120cm (altura) - Formato vertical</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold min-w-24">Acabamento:</span> 
                      <span>O banner deve conter <strong>fio ou corda superior</strong> para suporte adequado no porta-banner (tripé).</span>
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full md:w-auto bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-md flex justify-center items-center gap-2">
                      <DownloadIcon className="w-5 h-5" />
                      Baixar Pôster (Em Breve)
                    </button>
                  </div>
                </div>
              </div>

              {/* Oral Presentation Template */}
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left hover:shadow-lg transition-shadow bg-slate-50/50 gap-8">
                
                <div className="flex-shrink-0 w-48 h-48 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                  <LayoutIcon className="w-16 h-16 text-slate-300" />
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <LayoutIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Apresentação Oral</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-8">
                    Modelo de slides sugerido para apresentações orais. O arquivo segue a identidade visual do evento e está em formato PowerPoint (PPTX).
                  </p>

                  <div className="mt-auto">
                    <button className="w-full md:w-auto bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-md flex justify-center items-center gap-2">
                      <DownloadIcon className="w-5 h-5" />
                      Baixar Slides (Em Breve)
                    </button>
                  </div>
                </div>
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
