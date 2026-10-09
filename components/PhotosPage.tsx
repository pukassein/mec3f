import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { DRIVE_ALBUMS, DRIVE_GALLERY_URL, DrivePhoto } from '../data/photoAlbums';

const PAGE_SIZE = 30;

const thumbnailUrl = (id: string, width = 900) =>
  `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${width}`;

const originalUrl = (id: string) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;

const PhotoTile = ({ photo, onOpen }: { photo: DrivePhoto; onOpen: () => void }) => {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-mec-teal/30"
      aria-label={`Abrir ${photo.name}`}
    >
      {failed ? (
        <span className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-slate-500">
          <ImageIcon className="h-8 w-8" />
          <span className="text-xs font-medium">Abrir foto no Google Drive</span>
        </span>
      ) : (
        <img
          src={thumbnailUrl(photo.id)}
          alt={photo.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
        {photo.name}
      </span>
    </button>
  );
};

const Lightbox = ({ photos, index, onClose, onChange }: { photos: DrivePhoto[]; index: number; onClose: () => void; onChange: (index: number) => void }) => {
  const photo = photos[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length);
      if (event.key === 'ArrowRight') onChange((index + 1) % photos.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [index, onChange, onClose, photos.length]);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/95 p-3 sm:p-8" role="dialog" aria-modal="true" aria-label="Visualizador de fotos">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Fechar">
        <X className="h-6 w-6" />
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" onClick={() => onChange((index - 1 + photos.length) % photos.length)} className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6" aria-label="Foto anterior">
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button type="button" onClick={() => onChange((index + 1) % photos.length)} className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6" aria-label="Próxima foto">
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}
      <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center gap-4">
        <img src={thumbnailUrl(photo.id, 2200)} alt={photo.name} referrerPolicy="no-referrer" className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl" />
        <div className="flex w-full max-w-3xl items-center justify-between gap-4 text-sm text-white/80">
          <span className="truncate">{photo.name}</span>
          <span className="shrink-0">{index + 1} / {photos.length}</span>
          <a href={originalUrl(photo.id)} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 font-semibold text-white hover:text-emerald-300">
            Original <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function PhotosPage({ onBack }: { onBack: () => void }) {
  const [albumIndex, setAlbumIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const album = DRIVE_ALBUMS[albumIndex];
  const totalPhotos = useMemo(() => DRIVE_ALBUMS.reduce((sum, item) => sum + item.photos.length, 0), []);

  const selectAlbum = (index: number) => {
    setAlbumIndex(index);
    setVisibleCount(PAGE_SIZE);
    setSelectedIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative overflow-hidden bg-gradient-to-br from-mec-teal via-emerald-700 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_35%),radial-gradient(circle_at_80%_0%,#fde047_0,transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <button type="button" onClick={onBack} className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </button>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-emerald-200">Memórias do evento</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Fotos do 6º MEC3F</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">Reviva os quatro dias do encontro. São {totalPhotos.toLocaleString('pt-BR')} fotos organizadas por dia e atividade.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-3" aria-label="Álbuns de fotos">
          {DRIVE_ALBUMS.map((item, index) => (
            <button key={item.id} type="button" onClick={() => selectAlbum(index)} className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${index === albumIndex ? 'bg-mec-teal text-white shadow-lg shadow-emerald-900/15' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-mec-teal hover:ring-mec-teal/40'}`}>
              {item.title} <span className="ml-1 opacity-70">({item.photos.length})</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-mec-teal">Álbum selecionado</p>
            <h2 className="mt-1 text-3xl font-black text-slate-900">{album.title}</h2>
            <p className="mt-1 text-slate-500">{album.photos.length} fotos</p>
          </div>
          <a href={album.folderUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-mec-teal hover:ring-mec-teal/40">
            Ver pasta no Drive <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {album.photos.slice(0, visibleCount).map((photo, index) => (
            <div key={photo.id} className="contents">
              <PhotoTile photo={photo} onOpen={() => setSelectedIndex(index)} />
            </div>
          ))}
        </div>

        {visibleCount < album.photos.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)} className="rounded-full bg-slate-900 px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-mec-teal">
              Carregar mais fotos
            </button>
          </div>
        )}

        <div className="mt-14 rounded-3xl bg-white p-6 text-center ring-1 ring-slate-200 sm:p-8">
          <p className="font-semibold text-slate-700">As imagens permanecem armazenadas no Google Drive.</p>
          <a href={DRIVE_GALLERY_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-bold text-mec-teal hover:underline">Abrir pasta completa <ExternalLink className="h-4 w-4" /></a>
        </div>
      </main>

      {selectedIndex !== null && <Lightbox photos={album.photos} index={selectedIndex} onClose={() => setSelectedIndex(null)} onChange={setSelectedIndex} />}
    </div>
  );
}
