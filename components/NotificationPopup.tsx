import React, { useState, useRef, useEffect } from 'react';
import { XIcon, InfoIcon } from './Icons';

export const NotificationPopup = ({ 
  onGoToPosters, 
  onGoToTemplates 
}: { 
  onGoToPosters: () => void;
  onGoToTemplates: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && !isMinimized) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleGoToSchedule = () => {
    const element = document.querySelector('#schedule');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button 
        onClick={handleMinimize}
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[90] bg-white text-mec-teal p-3 rounded-full shadow-md hover:bg-slate-50 transition-all border border-slate-200 hover:scale-105 active:scale-95 animate-fade-in-up"
        title="Ver novidades"
      >
        <InfoIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div 
      ref={popupRef}
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[90] w-[calc(100%-2rem)] md:w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up"
    >
      <div className="bg-slate-50 p-3 text-slate-700 flex justify-between items-center relative border-b border-slate-100">
        <div className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4 text-mec-teal" />
          <h3 className="font-semibold text-xs uppercase tracking-wide">Novidades</h3>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleMinimize}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded transition-colors"
            title="Minimizar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded transition-colors"
            title="Fechar"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-slate-600 text-xs mb-4 leading-relaxed">
          Confira a programação completa e a sessão de pôsteres. Os <strong>templates para download</strong> estarão disponíveis em breve.
        </p>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => { handleGoToSchedule(); handleClose(); }}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
          >
            Ver Programação Completa
          </button>
          <button 
            onClick={() => { onGoToPosters(); handleClose(); }}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
          >
            Ver Pôsteres Selecionados
          </button>
          <button 
            onClick={() => { onGoToTemplates(); handleClose(); }}
            className="w-full bg-mec-teal/10 hover:bg-mec-teal/20 text-mec-teal text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
          >
            Página de Templates
          </button>
        </div>
      </div>
    </div>
  );
};
