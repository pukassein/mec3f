import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  EVENT_DETAILS, 
  ORGANIZATION_GENERAL, 
  ORGANIZATION_LOCAL, 
  SCIENTIFIC_COMMITTEE 
} from '../data';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UsersIcon, 
  LeafIcon, 
  CogIcon, 
  ZapIcon, 
  CheckCircleIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AlertTriangleIcon,
  HeartPulseIcon,
  DownloadIcon,
  UploadCloudIcon,
  ClockIcon,
  ImageIcon,
  NavigationIcon,
  PlaneIcon,
  CameraIcon,
  LockIcon,
  SearchIcon
} from './Icons';
import { ContentCard, Speaker, ScheduleItem, ImportantDate } from '../types';

// --- Icon Mapper ---
const IconMap: Record<string, React.ElementType> = {
  HeartPulse: HeartPulseIcon,
  Leaf: LeafIcon,
  Cog: CogIcon,
  Zap: ZapIcon,
  Users: UsersIcon,
  Calendar: CalendarIcon,
  MapPin: MapPinIcon
};

const getIconComponent = (iconName: string) => {
  const Icon = IconMap[iconName] || LeafIcon;
  return Icon;
};

// --- Helper Functions ---
const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
  e.preventDefault();
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T12:00:00');
  return {
    dayOfWeek: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    day: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    full: date.toLocaleDateString('pt-BR')
  };
};



const getThemeStyles = (index: number) => {
  const styles = [
    { bg: 'bg-mec-salmon/10', border: 'border-mec-salmon/30', hover: 'hover:border-mec-salmon', icon: 'text-mec-salmon', iconBg: 'bg-white' }, // Salmon
    { bg: 'bg-mec-green/10', border: 'border-mec-green/30', hover: 'hover:border-mec-green', icon: 'text-mec-green', iconBg: 'bg-white' }, // Green
    { bg: 'bg-mec-teal/10', border: 'border-mec-teal/30', hover: 'hover:border-mec-teal', icon: 'text-mec-teal', iconBg: 'bg-white' }, // Teal
    { bg: 'bg-mec-yellow/10', border: 'border-mec-yellow/30', hover: 'hover:border-mec-yellow', icon: 'text-mec-yellow', iconBg: 'bg-white' }, // Yellow
  ];
  return styles[index % styles.length];
};

export const DeadlinePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a small delay for better UX
    // Use sessionStorage so it only shows once per browser tab session
    const hasSeen = sessionStorage.getItem('deadlinePopupSeen_v2');
    if (!hasSeen) {
      const showTimer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(showTimer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('deadlinePopupSeen_v2', 'true');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-blue-100 bg-black/20 hover:bg-black/30 rounded-full p-2 transition-colors z-10 backdrop-blur-md"
        >
          <XIcon className="w-5 h-5" />
        </button>
        
        <div className="bg-gradient-to-br from-mec-teal to-blue-600 p-8 text-center text-white relative overflow-hidden">
           {/* Background accents */}
           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
           <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
           
           <h3 className="text-3xl font-black mb-1 relative z-10 tracking-tight">Prazo Prorrogado!</h3>
           <p className="opacity-90 font-medium relative z-10 text-lg">Submissão de Trabalhos</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full mb-6 font-semibold shadow-inner">
            <CalendarIcon className="w-5 h-5 text-mec-teal" />
            <span>Novo Prazo: 31 de Maio de 2026</span>
          </div>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <p className="text-slate-600 text-[1.1rem] leading-relaxed">
              Atendendo a pedidos, o prazo para envio do seu trabalho foi prorrogado. Aproveite essa nova oportunidade para submeter sua pesquisa!
            </p>
          </div>
          
          <a 
            href="#submissions" 
            onClick={handleClose}
            className="block w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200 text-lg"
          >
            Enviar Meu Trabalho Agora
          </a>
        </div>
      </div>
    </div>
  );
};

export const Navbar = ({ onOpenAdmin, onGoToTemplates }: { onOpenAdmin: () => void; onGoToTemplates?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#about' },
    { name: 'Temáticas', href: '#themes' },
    { name: 'Palestrantes', href: '#speakers' },
    { name: 'Programação', href: '#schedule' },
    { name: 'Inscrições', href: '#registration' },
    { name: 'Submissões', href: '#submissions' },
    { name: 'Local', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 top-0 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="gradient-border-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer group gap-3" onDoubleClick={onOpenAdmin}>
              <img src="/logomec3f.png" alt="MEC3F Logo" className="h-12 w-auto object-contain" />
              <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-xl tracking-tight text-slate-800 group-hover:text-mec-teal transition-colors leading-none">
                  {EVENT_DETAILS.acronym}
                  </span>
                  <span className="text-xs text-slate-500 font-medium leading-none tracking-widest mt-0.5">{EVENT_DETAILS.year}</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-600 hover:text-mec-teal font-medium transition-colors text-sm uppercase tracking-wide cursor-pointer py-2"
                >
                  {link.name}
                </a>
              ))}
              {onGoToTemplates && (
                <button
                  onClick={onGoToTemplates}
                  className="text-slate-600 hover:text-mec-teal font-medium transition-colors text-sm uppercase tracking-wide cursor-pointer py-2"
                >
                  Templates
                </button>
              )}
              <a 
                href="#registration"
                onClick={(e) => handleNavClick(e, '#registration')}
                className="bg-mec-teal text-white px-5 py-2.5 rounded-full font-medium hover:bg-teal-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 whitespace-nowrap"
              >
                Inscreva-se
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-mec-teal p-2">
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-slate-700 hover:text-mec-teal hover:bg-slate-50 border border-transparent"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            {onGoToTemplates && (
              <button
                onClick={() => { setIsOpen(false); onGoToTemplates(); }}
                className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-slate-700 hover:text-mec-teal hover:bg-slate-50 border border-transparent"
              >
                Templates
              </button>
            )}
            <a 
              href="#registration"
              onClick={(e) => handleNavClick(e, '#registration')}
              className="block mt-6 text-center bg-mec-salmon text-white px-5 py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Inscreva-se Agora
            </a>
            <button 
              onClick={() => { setIsOpen(false); onOpenAdmin(); }}
              className="block mt-4 text-center text-sm text-slate-400 w-full py-2"
            >
              Área do Organizador
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Countdown = ({ hasImages }: { hasImages: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: August 25, 2026 
    const targetDate = new Date("2026-08-25T09:00:00").getTime(); 

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl backdrop-blur-md border ${hasImages ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-lg'}`}>
      <span className="text-3xl sm:text-4xl font-bold leading-none">{value}</span>
      <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-1 ${hasImages ? 'text-mec-teal' : 'text-mec-teal'}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 mb-4">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

export const Hero = ({ imageUrls }: { imageUrls: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageUrls && imageUrls.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 7000); 
      return () => clearInterval(timer);
    }
  }, [imageUrls]);

  const hasImages = imageUrls && imageUrls.length > 0;

  const textContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="text-center max-w-4xl mx-auto">
        <div className={`inline-block mb-4 px-4 py-1.5 rounded-full ${hasImages ? 'bg-black/30 border border-white/20 backdrop-blur-sm' : 'bg-mec-teal/10 border border-mec-teal/20'}`}>
          <span className={`font-semibold text-sm tracking-wide uppercase ${hasImages ? 'text-white' : 'text-mec-teal'}`}>
            {EVENT_DETAILS.dateRange}
          </span>
        </div>
        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight ${hasImages ? 'text-white drop-shadow-lg' : 'text-slate-900'}`}>
          <span className="block">6º Congresso de Engenharias</span>
          {hasImages ? 
              <span className="text-mec-teal">e Ciências Aplicadas</span> 
            : <span className="gradient-text">e Ciências Aplicadas</span>
          }
          <span className={`block text-2xl md:text-4xl mt-2 font-normal ${hasImages ? 'text-slate-200' : 'text-slate-600'}`}>das Três Fronteiras</span>
        </h1>

        <Countdown hasImages={hasImages} />

        <p className={`mt-4 text-xl max-w-2xl mx-auto ${hasImages ? 'text-slate-100 drop-shadow-md' : 'text-slate-600'}`}>
          Promovendo a integração científica e tecnológica na Tríplice Fronteira.
          Um evento gratuito para impulsionar o desenvolvimento sustentável.
        </p>
        
        <div className={`mt-8 flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium ${hasImages ? 'text-slate-200' : 'text-slate-500'}`}>
          <div className="flex items-center justify-center gap-2">
            <CalendarIcon className={`h-5 w-5 ${hasImages ? 'text-mec-teal' : 'text-mec-teal'}`} />
            <span className={hasImages ? 'drop-shadow-sm' : ''}>{EVENT_DETAILS.dateRange}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPinIcon className={`h-5 w-5 ${hasImages ? 'text-mec-salmon' : 'text-mec-salmon'}`} />
            <span className={hasImages ? 'drop-shadow-sm' : ''}>{EVENT_DETAILS.location}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#registration" onClick={(e) => smoothScrollTo(e, '#registration')} className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-mec-salmon hover:bg-[#c4755d] md:text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Realizar Inscrição
          </a>
          <a href="#schedule" onClick={(e) => smoothScrollTo(e, '#schedule')} className={`inline-flex justify-center items-center px-8 py-3 border text-base font-medium rounded-lg md:text-lg transition-all ${hasImages ? 'border-white/30 text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm' : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'}`}>
            Ver Programação
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {!hasImages && (
        <>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-mec-green opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-mec-teal opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white opacity-95"></div>
        </>
      )}
      {hasImages && (
        <div className="absolute inset-0 z-0">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Event background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      {textContent}
    </div>
  );
};

export const SaveTheDateSection = ({ dates }: { dates: ImportantDate[] }) => {
  if (!dates || dates.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-mec-green mb-8 uppercase tracking-wide">Datas Importantes</h2>
        
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {dates.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center p-5 hover:bg-slate-50 transition-colors gap-2 sm:gap-4">
                <span className="text-slate-700 font-medium text-center sm:text-left">{item.description}</span>
                <span className="text-slate-900 font-bold whitespace-nowrap bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 text-sm">
                  {item.date_text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutSection = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre o MEC3F</h2>
            <div className="prose prose-lg text-slate-600">
              <p className="mb-4">
                O Congresso de Engenharias e Ciências Aplicadas das Três Fronteiras (MEC3F) é um evento gratuito que tem como propósito promover a integração da comunidade científica, tecnológica e acadêmica em torno dos desafios e oportunidades da região trinacional (Argentina, Brasil e Paraguai).
              </p>
              <p className="mb-4">
                Seu principal objetivo é impulsionar o desenvolvimento social e sustentável por meio da cooperação em ciência, tecnologia e inovação. Buscamos superar barreiras de interconectividade, fortalecendo a colaboração entre instituições e pesquisadores.
              </p>
              <p>
                A 6ª edição (2026) será realizada presencialmente, focando em fortalecer relações construídas e abrir novas frentes de atuação para ampliar o impacto regional das iniciativas conjuntas.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
                <span className="block text-3xl font-bold text-mec-green">700+</span>
                <span className="text-sm text-slate-500">Participantes em 2024</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 text-center">
                <span className="block text-3xl font-bold text-mec-teal">226</span>
                <span className="text-sm text-slate-500">Trabalhos Apresentados</span>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center relative">
                <img 
                  src={imageUrl || "https://picsum.photos/800/600"} 
                  alt="Students at conference" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mec-teal/60 to-transparent"></div>
                <div className="relative z-10 text-white text-center p-6">
                   <p className="text-lg font-semibold tracking-wider uppercase opacity-90">Conectando Saberes</p>
                   <p className="text-4xl font-bold mt-2">Tríplice Fronteira</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ThemesSection = ({ cards }: { cards: ContentCard[] }) => {
  return (
    <section id="themes" className="py-20 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Eixos Temáticos & Destaques</h2>
          <p className="mt-4 text-xl text-slate-600">As áreas de conhecimento que guiarão nossas discussões</p>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-mec-teal border-t-transparent mb-4"></div>
            <p className="text-slate-500">Carregando temáticas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => {
              const Icon = getIconComponent(card.icon_name);
              const styles = getThemeStyles(index);
              
              return (
                <div key={card.id} className={`group p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 ${styles.bg} ${styles.border} ${styles.hover}`}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${styles.iconBg}`}>
                    <Icon className={`w-8 h-8 ${styles.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{card.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export const SpeakersSection = ({ speakers }: { speakers: Speaker[] }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="py-20 bg-slate-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Palestrantes e Convidados</h2>
          <p className="mt-4 text-xl text-slate-600">Grandes nomes que compartilharão conhecimento</p>
        </div>

        {speakers.length === 0 ? (
          <div className="text-center py-10 bg-slate-100 rounded-lg border border-slate-200">
            <p className="text-slate-500 py-8">Aguardando confirmação de palestrantes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {speakers.map((speaker) => (
              <div 
                key={speaker.id} 
                onClick={() => setSelectedSpeaker(speaker)}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 bg-slate-200">
                    <img 
                      src={speaker.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=6fc4c7&color=fff`} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`;
                      }}
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-mec-teal w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                    <UsersIcon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-mec-teal transition-colors">{speaker.name}</h3>
                <p className="text-sm text-slate-600 max-w-[200px] leading-snug">{speaker.institution}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedSpeaker(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 p-1 bg-white/50 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="flex-shrink-0">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-mec-teal/20 shadow-lg">
                   <img 
                     src={selectedSpeaker.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedSpeaker.name)}&background=6fc4c7&color=fff`} 
                     alt={selectedSpeaker.name} 
                     className="w-full h-full object-cover"
                   />
                 </div>
              </div>
              
              <div className="flex-grow text-center md:text-left w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{selectedSpeaker.name}</h3>
                <p className="text-mec-teal font-medium text-lg mb-4">{selectedSpeaker.institution}</p>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 prose prose-sm max-w-none text-slate-600 text-justify max-h-[40vh] overflow-y-auto">
                   {selectedSpeaker.description ? (
                     <p>{selectedSpeaker.description}</p>
                   ) : (
                     <p className="text-slate-400 italic">Nenhuma biografia disponível.</p>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- Schedule Card Component ---
const ScheduleCard: React.FC<{ item: ScheduleItem, trackInfo: any }> = ({ item, trackInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`rounded-lg p-3 border shadow-sm hover:shadow-md transition-all cursor-pointer ${trackInfo.color} ${isExpanded ? 'row-span-2' : ''}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-grow min-w-0">
           <div className="md:hidden text-[10px] font-bold uppercase mb-1 opacity-70 truncate">
             {trackInfo.name}
           </div>
           <h4 className={`font-bold text-sm leading-tight ${isExpanded ? '' : (item.speakers && item.speakers.length > 1 ? '' : 'truncate')}`}>
             {item.code && <span className="text-mec-teal mr-1">{item.code} -</span>} 
             {item.title}
           </h4>
           {item.presenter && !isExpanded && (
             <p className="text-[10px] mt-1 opacity-80 truncate text-slate-600">Apresentador(a): {item.presenter}</p>
           )}
           {!isExpanded && item.speakers && item.speakers.length > 0 && (
             <p className="text-[10px] mt-1 opacity-80 truncate">{item.speakers.map(s => s.name).join(', ')}</p>
           )}
           {!isExpanded && !item.speakers && item.speaker && (
             <p className="text-[10px] mt-1 opacity-80 truncate">{item.speaker.name}</p>
           )}
        </div>
        <div className="opacity-50 shrink-0 mt-0.5">
          {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-3 text-xs opacity-90 border-t border-black/10 pt-2 animate-fade-in">
           {item.authors && <p className="mb-2 italic text-slate-600">Autores: {item.authors}</p>}
           {item.presenter && <p className="mb-2 font-medium">Apresentador(a): {item.presenter}</p>}
           {item.description && !item.code && <p className="mb-2">{item.description}</p>}
           {(item.speakers?.length ? item.speakers : item.speaker ? [item.speaker] : []).map(speaker => (
              <div key={speaker.id} className="flex items-center gap-2 mb-2">
                 <div className="w-8 h-8 rounded-full bg-white/50 overflow-hidden shrink-0">
                   <img src={speaker.image_url} className="w-full h-full object-cover" />
                 </div>
                 <div className="min-w-0">
                    <span className="font-bold block truncate">{speaker.name}</span>
                    <span className="block text-[10px] opacity-80 truncate">{speaker.institution}</span>
                 </div>
              </div>
           ))}
        </div>
      )}
    </div>
  );
};

const GeneralEventCard: React.FC<{ item: ScheduleItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = !!item.description || !!item.speaker || !!(item.speakers && item.speakers.length > 0);

  return (
    <div 
      onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      className={`rounded-lg p-3 border-l-4 shadow-sm transition-all ${isExpandable ? 'cursor-pointer hover:shadow' : ''} ${
        item.type === 'break' ? 'bg-slate-50 border-slate-300' :
        item.type === 'social' ? 'bg-orange-50 border-orange-400' :
        item.type === 'ceremony' ? 'bg-purple-50 border-purple-400' :
        'bg-white border-mec-teal'
      }`}
    >
       <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-center md:text-left flex-grow">
            <h4 className="text-base font-bold text-slate-800">
              {item.code && <span className="text-mec-teal mr-1">{item.code} -</span>}
              {item.title}
            </h4>
            {item.presenter && !isExpanded && (
              <p className="text-xs text-slate-500 mt-0.5">Apresentador(a): {item.presenter}</p>
            )}
            {!isExpanded && item.speakers && item.speakers.length > 0 && (
              <p className="text-xs text-slate-500 mt-0.5">{item.speakers.map(s => s.name).join(', ')}</p>
            )}
            {!isExpanded && !item.speakers && item.speaker && (
              <p className="text-xs text-slate-500 mt-0.5">{item.speaker.name}</p>
            )}
            {!isExpanded && item.description && !(item.speakers?.length || item.speaker) && !item.presenter && (
              <p className="text-slate-600 text-xs mt-0.5 line-clamp-1">{item.description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap ${
              item.type === 'break' ? 'bg-slate-200 text-slate-700' :
              item.type === 'social' ? 'bg-orange-100 text-orange-800' :
              item.type === 'ceremony' ? 'bg-purple-100 text-purple-800' :
              'bg-mec-teal/10 text-mec-teal'
            }`}>
              {item.type === 'break' ? 'Intervalo' : 
               item.type === 'social' ? 'Social' : 
               item.type === 'ceremony' ? 'Cerimônia' : 'Geral'}
            </span>
            {isExpandable && (
              <div className="text-slate-400">
                {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
              </div>
            )}
          </div>
       </div>

       {isExpanded && isExpandable && (
         <div className="mt-3 text-sm border-t border-slate-100 pt-3 animate-fade-in text-left">
            {item.authors && <p className="mb-2 italic text-slate-600">Autores: {item.authors}</p>}
            {item.presenter && <p className="mb-2 font-medium">Apresentador(a): {item.presenter}</p>}
            {item.description && !item.code && <p className="mb-3 text-slate-600">{item.description}</p>}
            <div className="flex flex-wrap gap-2">
              {(item.speakers?.length ? item.speakers : item.speaker ? [item.speaker] : []).map(speaker => (
                 <div key={speaker.id} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg inline-flex pr-6">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      <img src={speaker.image_url} className="w-full h-full object-cover" alt={speaker.name} />
                    </div>
                    <div>
                       <span className="font-bold block text-slate-800">{speaker.name}</span>
                       <span className="block text-xs text-slate-500">{speaker.institution}</span>
                    </div>
                 </div>
              ))}
            </div>
         </div>
       )}
    </div>
  );
};

export const ScheduleSection = ({ scheduleItems }: { scheduleItems: ScheduleItem[] }) => {
  const dates = Array.from(new Set(scheduleItems.map(i => i.date))).sort();
  const [activeDate, setActiveDate] = useState<string>(dates[0] || '');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (dates.length > 0 && !activeDate) {
      setActiveDate(dates[0]);
    }
  }, [scheduleItems, activeDate]);

  const activeItems = scheduleItems
    .filter(item => item.date === activeDate)
    .filter(item => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(searchLower) || false;
        const matchesType = item.type?.toLowerCase().includes(searchLower) || false;
        const matchesDescription = item.description?.toLowerCase().includes(searchLower) || false;
        const matchesCode = item.code?.toLowerCase().includes(searchLower) || false;
        const matchesAuthors = item.authors?.toLowerCase().includes(searchLower) || false;
        const matchesPresenter = item.presenter?.toLowerCase().includes(searchLower) || false;
        
        // Handle speakers: either array 'speakers', or single 'speaker'
        const speakersList = item.speakers ? item.speakers : (item.speaker ? [item.speaker] : []);
        const matchesSpeakers = speakersList.some(speaker => 
            speaker?.name?.toLowerCase().includes(searchLower) ||
            speaker?.institution?.toLowerCase().includes(searchLower)
        );
        return matchesTitle || matchesType || matchesDescription || matchesSpeakers || matchesCode || matchesAuthors || matchesPresenter;
    })
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // Group items by start_time
  const groupedItems = activeItems.reduce((acc, item) => {
    const key = item.start_time;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  const sortedTimes = Object.keys(groupedItems).sort();

  const TRACKS = {
    1: { name: 'Saúde e Meio Ambiente', location: 'Auditório Florestan Fernandes II', color: 'bg-blue-50 border-blue-200 text-blue-900', headerColor: 'bg-blue-600' },
    2: { name: 'Ecologia e Conservação', location: 'Auditório Florestan Fernandes III', color: 'bg-green-50 border-green-200 text-green-900', headerColor: 'bg-green-600' },
    3: { name: 'Engenharias e Sustentabilidade', location: 'Auditório César Lattes', color: 'bg-slate-50 border-slate-200 text-slate-900', headerColor: 'bg-slate-600' },
    4: { name: 'Energia e Materiais', location: 'Auditório Florestan Fernandes I', color: 'bg-orange-50 border-orange-200 text-orange-900', headerColor: 'bg-orange-600' }
  };

  const hasTracks = activeItems.some(i => i.track);

  return (
    <section id="schedule" className="py-20 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Programação</h2>
          <p className="mt-2 text-slate-600">Confira o cronograma completo das atividades</p>
        </div>

        {dates.length > 0 ? (
          <>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Procure aqui a apresentação de seu interesse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-mec-teal focus:border-mec-teal sm:text-sm shadow-sm transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {dates.map((dateStr) => {
                const { dayOfWeek, day } = formatDate(dateStr);
                return (
                  <button
                    key={dateStr}
                    onClick={() => setActiveDate(dateStr)}
                    className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 border-2 ${
                      activeDate === dateStr
                        ? 'bg-slate-50 border-mec-teal text-mec-teal shadow-md'
                        : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="block text-xs uppercase opacity-70 mb-1">{dayOfWeek}</span>
                    <span className="text-lg">{day}</span>
                  </button>
                );
              })}
            </div>

            {/* Timeline View */}
            <div className="max-w-6xl mx-auto">
              {/* Track Headers (Only if tracks exist for this day) */}
              {hasTracks && (
                <div className="hidden md:grid grid-cols-4 gap-4 mb-8 sticky top-20 z-20 bg-white py-4 shadow-sm">
                  {[1, 2, 3, 4].map(trackId => (
                    <div key={trackId} className={`p-3 rounded-lg text-white text-center shadow-md ${TRACKS[trackId as 1|2|3|4].headerColor}`}>
                      <div className="text-xs font-bold uppercase opacity-80 mb-1">Temática {trackId}</div>
                      <div className="font-bold text-sm leading-tight">{TRACKS[trackId as 1|2|3|4].name}</div>
                      <div className="text-[10px] mt-2 opacity-90 bg-black/20 rounded px-2 py-1 inline-block">
                        {TRACKS[trackId as 1|2|3|4].location}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {sortedTimes.map((startTime, idx) => {
                  const items = groupedItems[startTime];
                  const firstItem = items[0];
                  // Check if this time slot has track items
                  const isTrackSlot = items.some(i => i.track);

                  return (
                    <div key={startTime} className="relative group">
                      {/* Time Marker - Compact */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold border border-slate-200">
                          {startTime} - {firstItem.end_time}
                        </div>
                        <div className="h-px bg-slate-100 flex-grow group-hover:bg-slate-200 transition-colors"></div>
                      </div>

                      {isTrackSlot ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map(trackId => {
                            const trackItem = items.find(i => i.track === trackId);
                            if (!trackItem) return <div key={trackId} className="hidden md:block bg-slate-50/50 rounded-lg border border-transparent border-dashed"></div>;
                            
                            const trackInfo = TRACKS[trackId as 1|2|3|4];
                            
                            return (
                              <ScheduleCard key={trackId} item={trackItem} trackInfo={trackInfo} />
                            );
                          })}
                        </div>
                      ) : (
                        // General Event (Full Width)
                        <GeneralEventCard item={firstItem} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {activeItems.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                   <p className="text-slate-500 font-medium">Nenhuma atividade encontrada com os termos informados para este dia.</p>
                   <p className="text-slate-400 mt-2 text-sm">Tente verificar em outro dia na programação acima.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-mec-teal border-t-transparent mb-4"></div>
            <p className="text-slate-500">Carregando programação...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export const SubmissionsSection = () => {
  const [lang, setLang] = useState<'pt' | 'es'>('pt');
  
  const content = {
    pt: {
      title: "Submissão de Trabalhos",
      description: "O período de submissão de trabalhos foi encerrado.",
      attention: {
        title: "Gratuidade",
        text: "O evento é totalmente gratuito. Não há qualquer cobrança de taxa de inscrição ou de submissão de trabalhos."
      }
    },
    es: {
      title: "Envío de Trabajos",
      description: "El período de envío de trabajos ha finalizado.",
      attention: {
        title: "Gratuidad",
        text: "El evento es totalmente gratuito. No hay cobro de ninguna tasa de inscripción o envío de trabajos."
      }
    }
  };

  const current = content[lang];

  return (
    <section id="submissions" className="py-16 bg-slate-50 scroll-mt-20 relative overflow-hidden">
       {/* Background accents */}
       <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
       <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Language Switcher */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
             <button 
               onClick={() => setLang('pt')} 
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${lang === 'pt' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
             >
               PT
             </button>
             <button 
               onClick={() => setLang('es')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${lang === 'es' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
             >
               ES
             </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-4">{current.title}</h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 mb-8 flex flex-col items-center">
           <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
             <LockIcon className="w-8 h-8" />
           </div>
           <p className="text-xl text-slate-600 font-medium">{current.description}</p>
        </div>

        {/* Attention Footer */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4 text-left">
          <div className="bg-amber-500 text-white p-2 rounded-lg shrink-0 mt-1">
            <AlertTriangleIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">{current.attention.title}</h4>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {current.attention.text}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export const GallerySection = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Memórias do MEC3F</h2>
            <p className="text-lg text-slate-600">Registros da última edição em 2024 e momentos históricos.</p>
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>Deslize para ver mais</span>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <style>{`
            .gallery-scroll::-webkit-scrollbar {
              height: 8px;
            }
            .gallery-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .gallery-scroll::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 20px;
            }
          `}</style>
          <div 
            className="gallery-scroll flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory" 
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: '#cbd5e1 transparent' 
            }}
          >
             {images.map((url, index) => (
               <div 
                 key={index} 
                 className="flex-shrink-0 snap-center cursor-pointer group relative rounded-xl overflow-hidden h-64 w-80 md:w-96 shadow-md hover:shadow-xl transition-all duration-300"
                 onClick={() => setSelectedImage(url)}
               >
                 <img 
                   src={url} 
                   alt={`Gallery image ${index + 1}`} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      Ampliar
                    </span>
                 </div>
               </div>
             ))}
          </div>
          {/* Gradient indicators for scrolling */}
          <div className="absolute top-0 right-0 bottom-6 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute top-0 left-0 bottom-6 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden"></div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <XIcon className="w-8 h-8" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export const RegistrationSection = () => {
  const [inscriptionType, setInscriptionType] = useState<'attendee' | 'participant'>('attendee');
  const [isForeigner, setIsForeigner] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    institution: '',
    role: 'Ouvinte',
    cpf: '',
    document_type: 'RG',
    document_number: '',
    phone: '',
    is_foreigner: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [ticketData, setTicketData] = useState<{number: number, name: string, role: string} | null>(null);

  // Update role when toggling type
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      role: inscriptionType === 'attendee' ? 'Ouvinte' : 'Estudante'
    }));
  }, [inscriptionType]);

  const sendConfirmationEmail = async (email: string, ticket: number, name: string, role: string) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ticketNumber: ticket,
          name,
          role
        }),
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured()) {
       setStatus('error');
       setMsg('Supabase não configurado. Edite lib/supabase.ts');
       return;
    }

    setStatus('loading');
    
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([formData])
        .select() 
        .single();

      if (error) throw error;

      if (data) {
        setTicketData({
          number: data.ticket_number,
          name: data.full_name,
          role: data.role || 'Participante'
        });
        sendConfirmationEmail(data.email, data.ticket_number, data.full_name, data.role || 'Participante');
      }

      setStatus('success');
      setFormData({ 
        full_name: '', 
        email: '', 
        institution: '', 
        role: inscriptionType === 'attendee' ? 'Ouvinte' : 'Estudante',
        cpf: '',
        document_type: 'RG',
        document_number: '',
        phone: '',
        is_foreigner: false
      });
      setIsForeigner(false);
    } catch (error) {
      console.error('Error registering:', error);
      setStatus('error');
      let message = 'Erro ao realizar inscrição.';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as { message: unknown }).message);
      }
      setMsg(message);
    }
  };

  const handleDownloadTicket = () => {
    if (!ticketData) return;

    const ticketWindow = window.open('', '_blank');
    if (!ticketWindow) {
      alert('Por favor, permita popups para visualizar o ticket.');
      return;
    }

    // Construct the HTML for the ticket in the new window
    // We include Tailwind via CDN for consistent styling in the popup
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ticket MEC3F - #${ticketData.number}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  mec: {
                    salmon: '#d9856d',
                    green: '#87c270',
                    teal: '#6fc4c7',
                    yellow: '#dcd476',
                  }
                }
              }
            }
          }
        </script>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Poppins', sans-serif; }
          @media print {
            .no-print { display: none; }
            body { background: white; }
            .ticket-container { box-shadow: none; border: 1px solid #ccc; }
          }
        </style>
      </head>
      <body class="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
        <div class="ticket-container bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-xl relative max-w-md w-full mx-auto my-8">
            <div class="h-4 bg-gradient-to-r from-mec-salmon via-mec-green to-mec-teal w-full"></div>
            <div class="p-8">
                <div class="flex justify-between items-start mb-6">
                  <div class="flex gap-3 items-center">
                    <img src="${window.location.origin}/logomec3f.png" alt="MEC3F" class="h-12 w-12 object-contain" />
                    <div>
                        <span class="text-xs font-bold text-mec-teal tracking-wider uppercase">Evento Oficial</span>
                        <h4 class="text-xl font-black text-slate-900 leading-tight">MEC3F 2026</h4>
                        <p class="text-xs text-slate-500 mt-1">25-28 Ago • Foz do Iguaçu</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="block text-xs text-slate-400 uppercase tracking-wide">Ticket</span>
                    <span class="block text-2xl font-mono font-bold text-slate-800">#${ticketData.number.toString().padStart(4, '0')}</span>
                  </div>
                </div>
                
                <div class="border-t border-dashed border-slate-300 my-6 relative">
                  <div class="absolute -left-10 -top-3 w-6 h-6 bg-slate-100 rounded-full border-r border-slate-200"></div>
                  <div class="absolute -right-10 -top-3 w-6 h-6 bg-slate-100 rounded-full border-l border-slate-200"></div>
                </div>

                <div class="flex gap-4 items-center">
                  <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <span class="text-4xl font-bold text-slate-800">#${ticketData.number}</span>
                  </div>
                  <div>
                      <p class="text-xs text-slate-400 uppercase font-bold">Participante</p>
                      <p class="text-lg font-bold text-slate-900 leading-tight">${ticketData.name}</p>
                      <span class="inline-block bg-mec-teal/10 text-mec-teal text-xs px-2 py-0.5 rounded mt-1 font-medium border border-mec-teal/20">
                        ${ticketData.role}
                      </span>
                  </div>
                </div>
            </div>
            <div class="bg-slate-50 p-4 text-center border-t border-slate-200">
                <p class="text-xs text-slate-400">Apresente este ticket (digital ou impresso) no dia do evento.</p>
            </div>
        </div>

        <div class="text-center mt-8 no-print">
          <button onclick="window.print()" class="bg-mec-teal text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition shadow-lg cursor-pointer">
            Imprimir / Salvar PDF
          </button>
          <p class="mt-4 text-sm text-slate-500">Pressione Ctrl+P ou Cmd+P se o botão não funcionar.</p>
        </div>
      </body>
      </html>
    `;

    ticketWindow.document.write(htmlContent);
    ticketWindow.document.close();
  };

  return (
    <section id="registration" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center no-print">
          <h2 className="text-3xl font-bold mb-6">Credenciamento Gratuito</h2>
          <p className="text-slate-300 mb-10 text-lg">
            Garanta sua vaga no MEC3F 2026. Gere sua credencial digital agora mesmo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {status === 'success' && ticketData ? (
             <div className="bg-white rounded-xl p-8 text-slate-800 shadow-2xl md:col-span-2 max-w-2xl mx-auto w-full animate-fade-in-up">
                 <div className="text-center mb-6 no-print">
                    <div className="w-16 h-16 bg-mec-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-mec-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-mec-green">Inscrição Recebida!</h3>
                    <p className="text-slate-600 mt-2">
                      Olá <strong>{ticketData.name}</strong>, recebemos sua inscrição.
                      <br/>
                      Fique atento, pois a comissão organizadora entrará em contato para confirmar sua vaga.
                    </p>
                 </div>

                 {/* Inline Preview - Simplified as it is just a preview now */}
                 <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-lg relative max-w-md mx-auto">
                    <div className="h-4 bg-gradient-to-r from-mec-salmon via-mec-green to-mec-teal w-full"></div>
                    <div className="p-6">
                       <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-3 items-center">
                            <img src="/logomec3f.png" alt="MEC3F" className="h-12 w-12 object-contain" />
                            <div>
                                <span className="text-xs font-bold text-mec-teal tracking-wider uppercase">Evento Oficial</span>
                                <h4 className="text-xl font-black text-slate-900 leading-tight">MEC3F 2026</h4>
                                <p className="text-xs text-slate-500 mt-1">25-28 Ago • Foz do Iguaçu</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-xs text-slate-400 uppercase tracking-wide">Protocolo</span>
                            <span className="block text-2xl font-mono font-bold text-slate-800">#{ticketData.number.toString().padStart(4, '0')}</span>
                          </div>
                       </div>
                       
                       <div className="border-t border-dashed border-slate-300 my-6 relative">
                          <div className="absolute -left-8 -top-3 w-6 h-6 bg-white rounded-full border-r border-slate-200"></div>
                          <div className="absolute -right-8 -top-3 w-6 h-6 bg-white rounded-full border-l border-slate-200"></div>
                       </div>

                       <div className="flex gap-4 items-center">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                             <span className="text-4xl font-bold text-slate-800">#{ticketData.number}</span>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 uppercase font-bold">Participante</p>
                             <p className="text-lg font-bold text-slate-900">{ticketData.name}</p>
                             <span className="inline-block bg-mec-teal/10 text-mec-teal text-xs px-2 py-0.5 rounded mt-1 font-medium border border-mec-teal/20">
                               {ticketData.role}
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="text-center mt-8 space-y-3 no-print">
                   <button 
                     onClick={handleDownloadTicket}
                     className="bg-mec-teal text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-500 transition flex items-center justify-center gap-2 mx-auto shadow-md"
                   >
                     <DownloadIcon className="w-4 h-4" />
                     Imprimir / Baixar Ticket (PDF)
                   </button>
                   
                   <button 
                     onClick={() => { setStatus('idle'); setTicketData(null); }}
                     className="text-mec-teal font-semibold hover:text-teal-600 hover:underline block w-full mt-4"
                   >
                     Realizar nova inscrição
                   </button>
                 </div>
             </div>
          ) : (
             <>
                <div className="bg-white rounded-xl p-8 text-slate-800 shadow-2xl">
                  <h3 className="text-xl font-bold mb-6 text-mec-teal border-b pb-2">Dados do Participante</h3>
                  
                  {/* Toggle Switch */}
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-6 relative">
                    <button
                      type="button"
                      onClick={() => setInscriptionType('attendee')}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${inscriptionType === 'attendee' ? 'bg-white text-mec-salmon shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Participante (apenas ouvinte)
                    </button>
                    <button
                      type="button"
                      disabled
                      title="Prazo para submissão de trabalhos encerrado."
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all opacity-50 cursor-not-allowed text-slate-500 flex items-center justify-center gap-1`}
                    >
                      <LockIcon className="w-3.5 h-3.5" />
                      Participante (c/ apresentação de trabalho)
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                        placeholder="Como deseja que apareça no certificado"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Principal</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                        placeholder="Para contato da organização"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                          placeholder="+55 (00) 00000-0000"
                        />
                      </div>
                      
                      <div className="flex items-center pt-6">
                        <label className="flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={isForeigner}
                            onChange={e => {
                              setIsForeigner(e.target.checked);
                              setFormData(prev => ({ 
                                ...prev, 
                                is_foreigner: e.target.checked,
                                cpf: e.target.checked ? '' : prev.cpf,
                                document_type: e.target.checked ? 'DNI' : 'RG'
                              }));
                            }}
                            className="w-4 h-4 text-mec-teal border-gray-300 rounded focus:ring-mec-teal"
                          />
                          <span className="ml-2 text-sm text-slate-700 font-medium">Sou estrangeiro / I am a foreigner</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {!isForeigner && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
                          <input 
                            type="text" 
                            required={!isForeigner}
                            value={formData.cpf}
                            onChange={e => setFormData({...formData, cpf: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                            placeholder="000.000.000-00"
                          />
                        </div>
                      )}
                      
                      <div className={isForeigner ? "col-span-2" : ""}>
                         <label className="block text-sm font-medium text-slate-700 mb-1">
                           {isForeigner ? 'Documento (DNI / Pasaporte)' : 'RG'}
                         </label>
                         <div className="flex">
                           {!isForeigner && (
                             <select
                               value={formData.document_type}
                               onChange={e => setFormData({...formData, document_type: e.target.value})}
                               className="w-24 px-2 py-2 border border-r-0 border-slate-300 rounded-l-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-100 text-sm"
                             >
                               <option value="RG">RG</option>
                               <option value="CNH">CNH</option>
                               <option value="Outro">Outro</option>
                             </select>
                           )}
                           <input 
                             type="text" 
                             required
                             value={formData.document_number}
                             onChange={e => setFormData({...formData, document_number: e.target.value})}
                             className={`w-full px-4 py-2 border border-slate-300 ${!isForeigner ? 'rounded-r-lg' : 'rounded-lg'} focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50`}
                             placeholder="Número do documento"
                           />
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={inscriptionType === 'attendee' ? 'col-span-2' : ''}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instituição</label>
                        <input 
                          type="text" 
                          required
                          value={formData.institution}
                          onChange={e => setFormData({...formData, institution: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                          placeholder="Sigla ou Nome"
                        />
                      </div>
                      
                      {/* Show category select only for Participants */}
                      {inscriptionType === 'participant' && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                          <select
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value})}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mec-teal focus:border-mec-teal bg-slate-50"
                          >
                            <option value="Estudante">Estudante</option>
                            <option value="Profissional">Profissional</option>
                            <option value="Pesquisador">Pesquisador</option>
                            <option value="Professor">Professor</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-2 pt-2">
                      <input type="checkbox" required id="terms" className="mt-1" />
                      <label htmlFor="terms" className="text-xs text-slate-500">
                        Concordo com o processamento dos meus dados para fins de organização do evento e emissão de certificado.
                      </label>
                    </div>

                    {status === 'error' && <p className="text-red-500 text-sm">{msg}</p>}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-mec-salmon text-white font-bold py-3 rounded-lg hover:bg-[#c4755d] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none shadow-lg mt-2"
                    >
                      {status === 'loading' ? 'Processando...' : `Inscrever-se como ${inscriptionType === 'attendee' ? 'Ouvinte' : 'Participante'}`}
                    </button>
                  </form>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Instruções</h3>
                    <p className="text-slate-300 text-sm">
                      Este cadastro funciona como sua conta para o evento. Você não precisa criar senha.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-mec-yellow">1</div>
                       <div>
                         <h4 className="font-bold">Escolha sua modalidade</h4>
                         <p className="text-xs text-slate-300 opacity-80">
                            <strong>Ouvinte:</strong> Apenas assiste às palestras.<br/>
                            <strong>Participante:</strong> Apresenta trabalhos ou participa ativamente.
                         </p>
                       </div>
                     </div>
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-mec-yellow">2</div>
                       <div>
                         <h4 className="font-bold">Gere seu Protocolo</h4>
                         <p className="text-xs text-slate-300 opacity-80">Seu número de protocolo será gerado na tela.</p>
                       </div>
                     </div>
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-mec-yellow">3</div>
                       <div>
                         <h4 className="font-bold">Aguarde confirmação</h4>
                         <p className="text-xs text-slate-300 opacity-80">A organização analisará sua inscrição e confirmará sua vaga por email.</p>
                       </div>
                     </div>
                  </div>
                </div>
             </>
          )}
        </div>
      </div>
    </section>
  );
};

export const TeamSection = () => {
  const [showAllGeneral, setShowAllGeneral] = useState(false);
  const [showAllScientific, setShowAllScientific] = useState(false);

  const ToggleButton = ({ isOpen, onClick, label }: { isOpen: boolean, onClick: () => void, label: string }) => (
    <button 
      onClick={onClick}
      className="mt-6 flex items-center justify-center w-full sm:w-auto mx-auto gap-2 text-mec-teal font-medium hover:text-teal-600 transition-colors"
    >
      {label} {isOpen ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
    </button>
  );

  return (
    <section id="team" className="py-20 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Comissão Organizadora</h2>
          <p className="mt-2 text-slate-600">Conheça a equipe que faz o MEC3F acontecer</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* General Org */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Organização Geral</h3>
            <ul className="space-y-3">
              {(showAllGeneral ? ORGANIZATION_GENERAL : ORGANIZATION_GENERAL.slice(0, 6)).map((person, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mec-green flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-slate-800">{person.name}</span>
                    <span className="text-slate-500 block text-xs">{person.institution}</span>
                  </div>
                </li>
              ))}
            </ul>
            {ORGANIZATION_GENERAL.length > 6 && (
              <ToggleButton 
                isOpen={showAllGeneral} 
                onClick={() => setShowAllGeneral(!showAllGeneral)} 
                label={showAllGeneral ? "Ver menos" : `Ver mais (${ORGANIZATION_GENERAL.length - 6})`}
              />
            )}
          </div>

          {/* Local Org & Scientific */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Organização Local</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {ORGANIZATION_LOCAL.map((person, i) => (
                  <li key={i} className="text-sm text-slate-700">
                    {person.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Comitê Científico</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {(showAllScientific ? SCIENTIFIC_COMMITTEE : SCIENTIFIC_COMMITTEE.slice(0, 8)).map((person, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mec-teal flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-slate-800 block leading-tight">{person.name}</span>
                    <span className="text-slate-500 text-xs">{person.institution}</span>
                  </div>
                </li>
              ))}
              </ul>
              {SCIENTIFIC_COMMITTEE.length > 8 && (
                <ToggleButton 
                  isOpen={showAllScientific} 
                  onClick={() => setShowAllScientific(!showAllScientific)} 
                  label={showAllScientific ? "Ver menos" : `Ver mais (${SCIENTIFIC_COMMITTEE.length - 8})`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const LocationSection = () => {
  return (
    <section id="location" className="py-24 relative overflow-hidden scroll-mt-20 bg-slate-50">
      {/* Colorful Background Elements (Softened for light theme) */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-mec-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-mec-green/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-mec-teal text-sm font-medium mb-6 shadow-sm">
              <MapPinIcon className="w-4 h-4" />
              Destino
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900">
              Foz do Iguaçu, <span className="text-transparent bg-clip-text bg-gradient-to-r from-mec-teal to-mec-green">Paraná</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              O MEC3F 2026 será realizado em uma das cidades mais deslumbrantes do Brasil. 
              Aproveite o evento para expandir seus conhecimentos e explorar maravilhas mundiais.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-mec-teal/30 transition-all">
                <PlaneIcon className="w-8 h-8 text-mec-teal mb-3" />
                <h4 className="text-slate-800 font-semibold mb-1">Fácil Acesso</h4>
                <p className="text-slate-600 text-sm">Aeroporto Internacional (IGU) com voos diretos das principais capitais do Brasil.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-mec-yellow/30 transition-all">
                <CameraIcon className="w-8 h-8 text-mec-yellow mb-3" />
                <h4 className="text-slate-800 font-semibold mb-1">Turismo</h4>
                <p className="text-slate-600 text-sm">Cataratas do Iguaçu, Itaipu Binacional, Marco das Três Fronteiras e muito mais.</p>
              </div>
            </div>

            <a 
              href="https://maps.app.goo.gl/6WjqwAS2f2br7DzC7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-mec-teal to-mec-green text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-mec-teal/25 transition-all hover:-translate-y-1"
            >
              <NavigationIcon className="w-5 h-5" />
              Traçar Rota no Google Maps
            </a>
          </div>

          {/* Right Content - Map/Images */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
            {/* Map Iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115230.13840733845!2d-54.66228303035048!3d-25.506950005740444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f690ebaa264423%3A0x861e2d426315a411!2sFoz%20do%20Igua%C3%A7u%2C%20State%20of%20Paran%C3%A1!5e0!3m2!1sen!2sbr!4v1711290000000!5m2!1sen!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0"
            ></iframe>
            
            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-lg">
                <p className="text-slate-800 font-medium flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-mec-orange" />
                  Foz do Iguaçu, PR - Brasil
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SponsorsSection = () => {
  const realizationLogos = [
    { name: "UNILA", url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Unila.jpg" },
    { name: "IBS UNaM", url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_IBS.jpg" },
    { name: "IFPR", url: "https://portal.unila.edu.br/eventos/siepe-2019/arquivo/ifpr.jpg/ifpr.jpg" },
    { name: "IFSP", url: "https://blog-static.infra.grancursosonline.com.br/wp-content/uploads/2014/02/03144911/IFSP-Inscri%C3%A7%C3%B5es-abertas-para-217-vagas.png" },
    { name: "UNM", url: "https://ccint.fflch.usp.br/sites/ccint.fflch.usp.br/files/inline-images/%C3%ADndice.png" },
    { name: "FACEN", url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/LogoFacenUNA.png" },
    { name: "ITAI", url: "https://itai.org.br/noticias/wp-content/themes/noticiasitai/logo.png" }
  ];

  const sponsorsLogos = [
    { name: "PAEP CAPES", url: "https://ciencia.ufpr.br/portal/wp-content/uploads/2024/09/paep-capes.jpg" },
    { name: "PPGFISA", url: "https://portal.unila.edu.br/programas-pos-graduacao/fisica/arquivos/ppgfisa-completo-assinatura.png" },
    { name: "PPGIES", url: "https://portal.unila.edu.br/mestrado-doutorado/ppgies/imagens/ASSINATURAPPGIES_COLORpng.png" },
    { name: "CNPq", url: "https://www.gov.br/cnpq/pt-br/canais_atendimento/identidade-visual/CNPq_v2017_rgb.jpg" }
  ];

  const supportLogos = [
    { name: "Support 1", url: "https://portal.unila.edu.br/programas-pos-graduacao/programas-pos/@@collective.cover.banner/d6defe63-2083-43aa-b1df-7ed3245fd110/@@images/c2809b40-2b1f-4826-bc02-824403f840d4.png" },
    { name: "Support 2", url: "https://portal.unila.edu.br/programas-pos-graduacao/programas-pos/@@collective.cover.banner/da263c70-5785-4e55-b297-ddc98f18074f/@@images/9e5514ef-f428-4b0d-be11-2454b1c1c0fd.png" },
    { name: "Support 3", url: "https://portal.unila.edu.br/programas-pos-graduacao/programas-pos/@@collective.cover.banner/df6895cd-8626-44cc-8678-88ccdfeb7c10/@@images/12b68d3f-3bb0-4c27-8d2a-2bfcb9e3d009.png" },
    { name: "Support 4", url: "https://portal.unila.edu.br/programas-pos-graduacao/programas-pos/@@collective.cover.banner/adbc4f63-3552-4c47-a811-82939d3645c4/@@images/e0187b0c-1d12-4fe2-8e9e-cea9e155a7ba.png" },
    { name: "Support 5", url: "https://portal.unila.edu.br/programas-pos-graduacao/programas-pos/@@collective.cover.banner/fda55db0-f934-44d5-bc17-7671b4cfd4bc/@@images/aee61eae-1214-4fc4-aba5-2bd8e828b2d0.png" }
  ];

  return (
    <section id="partners" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Realização & Instituições Envolvidas</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10">
            {realizationLogos.map((logo) => (
              <div key={logo.name} className="flex-shrink-0">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-20 max-w-[220px] object-contain transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Patrocinadores</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10">
             {sponsorsLogos.map((logo) => (
              <div key={logo.name}>
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-28 max-w-xs object-contain transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Apoio</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10">
             {supportLogos.map((logo) => (
              <div key={logo.url} className="flex-shrink-0">
                <img
                  src={logo.url}
                  alt="Apoio Institucional"
                  className="h-24 max-w-[200px] object-contain transform transition-transform duration-300 hover:scale-110 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export const SaveTheDateFloatingButton = ({ dates }: { dates: ImportantDate[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!dates || dates.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Popover Content */}
      <div 
        className={`mb-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        style={{ width: '300px' }}
      >
        <div className="bg-mec-green px-4 py-3 flex justify-between items-center">
          <h3 className="text-white font-bold text-sm uppercase tracking-wide">Datas Importantes</h3>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
          {dates.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
              <p className="text-slate-600 text-xs font-medium mb-1">{item.description}</p>
              <span className="text-slate-900 font-bold text-sm bg-slate-100 inline-block px-2 py-0.5 rounded border border-slate-200">
                {item.date_text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-mec-teal/30 ${
          isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-mec-teal text-white'
        }`}
        aria-label="Ver datas importantes"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <CalendarIcon className="w-6 h-6 animate-pulse-slow" />
        )}
      </button>
    </div>
  );
};

export const Footer = ({ onOpenAdmin }: { onOpenAdmin: () => void }) => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logomec3f.png" alt="MEC3F" className="h-10 w-auto brightness-0 invert opacity-80" />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">{EVENT_DETAILS.acronym}</span>
                <span className="text-xs text-slate-400">{EVENT_DETAILS.year}</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Congresso de Engenharias e Ciências Aplicadas das Três Fronteiras.
              Promovendo a integração científica e tecnológica na região trinacional.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-mec-teal">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#schedule" className="hover:text-white transition">Programação</a></li>
              <li><a href="#registration" className="hover:text-white transition">Inscrições</a></li>
              <li><a href="#submissions" className="hover:text-white transition">Submissões</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-mec-teal">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{EVENT_DETAILS.location}<br/>{EVENT_DETAILS.city}</span>
              </li>
              <li className="flex items-center gap-2">
                <a href={EVENT_DETAILS.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-2">
                   <span>Instagram Oficial</span>
                </a>
              </li>
              <li>
                <a href="mailto:mec3fronteiras@gmail.com" className="hover:text-white transition">mec3fronteiras@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 MEC3F. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={onOpenAdmin} className="hover:text-slate-300 transition">Área do Organizador</button>
            <a href="#" className="hover:text-slate-300 transition">Privacidade</a>
            <a href="#" className="hover:text-slate-300 transition">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};