import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  XIcon, 
  DownloadIcon, 
  UploadCloudIcon, 
  CopyIcon,
  TrashIcon,
  ImageIcon,
  LeafIcon,
  HeartPulseIcon,
  CogIcon,
  ZapIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon
} from './Icons';
import { ContentCard, Registration, Speaker, ScheduleItem, ImportantDate } from '../types';

// --- Icon Mapper for Dropdown ---
const IconMap: Record<string, React.ElementType> = {
  HeartPulse: HeartPulseIcon,
  Leaf: LeafIcon,
  Cog: CogIcon,
  Zap: ZapIcon,
  Users: UsersIcon,
  Calendar: CalendarIcon,
  MapPin: MapPinIcon
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T12:00:00');
  return {
    dayOfWeek: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
    day: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    full: date.toLocaleDateString('pt-BR')
  };
};

export const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [activeTab, setActiveTab] = useState<'cards' | 'speakers' | 'schedule' | 'settings' | 'registrations' | 'uploads' | 'dates'>('cards');
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [registrationFilter, setRegistrationFilter] = useState<'all' | 'attendee' | 'participant'>('all');
  
  // Edit State
  const [editCard, setEditCard] = useState<Partial<ContentCard> | null>(null);
  const [editSpeaker, setEditSpeaker] = useState<Partial<Speaker> | null>(null);
  const [editSchedule, setEditSchedule] = useState<Partial<ScheduleItem> | null>(null);
  const [editDate, setEditDate] = useState<Partial<ImportantDate> | null>(null);
  const [editHeroUrl, setEditHeroUrl] = useState('');
  const [editAboutUrl, setEditAboutUrl] = useState('');
  const [editGalleryUrls, setEditGalleryUrls] = useState('');

  // Upload & Gallery State
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [storedImages, setStoredImages] = useState<{name: string, url: string}[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCards();
      fetchSpeakers();
      fetchSchedule();
      fetchSiteContent();
      fetchRegistrations();
      fetchImportantDates();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'uploads') {
      fetchStoredImages();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCards = async () => {
    const { data } = await supabase.from('content_cards').select('*').order('display_order');
    if (data) setCards(data);
  };

  const fetchSpeakers = async () => {
    const { data } = await supabase.from('speakers').select('*').order('display_order');
    if (data) setSpeakers(data);
  };

  const fetchSchedule = async () => {
    const { data, error } = await supabase.from('schedule_items').select('*, schedule_item_speakers(*)').order('date').order('start_time');
    if (error) {
      console.error("admin_fetch_error", error);
      const { data: fallbackData } = await supabase.from('schedule_items').select('*').order('date').order('start_time');
      if (fallbackData) setScheduleItems(fallbackData);
    } else if (data) {
      const mapped = data.map(dbItem => {
        const item = {...dbItem} as any;
        item.speaker_ids = item.schedule_item_speakers ? item.schedule_item_speakers.map((s: any) => s.speaker_id) : (item.speaker_id ? [item.speaker_id] : []);
        return item;
      });
      setScheduleItems(mapped);
    }
  };

  const fetchImportantDates = async () => {
    const { data } = await supabase.from('important_dates').select('*').order('display_order');
    if (data) setImportantDates(data);
  };

  const fetchRegistrations = async () => {
    const { data } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    if (data) setRegistrations(data as Registration[]);
  };
  
  const fetchSiteContent = async () => {
    const { data } = await supabase.from('site_content').select('*');
    if (data) {
      const contentMap = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
      setEditHeroUrl(contentMap.hero_image_url || '');
      setEditAboutUrl(contentMap.about_image_url || '');
      setEditGalleryUrls(contentMap.gallery_image_urls || '');
    }
  };

  const fetchStoredImages = async () => {
    const { data, error } = await supabase.storage.from('images').list();
    if (data) {
      const images = data.map(file => {
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(file.name);
        return { name: file.name, url: urlData.publicUrl };
      });
      // Sort by name (newest might have timestamp prefix)
      images.sort((a, b) => b.name.localeCompare(a.name));
      setStoredImages(images);
    } else if (error) {
      console.error("Error fetching images", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (usernameInput === 'admin123' && passwordInput === 'mec3fadmin') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  // --- Content Card Logic ---
  const handleSaveCard = async () => {
    if (!editCard) return;
    setLoading(true);
    const { error } = await supabase.from('content_cards').upsert(editCard);
    if (error) alert(error.message);
    else {
      setEditCard(null);
      fetchCards();
    }
    setLoading(false);
  };

  const handleDeleteCard = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    const { error } = await supabase.from('content_cards').delete().eq('id', id);
    if (!error) fetchCards();
  };

  // --- Speaker Logic ---
  const handleSaveSpeaker = async () => {
    if (!editSpeaker) return;
    setLoading(true);
    const { error } = await supabase.from('speakers').upsert(editSpeaker);
    if (error) alert(error.message);
    else {
      setEditSpeaker(null);
      fetchSpeakers();
    }
    setLoading(false);
  };

  const handleDeleteSpeaker = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    const { error } = await supabase.from('speakers').delete().eq('id', id);
    if (!error) fetchSpeakers();
  };

  // --- Schedule Logic ---
  const handleSaveSchedule = async () => {
    if (!editSchedule) return;
    setLoading(true);
    
    const { speaker_ids, speakers, schedule_item_speakers, ...basePayload } = editSchedule as any;
    
    let speaker_id_val = basePayload.speaker_id === '' ? null : basePayload.speaker_id;
    if (speaker_ids && speaker_ids.length > 0) {
       speaker_id_val = speaker_ids[0];
    } else if (speaker_ids && speaker_ids.length === 0) {
       speaker_id_val = null;
    }

    const payload = {
        ...basePayload,
        speaker_id: speaker_id_val
    };

    const { data: insertedData, error } = await supabase.from('schedule_items').upsert(payload).select().single();
    
    if (error) {
       alert(error.message);
    } else if (insertedData) {
      if (speaker_ids) {
        try {
          await supabase.from('schedule_item_speakers').delete().eq('schedule_item_id', insertedData.id);
          if (speaker_ids.length > 0) {
            const insertPayload = speaker_ids.map((sId: string) => ({
              schedule_item_id: insertedData.id,
              speaker_id: sId
            }));
            await supabase.from('schedule_item_speakers').insert(insertPayload);
          }
        } catch (e) {
          console.error("Error updating multiple speakers join table:", e);
        }
      }
      setEditSchedule(null);
      fetchSchedule();
    } else {
      setEditSchedule(null);
      fetchSchedule();
    }
    setLoading(false);
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    const { error } = await supabase.from('schedule_items').delete().eq('id', id);
    if (!error) fetchSchedule();
  };
  
  // --- Site Content Logic ---
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const updates = [
        { key: 'hero_image_url', value: editHeroUrl },
        { key: 'about_image_url', value: editAboutUrl },
        { key: 'gallery_image_urls', value: editGalleryUrls },
      ];
      const { error } = await supabase.from('site_content').upsert(updates, { onConflict: 'key' });
      if (error) {
        throw error;
      }
      alert('Configurações salvas!');
      fetchSiteContent();
    } catch (error: any) {
      alert(`Erro ao salvar: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Image Upload Logic ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadError('');
      setUploading(true);
      setUploadedUrl('');

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para fazer upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);

      setUploadedUrl(data.publicUrl);
      fetchStoredImages(); 
    } catch (error: any) {
      setUploadError(error.message || 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copiado!');
  };

  const handleDeleteImage = async (imageName: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta imagem?")) return;
    
    const { error } = await supabase.storage.from('images').remove([imageName]);
    if (error) {
      alert("Erro ao excluir imagem: " + error.message);
    } else {
      fetchStoredImages();
    }
  };

  const handleSetHeroImage = async (url: string) => {
    if (!window.confirm("Adicionar esta imagem ao banner principal (Hero)?")) return;
    const newHeroValue = editHeroUrl ? `${editHeroUrl}\n${url}` : url;
    setEditHeroUrl(newHeroValue);
    const { error } = await supabase.from('site_content').upsert({ key: 'hero_image_url', value: newHeroValue }, { onConflict: 'key' });
    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Adicionado ao banner principal com sucesso!");
  };

  const handleSetAboutImage = async (url: string) => {
    if (!window.confirm("Definir esta imagem como a imagem da seção 'Sobre'?")) return;
    setEditAboutUrl(url);
    const { error } = await supabase.from('site_content').upsert({ key: 'about_image_url', value: url }, { onConflict: 'key' });
    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Imagem da seção 'Sobre' atualizada!");
  };

  const handleDeleteDate = async (id: string) => {
    if (!window.confirm("Excluir esta data?")) return;
    const { error } = await supabase.from('important_dates').delete().eq('id', id);
    if (error) alert("Erro ao excluir: " + error.message);
    else fetchImportantDates();
  };

  const handleSaveDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDate) return;

    setLoading(true);
    let error;
    
    // Prepare payload to avoid sending extra fields
    const payload = {
      description: editDate.description,
      date_text: editDate.date_text,
      display_order: editDate.display_order
    };

    if (editDate.id) {
      const { error: updateError } = await supabase
        .from('important_dates')
        .update(payload)
        .eq('id', editDate.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('important_dates')
        .insert(payload);
      error = insertError;
    }

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      setEditDate(null);
      fetchImportantDates();
    }
    setLoading(false);
  };

  const handleResetDates = async () => {
    if (!window.confirm("Isso apagará todas as datas existentes e restaurará o padrão. Continuar?")) return;
    setLoading(true);
    
    // Delete all existing
    const { error: deleteError } = await supabase.from('important_dates').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      alert("Erro ao limpar datas: " + deleteError.message);
      setLoading(false);
      return;
    }

    const defaultDates = [
      { description: 'Início das Inscrições', date_text: '15/03/2026', display_order: 1 },
      { description: 'Submissão de Resumos', date_text: 'Até 30/04/2026', display_order: 2 },
      { description: 'Divulgação dos Aceitos', date_text: '15/05/2026', display_order: 3 },
      { description: 'Início do Evento', date_text: '25/08/2026', display_order: 4 }
    ];

    for (const d of defaultDates) {
      await supabase.from('important_dates').insert(d);
    }
    
    await fetchImportantDates();
    setLoading(false);
    alert("Datas redefinidas com sucesso!");
  };

  const getFilteredRegistrations = () => {
    return registrations.filter(r => {
        if (registrationFilter === 'all') return true;
        if (registrationFilter === 'attendee') return r.role === 'Ouvinte';
        if (registrationFilter === 'participant') return r.role !== 'Ouvinte';
        return true;
    });
  };

  const handleDownloadCsv = () => {
    const dataToDownload = getFilteredRegistrations();
    if (dataToDownload.length === 0) {
      alert("Nenhuma inscrição encontrada para baixar com o filtro atual.");
      return;
    }

    const headers = ["Ticket", "Nome Completo", "Email", "Telefone", "CPF", "Documento", "Instituição", "Categoria/Função", "Estrangeiro", "Data de Inscrição"];
    const escapeCsv = (str: string | number | null | undefined | boolean): string => {
      if (str === null || str === undefined) return '""';
      let result = String(str);
      if (result.includes('"') || result.includes(',') || result.includes('\n')) {
        result = result.replace(/"/g, '""'); 
        return `"${result}"`;
      }
      return `"${result}"`;
    };

    const csvContent = [
      headers.join(','),
      ...dataToDownload.map(r => [
        escapeCsv(r.ticket_number),
        escapeCsv(r.full_name),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.cpf),
        escapeCsv(`${r.document_type || ''} ${r.document_number || ''}`.trim()),
        escapeCsv(r.institution),
        escapeCsv(r.role),
        escapeCsv(r.is_foreigner ? 'Sim' : 'Não'),
        escapeCsv(r.created_at ? new Date(r.created_at).toLocaleString('pt-BR') : '')
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inscricoes_mec3f_${registrationFilter}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="fixed inset-0 z-[60] bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XIcon /></button>
          <h2 className="text-xl font-bold text-center text-red-600 mb-4">Configuração Necessária</h2>
          <p className="text-gray-600 text-center mb-6">
            Você precisa configurar o arquivo <code>lib/supabase.ts</code> e rodar o SQL no painel para usar esta área.
          </p>
          <button onClick={onClose} className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-700">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[60] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XIcon /></button>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Painel Administrativo</h2>
            <p className="text-slate-500 text-sm mt-2">Área restrita para organizadores</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
               <input 
                 className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" 
                 type="text" 
                 placeholder="Digite seu usuário" 
                 value={usernameInput} 
                 onChange={e => setUsernameInput(e.target.value)} 
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
               <input 
                 className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" 
                 type="password" 
                 placeholder="Digite sua senha" 
                 value={passwordInput} 
                 onChange={e => setPasswordInput(e.target.value)} 
               />
             </div>
             <button 
               disabled={loading} 
               className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition shadow-lg mt-2"
             >
               {loading ? 'Verificando...' : 'Entrar'}
             </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredRegistrations = getFilteredRegistrations();

  return (
    <div className="fixed inset-0 z-[60] bg-gray-100 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-slate-800">Painel do Organizador</h2>
          <div className="flex gap-4">
             <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Sair</button>
             <button onClick={onClose} className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition">Voltar ao Site</button>
          </div>
        </div>

        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${activeTab === 'registrations' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Inscrições
          </button>
          <button 
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'cards' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Temáticas
          </button>
          <button 
            onClick={() => setActiveTab('speakers')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'speakers' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Palestrantes
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'schedule' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Programação
          </button>
          <button 
            onClick={() => setActiveTab('dates')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'dates' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Datas
          </button>
          <button 
            onClick={() => setActiveTab('uploads')}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${activeTab === 'uploads' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Uploads
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Configurações
          </button>
        </div>

        {activeTab === 'registrations' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold">Gerenciar Inscrições</h3>
                <p className="text-sm text-slate-500">
                   Mostrando {filteredRegistrations.length} de {registrations.length} inscritos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                   <button 
                     onClick={() => setRegistrationFilter('all')}
                     className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${registrationFilter === 'all' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                   >
                     Todos
                   </button>
                   <button 
                     onClick={() => setRegistrationFilter('attendee')}
                     className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${registrationFilter === 'attendee' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                   >
                     Ouvintes
                   </button>
                   <button 
                     onClick={() => setRegistrationFilter('participant')}
                     className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${registrationFilter === 'participant' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
                   >
                     Participantes
                   </button>
                </div>
                <button 
                  onClick={handleDownloadCsv}
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 shadow transition"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Baixar Lista (.csv)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instituição</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map(reg => (
                    <tr key={reg.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">#{reg.ticket_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reg.full_name}
                        {reg.is_foreigner && <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">Estrangeiro</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>{reg.email}</span>
                          <span className="text-xs text-slate-400">{reg.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {reg.cpf ? (
                           <div className="flex flex-col">
                             <span>CPF: {reg.cpf}</span>
                             <span className="text-xs text-slate-400">{reg.document_type}: {reg.document_number}</span>
                           </div>
                         ) : (
                           <span>{reg.document_type}: {reg.document_number}</span>
                         )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.institution}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${reg.role === 'Ouvinte' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                           {reg.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.created_at ? new Date(reg.created_at).toLocaleDateString('pt-BR') : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegistrations.length === 0 && (
                <div className="text-center p-8 text-gray-500">Nenhuma inscrição encontrada para este filtro.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Gerenciar Temáticas</h3>
              <button 
                onClick={() => setEditCard({ title: '', description: '', icon_name: 'Leaf', display_order: cards.length + 1 })}
                className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 shadow"
              >
                + Novo Card
              </button>
            </div>

            <div className="space-y-4">
               {cards.map(card => (
                 <div key={card.id} className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 gap-4">
                   <div>
                     <h4 className="font-bold text-slate-800">{card.title}</h4>
                     <p className="text-sm text-gray-600 truncate max-w-lg">{card.description}</p>
                   </div>
                   <div className="flex gap-4 text-sm font-medium">
                     <button onClick={() => setEditCard(card)} className="text-blue-600 hover:text-blue-800">Editar</button>
                     <button onClick={() => handleDeleteCard(card.id)} className="text-red-600 hover:text-red-800">Excluir</button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'speakers' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Gerenciar Palestrantes</h3>
              <button 
                onClick={() => setEditSpeaker({ name: '', institution: '', image_url: '', description: '', display_order: speakers.length + 1 })}
                className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 shadow"
              >
                + Novo Palestrante
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {speakers.map(speaker => (
                 <div key={speaker.id} className="border p-4 rounded-lg flex items-center bg-gray-50 gap-4">
                   <img src={speaker.image_url || 'https://via.placeholder.com/50'} alt="" className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                   <div className="flex-grow">
                     <h4 className="font-bold text-slate-800">{speaker.name}</h4>
                     <p className="text-xs text-gray-600">{speaker.institution}</p>
                   </div>
                   <div className="flex flex-col gap-2 text-xs font-medium">
                     <button onClick={() => setEditSpeaker(speaker)} className="text-blue-600 hover:text-blue-800">Editar</button>
                     <button onClick={() => handleDeleteSpeaker(speaker.id)} className="text-red-600 hover:text-red-800">Excluir</button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Gerenciar Programação</h3>
              <button 
                onClick={() => setEditSchedule({ 
                  date: '2026-08-25', 
                  start_time: '08:00', 
                  end_time: '09:00', 
                  title: '', 
                  type: 'lecture', 
                  description: '',
                  speaker_id: ''
                } as any)}
                className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 shadow"
              >
                + Novo Evento
              </button>
            </div>

            <div className="space-y-8">
               {Object.entries(
                 scheduleItems.reduce((acc, item) => {
                   if (!acc[item.date]) acc[item.date] = [];
                   acc[item.date].push(item);
                   return acc;
                 }, {} as Record<string, ScheduleItem[]>)
               ).sort(([dateA], [dateB]) => dateA.localeCompare(dateB)).map(([date, items]) => (
                 <div key={date} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                   <div className="bg-slate-50 p-4 border-b font-bold text-slate-800 flex items-center gap-2">
                     <CalendarIcon className="w-5 h-5 text-mec-teal" />
                     {formatDate(date).day} <span className="text-slate-500 font-normal capitalize">({formatDate(date).dayOfWeek})</span>
                   </div>
                   <div className="p-4 space-y-6">
                     {Object.entries(
                       (items as ScheduleItem[]).reduce((acc, item) => {
                         if (!acc[item.start_time]) acc[item.start_time] = [];
                         acc[item.start_time].push(item);
                         return acc;
                       }, {} as Record<string, ScheduleItem[]>)
                     ).sort(([timeA], [timeB]) => timeA.localeCompare(timeB)).map(([time, timeItems]) => (
                       <div key={time} className="flex flex-col md:flex-row gap-4 relative">
                         <div className="w-24 shrink-0 font-bold text-slate-600 pt-2 flex flex-col items-center md:items-start">
                           <span className="bg-slate-100 px-2 py-1 rounded text-sm border border-slate-200">{time}</span>
                         </div>
                         <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                           {(timeItems as ScheduleItem[]).map(item => {
                             const isTrack = !!item.track;
                             const trackColor = 
                               item.track === 1 ? 'bg-blue-50 border-blue-200 text-blue-900' :
                               item.track === 2 ? 'bg-green-50 border-green-200 text-green-900' :
                               item.track === 3 ? 'bg-slate-50 border-slate-200 text-slate-900' :
                               item.track === 4 ? 'bg-orange-50 border-orange-200 text-orange-900' : '';
                             
                             const typeColor = 
                               item.type === 'break' ? 'bg-gray-50 border-gray-300 text-gray-700' :
                               item.type === 'social' ? 'bg-yellow-50 border-yellow-300 text-yellow-800' :
                               item.type === 'ceremony' ? 'bg-purple-50 border-purple-300 text-purple-800' :
                               'bg-white border-mec-teal text-slate-800';

                             return (
                               <div key={item.id} className={`border p-3 rounded-lg flex flex-col justify-between shadow-sm hover:shadow transition-shadow ${isTrack ? trackColor : typeColor}`}>
                                 <div>
                                   <div className="flex justify-between items-start mb-2 gap-2">
                                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-white/60 truncate`}>
                                       {item.track ? `Trilha ${item.track}` : 
                                        item.type === 'break' ? 'Intervalo' : 
                                        item.type === 'social' ? 'Social' : 
                                        item.type === 'ceremony' ? 'Cerimônia' : 'Geral'}
                                     </span>
                                     <span className="text-xs opacity-70 whitespace-nowrap">{item.start_time} - {item.end_time}</span>
                                   </div>
                                   <h4 className="font-bold text-sm mb-1 line-clamp-2" title={item.title}>{item.title}</h4>
                                   {((item as any).speaker_ids && (item as any).speaker_ids.length > 0) ? (
                                     <p className="text-xs opacity-80 mb-2 truncate" title={(item as any).speaker_ids.map((sid: string) => speakers.find(s => s.id === sid)?.name).filter(Boolean).join(', ')}>
                                       {(item as any).speaker_ids.map((sid: string) => speakers.find(s => s.id === sid)?.name).filter(Boolean).join(', ')}
                                     </p>
                                   ) : item.speaker_id && (
                                     <p className="text-xs opacity-80 mb-2 truncate" title={speakers.find(s => s.id === item.speaker_id)?.name}>
                                       {speakers.find(s => s.id === item.speaker_id)?.name || 'Palestrante'}
                                     </p>
                                   )}
                                 </div>
                                 <div className="flex gap-3 text-xs font-bold mt-3 pt-2 border-t border-black/10">
                                   <button onClick={() => setEditSchedule(item)} className="text-blue-600 hover:text-blue-800 transition-colors">Editar</button>
                                   <button onClick={() => handleDeleteSchedule(item.id)} className="text-red-600 hover:text-red-800 transition-colors">Excluir</button>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
               {scheduleItems.length === 0 && <p className="text-gray-500 text-center py-8">Nenhum evento cadastrado.</p>}
            </div>
          </div>
        )}

        {/* Dates Tab */}
        {activeTab === 'dates' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Gerenciar Datas Importantes</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleResetDates}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 shadow"
                >
                  Restaurar Padrão
                </button>
                <button 
                  onClick={() => setEditDate({ description: '', date_text: '', display_order: 0 })}
                  className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 shadow"
                >
                  + Nova Data
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {importantDates.map(item => (
                <div key={item.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
                  <div>
                    <h4 className="font-bold text-slate-800">{item.description}</h4>
                    <p className="text-sm text-gray-600">{item.date_text}</p>
                  </div>
                  <div className="flex gap-4 text-xs font-medium">
                    <button onClick={() => setEditDate(item)} className="text-blue-600 hover:text-blue-800">Editar</button>
                    <button onClick={() => handleDeleteDate(item.id)} className="text-red-600 hover:text-red-800">Excluir</button>
                  </div>
                </div>
              ))}
              {importantDates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Nenhuma data cadastrada.</p>
                  <button 
                    onClick={handleResetDates}
                    className="text-emerald-600 hover:text-emerald-800 font-medium text-sm underline"
                  >
                    Adicionar datas padrão
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Date Modal */}
        {editDate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-4">{editDate.id ? 'Editar Data' : 'Nova Data'}</h3>
              <form onSubmit={handleSaveDate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                  <input 
                    type="text" 
                    value={editDate.description || ''} 
                    onChange={e => setEditDate({...editDate, description: e.target.value})} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    placeholder="Ex: Data limite para submissão"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data (Texto)</label>
                  <input 
                    type="text" 
                    value={editDate.date_text || ''} 
                    onChange={e => setEditDate({...editDate, date_text: e.target.value})} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    placeholder="Ex: 28/02/2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ordem de Exibição</label>
                  <input 
                    type="number" 
                    value={editDate.display_order || 0} 
                    onChange={e => setEditDate({...editDate, display_order: parseInt(e.target.value)})} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setEditDate(null)} 
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold shadow-md"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">Galeria de Imagens</h3>
            
            <div className="mb-8 p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center">
               <UploadCloudIcon className="w-12 h-12 mx-auto text-slate-400 mb-2" />
               <p className="text-slate-600 mb-4">Arraste uma imagem ou clique para selecionar</p>
               <input 
                 type="file" 
                 accept="image/*" 
                 onChange={handleImageUpload} 
                 disabled={uploading}
                 className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 mx-auto max-w-xs"
               />
               {uploading && <p className="text-emerald-600 mt-2 text-sm font-medium">Enviando...</p>}
               {uploadError && <p className="text-red-500 mt-2 text-sm">{uploadError}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {storedImages.map((img) => (
                <div key={img.name} className="group relative border rounded-lg overflow-hidden bg-gray-100 aspect-square">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <button onClick={() => handleCopyUrl(img.url)} className="text-white text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center gap-1 w-full justify-center">
                      <CopyIcon className="w-3 h-3" /> Copiar URL
                    </button>
                    <button onClick={() => handleSetHeroImage(img.url)} className="text-white text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center gap-1 w-full justify-center">
                       Definir Banner
                    </button>
                     <button onClick={() => handleSetAboutImage(img.url)} className="text-white text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center gap-1 w-full justify-center">
                       Definir Sobre
                    </button>
                    <button onClick={() => handleDeleteImage(img.name)} className="text-red-300 hover:text-red-500 text-xs mt-1 flex items-center gap-1 w-full justify-center">
                      <TrashIcon className="w-3 h-3" /> Excluir
                    </button>
                  </div>
                </div>
              ))}
              {storedImages.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">Nenhuma imagem na galeria.</p>}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">Configurações do Site</h3>
            <div className="space-y-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Imagens do Banner Principal (Hero)</label>
                <p className="text-xs text-slate-500 mb-2">Cole uma URL por linha. Essas imagens passarão no carrossel inicial.</p>
                <textarea 
                  className="w-full border p-3 rounded-lg h-32 font-mono text-sm"
                  value={editHeroUrl}
                  onChange={e => setEditHeroUrl(e.target.value)}
                  placeholder="https://live.staticflickr.com/65535/54007664478...jpg&#10;https://live.staticflickr.com/65535/54007664479...jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Imagem da Seção "Sobre"</label>
                <div className="flex gap-4 items-start">
                   <div className="flex-grow">
                      <input 
                        className="w-full border p-2 rounded-lg"
                        value={editAboutUrl}
                        onChange={e => setEditAboutUrl(e.target.value)}
                        placeholder="https://live.staticflickr.com/65535/54007664478...jpg"
                      />
                   </div>
                   {editAboutUrl && (
                     <img src={editAboutUrl} className="w-20 h-14 object-cover rounded border bg-gray-100" alt="Preview" />
                   )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Galeria de Imagens (URLs)</label>
                <p className="text-xs text-slate-500 mb-2">
                   Cole uma URL por linha (ex: Flickr). Se preenchido, o site usará estas imagens em vez das imagens do banco de dados (economizando banda).
                </p>
                <textarea 
                  className="w-full border p-3 rounded-lg h-32 font-mono text-sm"
                  value={editGalleryUrls}
                  onChange={e => setEditGalleryUrls(e.target.value)}
                  placeholder="https://live.staticflickr.com/65535/54007664478...jpg&#10;https://live.staticflickr.com/65535/54007664479...jpg"
                />
              </div>

              <div className="pt-4 border-t">
                <button 
                  onClick={handleSaveSettings}
                  disabled={loading}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition shadow"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Schedule Modal */}
        {editSchedule && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">{editSchedule.id ? 'Editar Evento' : 'Novo Evento'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                   <div className="col-span-3">
                     <label className="text-xs text-gray-500 block mb-1">Data</label>
                     <select 
                       className="w-full border p-2 rounded bg-white"
                       value={editSchedule.date}
                       onChange={e => setEditSchedule({...editSchedule, date: e.target.value})}
                     >
                       <option value="2026-08-25">25/08/2026 (Terça)</option>
                       <option value="2026-08-26">26/08/2026 (Quarta)</option>
                       <option value="2026-08-27">27/08/2026 (Quinta)</option>
                       <option value="2026-08-28">28/08/2026 (Sexta)</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 block mb-1">Início</label>
                     <input type="time" className="w-full border p-2 rounded" value={editSchedule.start_time} onChange={e => setEditSchedule({...editSchedule, start_time: e.target.value})} />
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 block mb-1">Fim</label>
                     <input type="time" className="w-full border p-2 rounded" value={editSchedule.end_time} onChange={e => setEditSchedule({...editSchedule, end_time: e.target.value})} />
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 block mb-1">Tipo</label>
                     <select className="w-full border p-2 rounded bg-white" value={editSchedule.type} onChange={e => setEditSchedule({...editSchedule, type: e.target.value as any})}>
                       <option value="lecture">Acadêmico</option>
                       <option value="break">Intervalo</option>
                       <option value="social">Social</option>
                       <option value="ceremony">Cerimônia</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 block mb-1">Trilha (Opcional)</label>
                     <select 
                       className="w-full border p-2 rounded bg-white" 
                       value={editSchedule.track || ''} 
                       onChange={e => setEditSchedule({...editSchedule, track: e.target.value ? Number(e.target.value) as 1|2|3|4 : undefined})}
                     >
                       <option value="">-- Nenhuma (Geral) --</option>
                       <option value="1">1 - Meio Ambiente e Saúde</option>
                       <option value="2">2 - Ecologia e Conservação</option>
                       <option value="3">3 - Engenharias e Sustentabilidade</option>
                       <option value="4">4 - Energia e Materiais</option>
                     </select>
                   </div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Título</label>
                   <input className="w-full border p-2 rounded" value={editSchedule.title} onChange={e => setEditSchedule({...editSchedule, title: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Descrição</label>
                   <textarea className="w-full border p-2 rounded h-20" value={editSchedule.description || ''} onChange={e => setEditSchedule({...editSchedule, description: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Palestrantes Associados (Selecione múltiplos usando Ctrl/Cmd)</label>
                   <select 
                      multiple
                      className="w-full border p-2 rounded bg-white h-32"
                      value={editSchedule.speaker_ids || (editSchedule.speaker_id ? [editSchedule.speaker_id] : [])}
                      onChange={e => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        setEditSchedule({...editSchedule, speaker_ids: selectedOptions});
                      }}
                   >
                     {speakers.map(s => (
                       <option key={s.id} value={s.id}>{s.name}</option>
                     ))}
                   </select>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditSchedule(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                  <button onClick={handleSaveSchedule} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Speaker Modal */}
        {editSpeaker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">{editSpeaker.id ? 'Editar Palestrante' : 'Novo Palestrante'}</h3>
              <div className="space-y-4">
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Nome</label>
                   <input className="w-full border p-2 rounded" value={editSpeaker.name || ''} onChange={e => setEditSpeaker({...editSpeaker, name: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Instituição</label>
                   <input className="w-full border p-2 rounded" value={editSpeaker.institution || ''} onChange={e => setEditSpeaker({...editSpeaker, institution: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">URL da Imagem</label>
                   <input className="w-full border p-2 rounded" value={editSpeaker.image_url || ''} onChange={e => setEditSpeaker({...editSpeaker, image_url: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Descrição</label>
                   <textarea className="w-full border p-2 rounded h-20" value={editSpeaker.description || ''} onChange={e => setEditSpeaker({...editSpeaker, description: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Ordem de Exibição</label>
                   <input type="number" className="w-full border p-2 rounded" value={editSpeaker.display_order || 0} onChange={e => setEditSpeaker({...editSpeaker, display_order: parseInt(e.target.value)})} />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditSpeaker(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                  <button onClick={handleSaveSpeaker} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Card Modal */}
        {editCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">{editCard.id ? 'Editar Temática' : 'Nova Temática'}</h3>
              <div className="space-y-4">
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Título</label>
                   <input className="w-full border p-2 rounded" value={editCard.title || ''} onChange={e => setEditCard({...editCard, title: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Descrição</label>
                   <textarea className="w-full border p-2 rounded h-20" value={editCard.description || ''} onChange={e => setEditCard({...editCard, description: e.target.value})} />
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Ícone</label>
                   <select className="w-full border p-2 rounded bg-white" value={editCard.icon_name || 'Leaf'} onChange={e => setEditCard({...editCard, icon_name: e.target.value})}>
                     {Object.keys(IconMap).map(icon => (
                       <option key={icon} value={icon}>{icon}</option>
                     ))}
                   </select>
                </div>
                <div>
                   <label className="text-xs text-gray-500 block mb-1">Ordem de Exibição</label>
                   <input type="number" className="w-full border p-2 rounded" value={editCard.display_order || 0} onChange={e => setEditCard({...editCard, display_order: parseInt(e.target.value)})} />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditCard(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                  <button onClick={handleSaveCard} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};