import React, { useState } from 'react';
import { DownloadIcon, ChevronLeftIcon, ImageIcon, LayoutIcon, InfoIcon, XIcon } from './Icons';

export const TemplatesPage = ({ onBack }: { onBack: () => void }) => {
  const [isPosterInfoModalOpen, setIsPosterInfoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {isPosterInfoModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                <InfoIcon className="w-6 h-6 text-emerald-600" />
                Informações do Pôster / Información del Póster
              </h2>
              <button 
                onClick={() => setIsPosterInfoModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Portuguese */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-emerald-700 border-b-2 border-emerald-100 pb-2 flex items-center gap-2">
                    <span>🇧🇷</span> Português
                  </h3>
                  <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Confecção dos pôsteres</h4>
                      <p>É de responsabilidade dos autores a confecção, impressão e exposição do pôster no dia e horário designados pela Comissão Organizadora do 6° MEC3F2026 (que pode ser conferido no <a href="http://www.mec3f.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">www.mec3f.com</a>) em porta (varal) pôster e/ou biombos disponibilizados pela comissão na semana do congresso.</p>
                      <p className="mt-2">O formato obrigatório permitido é: <strong>120 cm de altura x 90 cm de largura</strong>. O material de impressão fica a critério dos autores, podendo ser em papel, papelão ou mesmo em produtos disponíveis especialmente para esse fim, é necessário apenas, que haja um cordão na parte superior para que possa ser pendurado em biombos ou varais.</p>
                      <p className="mt-2">Não é necessário que o arquivo digital do pôster a ser impresso seja encaminhado previamente à Comissão Organizadora para aprovação, basta que o pôster finalizado e impresso (de acordo com o modelo a ser disponibilizado) seja levado fisicamente ao evento para apresentação.</p>
                      <p className="mt-2">Os pôsteres precisarão ser fixados antes do horário da apresentação, para que interessadas/os possam ler antes da apresentação.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Apresentação do pôster durante o Evento</h4>
                      <p>A apresentação de pôsteres será realizada no dia 26/08 das 16h00 às 18h30, ou seja, cada trabalho será avaliado por até três avaliadores durante esse período. Assim, os autores apresentadores deverão estar disponíveis durante esse período, especificamente no dia divulgado para apresentação do seu trabalho, que pode ser conferido no site do evento (<a href="http://www.mec3f.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">www.mec3f.com</a>)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Certificação</h4>
                      <p>Somente terão direito à declaração de apresentação, os autores que estiverem inscritos no evento e apresentarem seu pôster à ao menos um avaliador. A certificação somente será para a/o apresentador(a) que estiver inscrito no congresso e que tenha registrado devidamente a função de apresentador(a). Para saber mais acesse o site do evento e acesse o campo.</p>
                    </div>
                  </div>
                </div>

                {/* Spanish */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-blue-700 border-b-2 border-blue-100 pb-2 flex items-center gap-2">
                    <span>🇪🇸</span> Español
                  </h3>
                  <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Elaboración de los pósteres</h4>
                      <p>Es responsabilidad de los autores la elaboración, impresión y exposición del póster en el día y horario designados por la Comisión Organizadora del 6° MEC3F2026 (que puede ser verificado en <a href="http://www.mec3f.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">www.mec3f.com</a>) en porta (tendedero) póster y/o biombos disponibilizados por la comisión en la semana del congreso.</p>
                      <p className="mt-2">El formato obligatorio permitido es: <strong>120 cm de altura x 90 cm de anchura</strong>. El material de impresión queda a criterio de los autores, pudiendo ser en papel, cartón o incluso en productos disponibles especialmente para este fin, solo es necesario que haya un cordón en la parte superior para que pueda ser colgado en biombos o tendederos.</p>
                      <p className="mt-2">No es necesario que el archivo digital del póster a ser impreso sea enviado previamente a la Comisión Organizadora para su aprobación, basta con que el póster finalizado e impreso (de acuerdo con el modelo que estará disponible) sea llevado físicamente al evento para su presentación.</p>
                      <p className="mt-2">Los pósteres necesitarán ser fijados antes del horario de la presentación, para que los interesados puedan leerlos antes de la misma.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Presentación del póster durante el Evento</h4>
                      <p>La presentación de pósteres se realizará el día 26/08 de las 16:00 a las 18:30, es decir, cada trabajo será evaluado por hasta tres evaluadores durante ese período. Así, los autores presentadores deberán estar disponibles durante ese período, específicamente en el día divulgado para la presentación de su trabajo, que puede ser consultado en el sitio web del evento (<a href="http://www.mec3f.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">www.mec3f.com</a>)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Certificación</h4>
                      <p>Solo tendrán derecho a la declaración de presentación los autores que estén inscritos en el evento y presenten su póster a por lo menos un evaluador. La certificación solo será para el/la presentador(a) que esté inscrito en el congreso y que haya registrado devidamente la función de presentador(a). Para saber más, acceda al sitio web del evento y acceda al campo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setIsPosterInfoModalOpen(false)}
                className="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Fechar / Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

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

                <div className="flex-grow flex flex-col w-full md:w-auto">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Modelo de Pôster</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6">
                    Formato padrão para apresentações na sessão de pôsteres. Arquivo em formato PowerPoint (PPTX).
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-8 text-sm text-emerald-800 space-y-3 text-left">
                    <h4 className="font-bold text-emerald-900 mb-2 uppercase tracking-wider text-xs">Especificações de Impressão</h4>
                    <p className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <span className="font-bold sm:min-w-24">Dimensões:</span> 
                      <span>90cm (largura) x 120cm (altura) - Formato vertical</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                      <span className="font-bold sm:min-w-24">Acabamento:</span> 
                      <span>O banner deve conter <strong>fio ou corda superior</strong> para suporte adequado no porta-banner (tripé).</span>
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button className="w-full md:w-auto bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-md flex justify-center items-center gap-2">
                      <DownloadIcon className="w-5 h-5" />
                      Baixar Pôster (Em Breve)
                    </button>
                    <button 
                      onClick={() => setIsPosterInfoModalOpen(true)}
                      className="w-full md:w-auto bg-emerald-100 text-emerald-800 font-bold py-3 px-6 rounded-xl hover:bg-emerald-200 transition-all flex justify-center items-center gap-2"
                    >
                      <InfoIcon className="w-5 h-5" />
                      Mais Info / Más Info
                    </button>
                  </div>
                </div>
              </div>

              {/* Oral Presentation Template */}
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left hover:shadow-lg transition-shadow bg-slate-50/50 gap-8">
                
                <div className="flex-shrink-0 w-48 h-48 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                  <LayoutIcon className="w-16 h-16 text-slate-300" />
                </div>

                <div className="flex-grow flex flex-col w-full md:w-auto">
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
