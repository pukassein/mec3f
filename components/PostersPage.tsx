import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Poster, ThemeType } from '../types';
import { Search, ArrowLeft } from 'lucide-react';

const THEME_COLORS: Record<string, { bg: string; text: string }> = {
  [ThemeType.HEALTH]: { bg: 'bg-green-100', text: 'text-green-800' },
  [ThemeType.ECOLOGY]: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  [ThemeType.ENGINEERING]: { bg: 'bg-blue-100', text: 'text-blue-800' },
  [ThemeType.ENERGY]: { bg: 'bg-amber-100', text: 'text-amber-800' },
};

export default function PostersPage({ onBack }: { onBack: () => void }) {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosters();
    
    const subscription = supabase
      .channel('public:posters')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posters' }, fetchPosters)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .order('theme', { ascending: true })
        .order('code', { ascending: true });
        
      if (error) throw error;
      setPosters(data || []);
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosters = posters.filter(poster => 
    (poster.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (poster.authors?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (poster.presenter?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (poster.code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (poster.theme?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const postersByTheme = filteredPosters.reduce((acc, poster) => {
    if (!acc[poster.theme]) {
      acc[poster.theme] = [];
    }
    acc[poster.theme].push(poster);
    return acc;
  }, {} as Record<string, Poster[]>);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="inline-flex items-center text-green-700 hover:text-green-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a página inicial
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trabalhos para Sessão de Pôster</h1>
          <p className="text-gray-600 mb-6">Quarta-feira, 16h - 26/08</p>
          
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
              placeholder="Buscar por código, título, autor ou temática..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">Nenhum pôster cadastrado no momento.</p>
          </div>
        ) : filteredPosters.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">Nenhum pôster encontrado com esses termos de busca.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(postersByTheme).map(([theme, themePosters]) => {
              const themeColor = THEME_COLORS[theme] || { bg: 'bg-gray-100', text: 'text-gray-800' };
              
              return (
                <div key={theme} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                  <div className={`px-6 py-4 border-b border-gray-200 ${themeColor.bg}`}>
                    <h2 className={`text-xl font-semibold ${themeColor.text}`}>{theme}</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            Código
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                            Título
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Autores
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(themePosters as Poster[]).map((poster) => (
                          <tr key={poster.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-100">
                              {poster.code}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                              {poster.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>{poster.authors}</div>
                              {poster.presenter && <div className="mt-1 text-xs text-green-700 font-medium">Apresentador(a): {poster.presenter}</div>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
