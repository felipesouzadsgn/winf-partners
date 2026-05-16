
import React from 'react';
import { ChevronLeft, QrCode, Shield, Hexagon, Star, Calendar, MapPin, Share2, Edit, Award } from 'lucide-react';
import { User } from '../types';

interface MemberOnePageProps {
  user: User;
  onBack: () => void;
}

const MemberOnePage: React.FC<MemberOnePageProps> = ({ user, onBack }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Navigation */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
            <ChevronLeft size={14} /> Voltar ao Dashboard
        </button>
        <div className="text-right">
            <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Winf ID System</p>
            <p className="text-sm text-white font-mono">{user.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Digital ID Card */}
        <div className="lg:col-span-5 space-y-6">
            <div className="relative group perspective-1000">
                {/* The Card */}
                <div className="relative w-full aspect-[1.58/1] bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-none border border-white/10 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/10 rounded-none blur-[80px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-800/10 rounded-none blur-[80px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>

                    {/* Content */}
                    <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded-none">W</span>
                                <span className="text-white font-heading font-bold tracking-widest text-lg">WINF ACCESS</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs md:text-[10px] text-white/40 font-bold uppercase tracking-widest border border-zinc-700/30 px-2 py-0.5 rounded-none bg-zinc-800/5">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 rounded-none bg-gray-800 border-2 border-white/10 overflow-hidden shadow-inner relative">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-black text-white/40 font-bold text-2xl">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl text-white font-bold font-heading uppercase leading-none mb-1">{user.name}</h2>
                                {user.company && <p className="text-sm text-white/40 font-light">{user.company}</p>}
                                <p className="text-xs md:text-[10px] text-white/40 mt-2 font-mono flex items-center gap-1">
                                    <Shield size={10} className="text-green-500" /> VERIFIED MEMBER
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/5 pt-4">
                            <div>
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-wider">Member Since</p>
                                <p className="text-xs text-white font-mono">2023</p>
                            </div>
                            <div>
                                <p className="text-xs md:text-[10px] md:text-sm md:text-[11px] text-white/40 uppercase tracking-wider">Level</p>
                                <p className="text-xs text-white/40 font-bold uppercase">{user.w_rank_level}</p>
                            </div>
                            <QrCode size={32} className="text-white opacity-80" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-none text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={14} /> Compartilhar ID
                </button>
                <button className="flex-1 bg-zinc-800/10 border border-zinc-700/30 text-white/40 py-3 rounded-none text-xs font-bold uppercase tracking-wider hover:bg-zinc-800/20 transition-colors flex items-center justify-center gap-2">
                    <Edit size={14} /> Editar Perfil
                </button>
            </div>
        </div>

        {/* Right Column: Stats & Details */}
        <div className="lg:col-span-7 space-y-6">
            
            {/* W-Rank Status */}
            <div className="bg-winf-card border border-white/10 rounded-none p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/5 rounded-none blur-2xl"></div>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <Hexagon size={20} className="text-white/40" /> W-Rank Status
                        </h3>
                        <p className="text-sm text-white/40">Sua jornada de evolução no ecossistema.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white">{user.w_rank_xp.toLocaleString()}</p>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase tracking-widest">Total XP</p>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-none text-white/40 bg-zinc-800/10">
                                {user.w_rank_level}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-white/40">
                                Próximo: Master
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-none bg-gray-800">
                        <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-zinc-800 to-zinc-950"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-white/5 rounded-none border border-white/5">
                        <Award size={20} className="text-white mx-auto mb-2" />
                        <p className="text-xl font-bold text-white">12</p>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase">Conquistas</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-none border border-white/5">
                        <Star size={20} className="text-white/40 mx-auto mb-2" />
                        <p className="text-xl font-bold text-white">Top 5%</p>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase">Global Rank</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-none border border-white/5">
                        <Calendar size={20} className="text-green-500 mx-auto mb-2" />
                        <p className="text-xl font-bold text-white">245</p>
                        <p className="text-xs md:text-[10px] text-white/40 uppercase">Dias Ativo</p>
                    </div>
                </div>
            </div>

            {/* Installer Profile (WINF Authorized Glass Technician) */}
            {(user.role === 'Instalador' || user.role === 'Licenciado') && (
                <div className="bg-winf-card border border-white/10 rounded-none p-6">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 mb-6">
                        <Award size={20} className="text-white" /> WINF Authorized Glass Technician™
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40">Nível Técnico</p>
                                <p className="text-white font-bold">{user.technical_level || 'Não avaliado'}</p>
                            </div>
                            <div>
                                <p className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40">Cidade de Atuação</p>
                                <p className="text-white font-bold">{user.city || user.address?.city || 'Não informada'}</p>
                            </div>
                            <div>
                                <p className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40">Instalações Registradas</p>
                                <p className="text-white font-bold text-2xl">{user.installation_history_count || 0}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Certificações</p>
                            <div className="space-y-2">
                                {user.certifications && user.certifications.length > 0 ? (
                                    user.certifications.map((cert, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-white/60 bg-black/40 p-2 rounded-none border border-white/5">
                                            <Shield size={14} className="text-green-500" /> {cert}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/40 italic">Nenhuma certificação registrada.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Details */}
            <div className="bg-winf-card border border-white/10 rounded-none p-6">
                <h3 className="text-white font-bold text-lg mb-4">Dados Cadastrais</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Email</span>
                        <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Telefone</span>
                        <span className="text-white">{user.phone || 'Não informado'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Documento (CNPJ/CPF)</span>
                        <span className="text-white">{user.cnpj || '***.***.***-**'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-white/40 flex items-center gap-2"><MapPin size={14}/> Localização</span>
                        <span className="text-white text-right">
                            {user.address ? `${user.address.city}, ${user.address.state}` : 'Endereço não cadastrado'}
                        </span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default MemberOnePage;
