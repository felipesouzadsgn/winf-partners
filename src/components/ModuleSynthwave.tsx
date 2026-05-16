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
  <button className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${active ? 'text-white border-r border-white bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm md:text-[11px] uppercase tracking-widest ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
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
    <div className="flex flex-col h-screen w-full fixed inset-0 z-50 bg-[#050505] text-white font-sans overflow-hidden selection:bg-white/20">
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden pb-24">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#020202] border-r border-white/5 flex flex-col hidden md:flex relative z-10">
          <div className="p-8 mb-4">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs md:text-[10px] uppercase tracking-widest font-black">Sair da Sessão</span>
            </button>
            <div className="font-black text-2xl tracking-tighter uppercase flex items-center gap-2 text-white/90">
              SYNTH<span className="font-light text-white/40">WAVE.FM</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="mb-8">
              <SidebarItem icon={Home} label="Início" active />
              <SidebarItem icon={Compass} label="Explorar" />
              <SidebarItem icon={Library} label="Biblioteca" />
            </div>

            <div className="mb-8">
              <div className="px-6 mb-4 mt-2 text-xs md:text-[10px] md:text-sm md:text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">Coleção Privada</div>
              <SidebarItem icon={ListMusic} label="Playlists" />
              <SidebarItem icon={Heart} label="Audios" />
              <SidebarItem icon={Radio} label="Rádio AI" />
              <SidebarItem icon={Mic} label="Mastercast" />
            </div>
          </div>

          <div className="mt-auto py-4 border-t border-white/5 bg-[#020202]">
            <SidebarItem icon={Settings} label="Preferências" />
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-zinc-900/30 to-[#050505] relative overflow-hidden">
          
          {/* Topbar */}
          <header className="h-24 px-8 flex items-center justify-between bg-[#050505]/40 backdrop-blur-xl sticky top-0 z-20 border-b border-white/5">
             <div className="flex-1 max-w-md relative group">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white/50 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Buscar experiências, imersão, frequências..." 
                 className="w-full bg-[#0A0A0A] border border-white/5 rounded-none py-3.5 pl-12 pr-4 text-xs font-medium tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-[#0A0A0A] transition-all"
               />
             </div>
             <div className="flex items-center gap-6 ml-4">
               <button className="text-white/30 hover:text-white transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></span>
               </button>
               <div className="flex items-center gap-3 bg-[#0A0A0A] pl-2 pr-5 py-2 rounded-full border border-white/5 cursor-pointer hover:border-white/20 transition-all">
                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs md:text-[10px] uppercase shadow-inner">
                   CM
                 </div>
                 <div className="flex flex-col hidden sm:flex">
                   <span className="text-sm md:text-[11px] font-bold text-white/90">CARLOS MENDES</span>
                   <span className="text-[10px] md:text-[8px] uppercase tracking-[0.2em] text-[#D4AF37] font-black shadow-black drop-shadow-sm">Black Access</span>
                 </div>
               </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar scroll-smooth">
            
            {/* Hero Section */}
            <section className="mb-14 relative overflow-hidden rounded-none group cursor-pointer border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000" 
                alt="Winf Premium Collection" 
                className="w-full h-96 object-cover opacity-50 group-hover:scale-[1.02] transition-transform duration-[2s] grayscale"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-8 md:p-14">
                <span className="uppercase text-xs md:text-[10px] md:text-sm md:text-[11px] tracking-[0.4em] font-black text-white/40 mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-white/40"></span> Coleção Master
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none shadow-black drop-shadow-2xl">
                  ESSENTIAL <br/> EXPERIENCES
                </h2>
                <p className="text-white/50 font-medium max-w-lg mb-10 leading-relaxed text-sm">
                  Ondas sonoras precisamente selecionadas para maximizar foco, serenidade e controle no ambiente de negócios. Acústica em altíssima fidelidade.
                </p>
                <div className="flex items-center gap-8">
                  <button onClick={togglePlay} className="h-16 px-6 md:px-10 bg-white text-black rounded-none flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all font-black text-xs md:text-[10px] uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    {isPlaying ? (
                      <><Pause size={16} className="fill-black" /> Pausar Frequência</>
                    ) : (
                      <><Play size={16} className="fill-black ml-1" /> Iniciar Imersão</>
                    )}
                  </button>
                  <div className="flex flex-col border-l border-white/10 pl-8">
                    <span className="text-sm md:text-[11px] font-black uppercase tracking-widest text-white/90">25 FAIXAS REMASTERIZADAS</span>
                    <span className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mt-1">Lossless Audio</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Playlists Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black tracking-tighter text-white uppercase">Curadoria</h3>
                <div className="flex gap-6">
                  {['Private', 'Recentes', 'Tendências', 'Oficinais'].map((filter, i) => (
                    <button key={i} className={`text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-black pb-2 border-b-2 transition-colors ${i === 0 ? 'border-white text-white' : 'border-transparent text-white/30 hover:text-white/70'}`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {PLAYLISTS.map((playlist) => (
                  <div key={playlist.id} className="group cursor-pointer">
                    <div className="relative mb-5 overflow-hidden rounded-none border border-white/5 bg-[#0A0A0A] aspect-square">
                      <img 
                        src={playlist.image} 
                        alt={playlist.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                        <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          <Play size={18} className="fill-black ml-1" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-white/90 mb-1.5 truncate uppercase tracking-tight">{playlist.title}</h4>
                    <p className="text-sm md:text-[11px] text-white/40 font-medium truncate mb-2">{playlist.desc}</p>
                    <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] font-black uppercase tracking-widest text-white/20">{playlist.info}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tracklist Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-3">
                  <span className="w-4 h-px bg-white/50"></span> Recentes
                </h3>
              </div>
              
              <div className="bg-transparent border border-white/5 rounded-none overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-white/30 text-xs md:text-[10px] md:text-sm md:text-[11px] uppercase tracking-[0.2em] font-black bg-[#0A0A0A]">
                      <th className="p-5 w-16 text-center">Ord</th>
                      <th className="p-5">Composição</th>
                      <th className="p-5 hidden md:table-cell">Compilação</th>
                      <th className="p-5 hidden sm:table-cell">Tempo</th>
                      <th className="p-5 w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#050505]/50">
                    {RECENT_TRACKS.map((track, index) => (
                      <tr 
                        key={track.id} 
                        onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                        className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group ${currentTrack.id === track.id ? 'bg-[#0A0A0A]' : ''}`}
                      >
                        <td className="p-5 text-center text-white/30 font-black text-xs w-16">
                          {currentTrack.id === track.id && isPlaying ? (
                            <div className="flex items-end justify-center gap-1 h-3">
                              <div className="w-[2px] bg-white rounded-none animate-[pulse_1s_ease-in-out_infinite]" style={{height: '100%'}}></div>
                              <div className="w-[2px] bg-white rounded-none animate-[pulse_1.5s_ease-in-out_infinite]" style={{height: '60%'}}></div>
                              <div className="w-[2px] bg-white rounded-none animate-[pulse_0.8s_ease-in-out_infinite]" style={{height: '80%'}}></div>
                            </div>
                          ) : (
                            <span className="group-hover:hidden">{String(index + 1).padStart(2, '0')}</span>
                          )}
                          <Play size={14} className="hidden group-hover:inline-block fill-white/80" />
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-5">
                            <div className="relative w-12 h-12 overflow-hidden border border-white/10">
                              <img src={track.image} alt={track.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div>
                              <div className={`text-sm font-bold tracking-tight mb-1 ${currentTrack.id === track.id ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{track.title}</div>
                              <div className="text-sm md:text-[11px] text-white/40 uppercase tracking-wider font-semibold">{track.artist}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-sm md:text-[11px] font-semibold tracking-wide text-white/30 hidden md:table-cell group-hover:text-white/50 transition-colors uppercase">{track.album}</td>
                        <td className="p-5 text-sm md:text-[11px] font-mono text-white/30 hidden sm:table-cell">{track.duration}</td>
                        <td className="p-5 text-right">
                          <button className="text-white/0 group-hover:text-white/40 hover:!text-white transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Player Bar (Sophisticated) */}
      <div className="h-28 bg-[#020202] border-t border-white/10 fixed bottom-0 left-0 w-full z-[60] flex items-center justify-between px-6 md:px-10">
        
        {/* Now Playing */}
        <div className="flex items-center gap-6 w-1/4 min-w-[200px]">
          <div className="relative group overflow-hidden border border-white/10 w-16 h-16 hidden sm:block bg-[#0A0A0A]">
            <img src={currentTrack.image} alt="Album Art" className="w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-1000 grayscale" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-[#D4AF37] uppercase tracking-[0.3em] font-black mb-1.5 flex items-center gap-2">
               Hi-Res Audio
            </div>
            <span className="text-sm font-black text-white truncate uppercase tracking-tight">{currentTrack.title}</span>
            <span className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest truncate mt-0.5">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1 max-w-2xl px-6">
          <div className="flex items-center gap-8 mb-3">
            <button className="text-white/20 hover:text-white/60 transition-colors hidden sm:block">
              <ListMusic size={16} />
            </button>
            <button className="text-white/40 hover:text-white transition-colors group">
              <SkipBack size={20} className="fill-current group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              {isPlaying ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black ml-1" />}
            </button>
            <button className="text-white/40 hover:text-white transition-colors group">
              <SkipForward size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-white/20 hover:text-white/60 transition-colors hidden sm:block">
              <Disc size={16} />
            </button>
          </div>
          <div className="w-full flex items-center gap-4">
            <span className="text-xs md:text-[10px] font-mono text-white/30 min-w-[35px] text-right font-bold">
              0:00
            </span>
            <div className="h-1 bg-[#111] w-full relative group cursor-pointer overflow-hidden border-y border-transparent hover:border-white/5 transition-colors">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-zinc-700 to-white" 
                style={{ width: `${progress}%` }} 
              />
              <div className="absolute top-0 left-0 h-full bg-white/10 w-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs md:text-[10px] font-mono text-white/30 min-w-[35px] font-bold">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* System Controls */}
        <div className="flex items-center justify-end gap-6 w-1/4 min-w-[150px] hidden md:flex">
          <button className="text-white/30 hover:text-white transition-colors">
            <Mic size={18} />
          </button>
          <div className="flex items-center gap-3 w-32 group cursor-pointer">
            <Volume2 size={18} className="text-white/40 group-hover:text-white transition-colors" />
            <div className="h-1 bg-[#111] flex-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-white/50 w-2/3 group-hover:bg-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSynthwave;
