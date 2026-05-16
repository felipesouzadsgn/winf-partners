import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, 
  Home, Compass, Library, Heart, Settings, ListMusic, 
  Search, Bell, MoreHorizontal, User, Clock, Radio, Mic, Disc
} from 'lucide-react';

interface ModuleSynthwaveProps {
  onBack: () => void;
}

type Track = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  image: string;
};

const RECENT_TRACKS: Track[] = [
  { id: 1, title: 'Winf™ Harmony', artist: 'Winf Sound Experience', album: 'Winf Premium Collection', duration: '5:12', image: 'https://images.unsplash.com/photo-1614064641936-38204bfa95f3?auto=format&fit=crop&q=80&w=100' },
  { id: 2, title: 'Carbon Reflection', artist: 'AeroCore™ Ensemble', album: 'AeroCore™ Elite', duration: '4:35', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100' },
  { id: 3, title: 'Stratospheric Dreams', artist: 'GravityZero', album: 'Air Sounds', duration: '6:18', image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=100' },
  { id: 4, title: 'Deep Blue Horizon', artist: 'Marine Soundwaves', album: 'Oceanic Vibes', duration: '4:52', image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=100' },
  { id: 5, title: 'Invisible Shield', artist: 'Select Architects', album: 'Minimalist Series', duration: '3:45', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=100' },
  { id: 6, title: 'Ascend to Excellence', artist: 'Certification Masters', album: 'Elite Training', duration: '5:30', image: 'https://images.unsplash.com/photo-1559082260-26462c161be0?auto=format&fit=crop&q=80&w=100' },
];

const PLAYLISTS = [
  { id: 1, title: 'Winf Select™ Workspace', desc: 'Música para ambientes de trabalho.', info: '12 faixas • 55min', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300' },
  { id: 2, title: 'AeroCore™ MARINE Waves', desc: 'Sons náuticos para sua experiência.', info: '10 faixas • 48min', image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=300' },
  { id: 3, title: 'NeoSkin™ ADV-X Intensity', desc: 'Batidas intensas para proteção.', info: '15 faixas • 1h 05min', image: 'https://images.unsplash.com/photo-1503376713601-383b7aa36cc2?auto=format&fit=crop&q=80&w=300' },
  { id: 4, title: 'Winf Ascend™ Focus', desc: 'Música para concentração e foco.', info: '20 faixas • 1h 30min', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300' },
  { id: 5, title: 'W.A.R.P.™ Soundscape', desc: 'Paisagens sonoras premium.', info: '8 faixas • 42min', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' },
];

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${active ? 'text-white border-r-2 border-white bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm tracking-wide ${active ? 'font-semibold' : 'font-light'}`}>{label}</span>
  </button>
);

const ModuleSynthwave: React.FC<ModuleSynthwaveProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(RECENT_TRACKS[0]);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-white/20">
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden pb-24">
        
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-white/5 flex flex-col hidden md:flex">
          <div className="p-8 mb-4">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Voltar</span>
            </button>
            <div className="font-black text-xl tracking-tighter uppercase flex items-center gap-2 text-white">
              SYNTH<span className="font-light text-white/50">WAVE.FM</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="mb-8">
              <SidebarItem icon={Home} label="Início" active />
              <SidebarItem icon={Compass} label="Explorar" />
              <SidebarItem icon={Library} label="Biblioteca" />
            </div>

            <div className="mb-8">
              <div className="px-6 mb-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Sua Coleção</div>
              <SidebarItem icon={ListMusic} label="Playlists" />
              <SidebarItem icon={Heart} label="Favoritos" />
              <SidebarItem icon={Radio} label="Rádio IA" />
              <SidebarItem icon={Mic} label="Podcasts" />
            </div>
          </div>

          <div className="mt-auto py-4 border-t border-white/5">
            <SidebarItem icon={Settings} label="Configurações" />
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-zinc-900/40 to-[#0A0A0A] relative overflow-hidden">
          
          {/* Topbar */}
          <header className="h-20 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
             <div className="flex-1 max-w-md relative">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
               <input 
                 type="text" 
                 placeholder="Buscar playlists, podcasts, estudos de caso..." 
                 className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
               />
             </div>
             <div className="flex items-center gap-6 ml-4">
               <button className="text-white/50 hover:text-white transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full"></span>
               </button>
               <div className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                 <div className="w-8 h-8 rounded-full bg-indigo-950 flex items-center justify-center text-indigo-200 font-bold text-xs">
                   CM
                 </div>
                 <div className="flex flex-col hidden sm:flex">
                   <span className="text-xs font-semibold">Carlos Mendes</span>
                   <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Premium User</span>
                 </div>
               </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar scroll-smooth">
            
            {/* Hero Section */}
            <section className="mb-12 relative overflow-hidden rounded-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000" 
                alt="Winf Premium Collection" 
                className="w-full h-80 object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <span className="uppercase text-[10px] tracking-[0.3em] font-bold text-white/50 mb-4">Destaques</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
                  Winf Premium <br/> Collection
                </h2>
                <p className="text-white/60 font-light max-w-lg mb-8 leading-relaxed">
                  Uma coleção exclusiva de faixas premium selecionadas para acompanhar sua experiência Winf™.
                </p>
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    {isPlaying ? <Pause size={24} className="fill-black" /> : <Play size={24} className="fill-black ml-1" />}
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">25 faixas</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">1h 45min</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Playlists Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight text-white">Playlists Winf™</h3>
                <div className="flex gap-4">
                  {['Todas', 'Recentes', 'Populares', 'Exclusivas'].map((filter, i) => (
                    <button key={i} className={`text-[10px] uppercase tracking-widest font-bold pb-2 border-b-2 transition-colors ${i === 0 ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white'}`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {PLAYLISTS.map((playlist) => (
                  <div key={playlist.id} className="group cursor-pointer">
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-white/5 border border-white/5 aspect-square">
                      <img 
                        src={playlist.image} 
                        alt={playlist.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                        <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
                          <Play size={20} className="fill-black ml-1" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1 truncate">{playlist.title}</h4>
                    <p className="text-xs text-white/40 font-light truncate mb-2">{playlist.desc}</p>
                    <p className="text-[10px] font-mono text-white/30">{playlist.info}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tracklist Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                  <Clock size={24} className="text-white/50" /> Faixas Recentes
                </h3>
              </div>
              
              <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-white/50 text-[10px] uppercase tracking-widest">
                      <th className="font-medium p-4 w-12 text-center">#</th>
                      <th className="font-medium p-4">Faixa</th>
                      <th className="font-medium p-4 hidden md:table-cell">Álbum</th>
                      <th className="font-medium p-4 hidden sm:table-cell">Duração</th>
                      <th className="font-medium p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_TRACKS.map((track, index) => (
                      <tr 
                        key={track.id} 
                        onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                        className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group ${currentTrack.id === track.id ? 'bg-white/5' : ''}`}
                      >
                        <td className="p-4 text-center text-white/40 font-mono text-xs w-12">
                          {currentTrack.id === track.id && isPlaying ? (
                            <div className="flex items-end justify-center gap-0.5 h-3">
                              <div className="w-0.5 bg-white rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{height: '100%'}}></div>
                              <div className="w-0.5 bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" style={{height: '60%'}}></div>
                              <div className="w-0.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{height: '80%'}}></div>
                              <div className="w-0.5 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" style={{height: '40%'}}></div>
                            </div>
                          ) : (
                            <span className="group-hover:hidden">{index + 1}</span>
                          )}
                          <Play size={14} className="hidden group-hover:inline-block fill-white" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img src={track.image} alt={track.title} className="w-10 h-10 object-cover rounded bg-white/10 grayscale group-hover:grayscale-0 transition-all" />
                            <div>
                              <div className={`text-sm font-semibold mb-0.5 ${currentTrack.id === track.id ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>{track.title}</div>
                              <div className="text-xs text-white/50">{track.artist}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-light text-white/50 hidden md:table-cell group-hover:text-white/70 transition-colors">{track.album}</td>
                        <td className="p-4 text-xs font-mono text-white/40 hidden sm:table-cell">{track.duration}</td>
                        <td className="p-4 text-right">
                          <button className="text-white/0 group-hover:text-white/50 hover:!text-white transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                 <button className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Ver histórico completo</button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <div className="h-24 bg-[#0A0A0A] border-t border-white/5 fixed bottom-0 w-full z-50 flex items-center justify-between px-4 md:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Now Playing */}
        <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
          <div className="relative group overflow-hidden rounded border border-white/10 w-14 h-14 hidden sm:block">
            <img src={currentTrack.image} alt="Album Art" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Ao Vivo
            </div>
            <span className="text-sm font-bold text-white truncate">{currentTrack.title}</span>
            <span className="text-xs text-white/50 truncate hover:text-white/80 cursor-pointer transition-colors max-w-[150px] md:max-w-xs">{currentTrack.artist}</span>
          </div>
          <button className="ml-2 text-white/30 hover:text-white transition-colors hidden lg:block">
            <Heart size={18} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1 max-w-2xl px-4">
          <div className="flex items-center gap-6 mb-2">
            <button className="text-white/40 hover:text-white transition-colors hidden sm:block">
              <ListMusic size={16} />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <SkipBack size={20} className="fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="fill-black ml-1" />}
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <SkipForward size={20} className="fill-current" />
            </button>
            <button className="text-white/40 hover:text-white transition-colors hidden sm:block">
              <Disc size={16} />
            </button>
          </div>
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/40 min-w-[35px] text-right">
              1:45
            </span>
            <div className="h-1.5 bg-white/10 rounded-full flex-1 relative group cursor-pointer overflow-hidden border border-white/5">
              <div 
                className="absolute top-0 left-0 h-full bg-white rounded-full opacity-80" 
                style={{ width: `${progress}%` }} 
              />
              <div className="absolute top-0 left-0 h-full bg-white/20 w-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-mono text-white/40 min-w-[35px]">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* System Controls */}
        <div className="flex items-center justify-end gap-4 w-1/4 min-w-[150px] hidden md:flex">
          <button className="text-white/40 hover:text-white transition-colors">
            <Mic size={18} />
          </button>
          <div className="flex items-center gap-2 w-32 group cursor-pointer">
            <Volume2 size={18} className="text-white/60 group-hover:text-white transition-colors" />
            <div className="h-1.5 bg-white/10 rounded-full flex-1 relative overflow-hidden border border-white/5">
              <div className="absolute top-0 left-0 h-full bg-white/80 w-2/3 rounded-full group-hover:bg-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSynthwave;

