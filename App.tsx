import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { THEMES, SCHEDULE_DATA } from './data';
import { ContentCard, Speaker, ScheduleItem, ImportantDate } from './types';
import { AdminPanel } from './components/AdminPanel';
import PostersPage from './components/PostersPage';
import { 
  Navbar, 
  Hero, 
  SaveTheDateSection,
  AboutSection, 
  ThemesSection, 
  SpeakersSection, 
  ScheduleSection, 
  SubmissionsSection, 
  RegistrationSection, 
  GallerySection,
  TeamSection, 
  LocationSection,
  SponsorsSection, 
  Footer,
  SaveTheDateFloatingButton
} from './components/LandingPage';

import { TemplatesPage } from './components/TemplatesPage';
import WorkshopProgramPage from './components/WorkshopProgramPage';

const ConfigWarning = () => {
  if (isSupabaseConfigured()) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-lg max-w-md animate-fade-in-up">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Conexão Necessária</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>Para ver o conteúdo dinâmico e usar o painel admin, edite <code>lib/supabase.ts</code> com suas chaves do Supabase. Rode o SQL no painel do Supabase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'posters' | 'templates' | 'programacao'>('home');
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [aboutImage, setAboutImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        const path = window.location.pathname;
        if (path.includes('/admin')) setCurrentView('admin');
        else if (path.includes('/posters')) setCurrentView('posters');
        else if (path.includes('/templates')) setCurrentView('templates');
        else if (path.includes('/programacao')) setCurrentView('programacao');
        else setCurrentView('home');
      }
    };
    
    const path = window.location.pathname;
    let initialView: 'home' | 'admin' | 'posters' | 'templates' | 'programacao' = 'home';
    if (path.includes('/admin')) initialView = 'admin';
    else if (path.includes('/posters')) initialView = 'posters';
    else if (path.includes('/templates')) initialView = 'templates';
    else if (path.includes('/programacao')) initialView = 'programacao';

    setCurrentView(initialView);
    // Set initial state without adding to history
    window.history.replaceState({ view: initialView }, '', path);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'home' | 'admin' | 'posters' | 'templates' | 'programacao') => {
    const newPath = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({ view }, '', newPath);
    setCurrentView(view);
  };

  const loadData = async () => {
    if (!isSupabaseConfigured()) {
        // Fallbacks
        setCards(THEMES.map(t => ({ id: t.id.toString(), title: t.title, description: t.description, icon_name: t.icon, display_order: t.id })));
        setScheduleItems(SCHEDULE_DATA.flatMap(d => d.items));
        return;
    }

    // 1. Cards
    const { data: cardsData } = await supabase.from('content_cards').select('*').order('display_order');
    if (cardsData && cardsData.length > 0) setCards(cardsData);
    else setCards(THEMES.map(t => ({ id: t.id.toString(), title: t.title, description: t.description, icon_name: t.icon, display_order: t.id })));

    // 2. Speakers
    const { data: speakersData } = await supabase.from('speakers').select('*').order('display_order');
    if (speakersData) setSpeakers(speakersData);

    // 3. Schedule
    const tryFetchSchedule = async () => {
      const { data, error } = await supabase.from('schedule_items')
        .select('*, speaker:speakers!schedule_items_speaker_id_fkey(*), schedule_item_speakers(*, speakers(*))')
        .order('date')
        .order('start_time');
      if (error) {
        console.error("fetch_error", error)
        const { data: fallbackData } = await supabase.from('schedule_items')
          .select('*, speaker:speakers!schedule_items_speaker_id_fkey(*)')
          .order('date')
          .order('start_time');
        return fallbackData;
      }
      return data;
    };
    
    const rawScheduleData = await tryFetchSchedule();
    if (rawScheduleData && rawScheduleData.length > 0) {
      const mapped = rawScheduleData.map(item => {
        let allSpeakers: any[] = [];
        if (item.speaker) allSpeakers.push(item.speaker);
        if (item.schedule_item_speakers && Array.isArray(item.schedule_item_speakers)) {
           const additionalSpeakers = item.schedule_item_speakers.map((s: any) => s.speakers).filter(Boolean);
           allSpeakers = [...allSpeakers, ...additionalSpeakers];
           // Remove duplicates by ID
           allSpeakers = allSpeakers.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        }
        return { ...item, speakers: allSpeakers };
      });
      setScheduleItems(mapped as any);
    } else {
      setScheduleItems(SCHEDULE_DATA.flatMap(d => d.items));
    }

    // 4. Important Dates
    const { data: datesData } = await supabase.from('important_dates').select('*').order('display_order');
    if (datesData) setImportantDates(datesData);

    // 5. Site Content (Hero, About, AND Gallery)
    const { data: contentData } = await supabase.from('site_content').select('*');
    if (contentData) {
        const contentMap = contentData.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);
        
        // Hero Images
        if (contentMap.hero_image_url) {
          setHeroImages(contentMap.hero_image_url.split('\n').filter(Boolean));
        } else {
          setHeroImages([]); 
        }
        
        // About Image
        if (contentMap.about_image_url) {
          setAboutImage(contentMap.about_image_url);
        }

        // Gallery Images (From URL list)
        if (contentMap.gallery_image_urls) {
          setGalleryImages(contentMap.gallery_image_urls.split('\n').filter(Boolean));
        } else {
          // Fallback: If no URLs in DB, try loading from Storage bucket as legacy method
          const { data: files } = await supabase.storage.from('images').list();
          if (files && files.length > 0) {
            const urls = files
              .filter(f => f.name !== '.emptyFolderPlaceholder')
              .sort((a, b) => b.name.localeCompare(a.name)) 
              .map(file => {
                const { data } = supabase.storage.from('images').getPublicUrl(file.name);
                return data.publicUrl;
              });
            setGalleryImages(urls);
          }
        }
    }
  };

  useEffect(() => {
    loadData();

    // Set up Realtime subscription for immediate updates
    if (isSupabaseConfigured()) {
      const channel = supabase.channel('public_updates')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          loadData();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <ConfigWarning />
      
      {currentView === 'admin' ? (
        <AdminPanel onClose={() => navigateTo('home')} />
      ) : currentView === 'posters' ? (
        <PostersPage onBack={() => navigateTo('home')} />
      ) : currentView === 'templates' ? (
        <TemplatesPage onBack={() => navigateTo('home')} />
      ) : currentView === 'programacao' ? (
        <WorkshopProgramPage onBack={() => navigateTo('home')} />
      ) : (
        <>
          <Navbar onOpenAdmin={() => navigateTo('admin')} onGoToTemplates={() => navigateTo('templates')} onGoToWorkshop={() => navigateTo('programacao')} />
          <main>
            <Hero imageUrls={heroImages} />
            <section className="bg-gradient-to-r from-mec-teal to-mec-green text-white py-10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/80">Acontece hoje · 27 de agosto</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Workshop Estratégico Latino-Americano</h2>
                  <p className="mt-2 text-white/90">Materiais Avançados para Eletroquímica · Da Extração de Críticos ao Armazenamento de Energia</p>
                  <p className="mt-2 font-semibold">Quinta-feira, 27 de agosto de 2026 · 13h30 às 18h00</p>
                </div>
                <button onClick={() => navigateTo('programacao')} className="shrink-0 bg-white text-mec-teal px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">Ver programação</button>
              </div>
            </section>
            <AboutSection imageUrl={aboutImage} />
            <ThemesSection cards={cards} />
            <SpeakersSection speakers={speakers} />
            <div className="bg-emerald-50 py-8 text-center">
              <button 
                onClick={() => navigateTo('posters')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
              >
                Ver trabalhos para sessão de pôster da quarta-feira 16h 26/08
              </button>
            </div>
            <ScheduleSection scheduleItems={scheduleItems} />
            <RegistrationSection />
            <SubmissionsSection />
            <SaveTheDateSection dates={importantDates} />
            <GallerySection images={galleryImages} />
            <TeamSection />
            <LocationSection />
            <SponsorsSection />
          </main>
          <SaveTheDateFloatingButton dates={importantDates} />
          <Footer onOpenAdmin={() => navigateTo('admin')} />
        </>
      )}
    </div>
  );
};

export default App;
