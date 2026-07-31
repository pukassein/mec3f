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

      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-8"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Voltar para Início
        </button>

        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Templates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Recursos</span>
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg">
            Faça o download dos modelos oficiais do evento para preparar sua apresentação oral ou seu pôster com a identidade visual do 6º MEC3F.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Poster Template Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
            {/* Header/Banner Area */}
            <div className="h-64 bg-slate-50 border-b border-slate-100 relative flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-slate-100 opacity-50 z-0"></div>
              <img 
                src="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/porta_banner%20mec3f.png" 
                alt="Exemplo de Pôster" 
                className="h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Modelo de Pôster</h3>
              </div>
              
              <p className="text-slate-600 mb-6 flex-grow">
                Formato padrão para apresentações na sessão de pôsteres. Utilize este template em PowerPoint (PPTX) para estruturar sua pesquisa de forma visualmente coesa.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-sm text-slate-700">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                  <InfoIcon className="w-4 h-4 text-emerald-600" />
                  Especificações de Impressão
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="font-bold text-slate-800 block">Dimensões Oficiais:</span>
                      <span>90 cm de largura x 120 cm de altura (Formato Vertical).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="font-bold text-slate-800 block">Acabamento Necessário:</span>
                      <span>O banner impresso deve conter fio ou corda superior para suporte no porta-banner/tripé.</span>
                    </div>
                  </li>
                </ul>
                <button 
                  onClick={() => setIsPosterInfoModalOpen(true)}
                  className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm underline underline-offset-2"
                >
                  Ver regulamento completo / Ver reglamento
                </button>
              </div>

              {/* Actions */}
              <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                <a 
                  href="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/Poster_Portugus_6oMEC3F2026.pptx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 w-full text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  PPTX (Português)
                </a>
                <a 
                  href="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/Poster_Espanol_6oMEC3F2026.pptx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-sky-700 transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 w-full text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  PPTX (Español)
                </a>
              </div>
            </div>
          </div>

          {/* Oral Presentation Template Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
            {/* Header/Banner Area */}
            <div className="h-64 bg-slate-50 border-b border-slate-100 relative flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 opacity-50 z-0"></div>
              <img 
                src="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/presenting.png" 
                alt="Exemplo de Apresentação Oral" 
                className="h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <LayoutIcon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Comunicação Oral</h3>
              </div>
              
              <p className="text-slate-600 mb-6 flex-grow">
                Modelo sugerido para as apresentações orais durante as sessões temáticas do congresso. O arquivo contém layouts padronizados para introdução, desenvolvimento e conclusão, seguindo a identidade oficial.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-sm text-slate-700">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                  <InfoIcon className="w-4 h-4 text-blue-600" />
                  Regras e Dicas para Apresentação
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="font-bold text-slate-800 block">Tempo da Apresentação:</span>
                      <span>Duração de 12 minutos, seguidos de 3 minutos para perguntas. (Data e horário serão comunicados posteriormente).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="font-bold text-slate-800 block">Entrega do Arquivo:</span>
                      <span>As apresentações devem ser entregues no dia da apresentação, antes do início das atividades, na sala correspondente, em um pendrive.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="font-bold text-slate-800 block">Formato e Idiomas:</span>
                      <span>O formato deve ser PowerPoint (PPTX). Os idiomas aceitos são Espanhol, Português ou Inglês.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                <a 
                  href="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/COportugues.pptx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 w-full text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  PPTX (Português)
                </a>
                <a 
                  href="https://lpyswsovorgutlqfphgz.supabase.co/storage/v1/object/public/images/COEspanol.pptx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 w-full text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  PPTX (Español)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

