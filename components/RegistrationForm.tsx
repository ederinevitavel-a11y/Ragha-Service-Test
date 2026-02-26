
import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, Coins, Map as MapIcon, 
  ChevronLeft, CheckCircle2, 
  Trophy, Sparkles, Send,
  Zap, User, Phone, ChevronDown, CheckSquare, Square,
  ClipboardList, Gift, AlertCircle, FileText, Info, RefreshCw
} from 'lucide-react';
import { FormData, Vocation, Quest, PaymentMethod, ServiceLocation } from '../types';
import { submitToGoogleSheets } from '../services/sheetsService';

interface RegistrationFormProps {
  onBack: () => void;
}

interface ThemeConfig {
  name: string;
  color: string;
  glow: string;
  secondary: string;
}

const themes: Record<string, ThemeConfig> = {
  [Quest.ROTTEN_BLOOD]: {
    name: 'ROTTEN BLOOD',
    color: '#ff0000',
    glow: 'rgba(255, 0, 0, 0.6)',
    secondary: '#450a0a',
  },
  [Quest.PRIMAL_ORDEAL]: {
    name: 'PRIMAL ORDEAL',
    color: '#fbbf24', 
    glow: 'rgba(251, 191, 36, 0.6)',
    secondary: '#451a03',
  },
  [Quest.SOUL_WAR]: {
    name: 'SOUL WAR',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.6)',
    secondary: '#2e1065',
  },
  [Quest.GRAVEBORN]: {
    name: 'GRAVEBORN',
    color: '#00f2ff',
    glow: 'rgba(0, 242, 255, 0.6)',
    secondary: '#083344',
  },
  'DEFAULT': {
    name: 'ESCOLHA SUA JORNADA',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.1)',
    secondary: '#111111',
  }
};

const questIcons: Record<string, string> = {
  [Quest.ROTTEN_BLOOD]: '🩸',
  [Quest.PRIMAL_ORDEAL]: '👾',
  [Quest.SOUL_WAR]: '👻',
  [Quest.GRAVEBORN]: '⚰️'
};

const vocationIcons: Record<string, string> = {
  [Vocation.EK]: '⚔️',
  [Vocation.ED]: '❄️',
  [Vocation.MS]: '🔥',
  [Vocation.EX_MONK]: '👊',
  [Vocation.RP]: '🏹'
};

const paymentIcons: Record<string, string> = {
  [PaymentMethod.COINS]: '🤑',
  [PaymentMethod.PERCENTAGE]: '💰',
  [PaymentMethod.CLOSED_PT]: '👥'
};

const locationIcons: Record<string, string> = {
  [ServiceLocation.KALIBRA]: '🌏',
  [ServiceLocation.OTHER]: '🪐'
};

const questInfo: Record<string, { requirements: string[], vocations: string[], rewards: string[], note?: string }> = {
  [Quest.ROTTEN_BLOOD]: {
    requirements: ['5kk para a entrada ou 2 Bloody Tears', '3kk por tentativa (Refill)'],
    vocations: ['⚔️ EK 650+', '❄️ ED 450+', '🔥 MS 450+', '🏹 RP 550+', '👊 EM 500+'],
    rewards: ['🥇 Sanguine Item bis (aleatório)', '1️⃣ Chance de Double Bag']
  },
  [Quest.PRIMAL_ORDEAL]: {
    requirements: ['Within The Tides Quest completa', '6kk para os 12 dias (Refill)'],
    vocations: ['⚔️ EK 500+', '❄️ ED 400+', '🔥 MS 400+', '🏹 RP 400+', '👊 EM 450+'],
    rewards: ['1️⃣ Primal Item bis (aleatório)']
  },
  [Quest.SOUL_WAR]: {
    requirements: ['Feaster of Souls Quest completa', '5kk (Refill)'],
    vocations: ['⚔️ EK 500+', '❄️ ED 300+', '🔥 MS 300+', '🏹 RP 300+', '👊 EM 450+'],
    rewards: ['1️⃣ Soul Item bis (aleatório)']
  },
  [Quest.GRAVEBORN]: {
    requirements: ['2kk (Refill)'],
    vocations: ['⚔️ EK 700+', '❄️ ED 700+', '🔥 MS 700+', '🏹 RP 700+', '👊 EM 700+'],
    rewards: ['1️⃣ Crypt Rune aleatória'],
    note: 'Acesso a Draconia e hunts exclusivas.'
  }
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeThemeKey, setActiveThemeKey] = useState<string>('DEFAULT');
  const [isQuestMenuOpen, setIsQuestMenuOpen] = useState(false);
  const [isVocationMenuOpen, setIsVocationMenuOpen] = useState(false);
  const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [hoveredQuest, setHoveredQuest] = useState<string | null>(null);
  
  const questDropdownRef = useRef<HTMLDivElement>(null);
  const vocationDropdownRef = useRef<HTMLDivElement>(null);
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    quest: '',
    charName: '',
    charLevel: '',
    vocation: '',
    paymentMethod: '',
    serviceLocation: '',
    realLifeName: '',
    phone: ''
  });

  const currentTheme = themes[activeThemeKey] || themes['DEFAULT'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (questDropdownRef.current && !questDropdownRef.current.contains(event.target as Node)) setIsQuestMenuOpen(false);
      if (vocationDropdownRef.current && !vocationDropdownRef.current.contains(event.target as Node)) setIsVocationMenuOpen(false);
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) setIsPaymentMenuOpen(false);
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) setIsLocationMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestSelect = (q: string) => {
    setFormData(prev => ({ ...prev, quest: q }));
    setActiveThemeKey(q);
    setIsQuestMenuOpen(false);
  };

  const isFormValid = () => {
    return (Object.values(formData) as string[]).every(value => value.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    const success = await submitToGoogleSheets(formData);
    setIsSubmitting(false);
    if (success) setIsSuccess(true);
  };

  const handleNewRequest = () => {
    setFormData(prev => ({ ...prev, quest: '' }));
    setActiveThemeKey('DEFAULT');
    setIsSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fieldColor = formData.quest ? currentTheme.color : undefined;

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      <div className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] blur-[150px] opacity-40 transition-colors duration-1000"
          style={{ background: `radial-gradient(circle, ${currentTheme.color} 0%, transparent 70%)` }}
        ></div>
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] blur-[150px] opacity-40 transition-colors duration-1000"
          style={{ background: `radial-gradient(circle, ${currentTheme.secondary} 0%, transparent 70%)` }}
        ></div>
        
        <div 
          className="absolute inset-0 opacity-10 transition-all duration-1000"
          style={{ 
            backgroundImage: `linear-gradient(${currentTheme.color} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.color} 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        ></div>

        <div className="absolute inset-0 z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full blur-[2px] animate-pulse transition-all duration-1000"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: currentTheme.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: formData.quest ? 0.6 : 0,
                boxShadow: `0 0 20px ${currentTheme.color}`,
                animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all backdrop-blur-md">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">Start <span className="transition-colors duration-1000" style={{ color: currentTheme.color }}>Service</span></h2>
            <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1 opacity-70">Status: {currentTheme.name}</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="max-w-3xl mx-auto text-center py-16 animate-[fadeIn_0.5s_ease-out]">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 rounded-full blur-[40px] opacity-40 animate-pulse" style={{ backgroundColor: currentTheme.color }}></div>
              <div className="relative p-8 rounded-full border-2 shadow-2xl transition-all duration-700 bg-black/40 backdrop-blur-xl"
                style={{ borderColor: `${currentTheme.color}88`, boxShadow: `0 0 40px ${currentTheme.color}33` }}>
                <CheckCircle2 className="w-24 h-24" style={{ color: currentTheme.color }} />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-gamer font-black text-white mb-6 uppercase tracking-tighter leading-tight drop-shadow-2xl">
              MISSÃO <span style={{ color: currentTheme.color }}>CONFIRMADA,</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-gamer uppercase tracking-widest opacity-80 mb-12">
              EM BREVE ENTRAREMOS EM CONTATO!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleNewRequest}
                className="group relative px-10 py-5 bg-white text-black font-gamer font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] uppercase tracking-widest text-sm w-full sm:w-auto overflow-hidden"
                style={{ backgroundColor: currentTheme.color }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                Nova Solicitação
              </button>
              
              <button 
                onClick={onBack} 
                className="px-10 py-5 bg-black/40 border border-gray-700 text-white font-gamer rounded-2xl flex items-center justify-center gap-2 hover:border-white transition-all backdrop-blur-sm uppercase tracking-widest text-sm w-full sm:w-auto"
              >
                <ChevronLeft className="w-5 h-5" /> Voltar ao Início
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 animate-[fadeIn_0.7s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* DROPDOWN QUEST */}
              <div className={`relative ${isQuestMenuOpen ? 'z-50' : 'z-20'}`} ref={questDropdownRef}>
                <CompactCard icon={<Trophy />} label="QUAL QUEST GOSTARIA DE FAZER? *" color={currentTheme.color}>
                  <div onClick={() => setIsQuestMenuOpen(!isQuestMenuOpen)} className="w-full flex items-center justify-between cursor-pointer py-1">
                    <span className={`text-sm font-bold ${formData.quest ? 'text-white' : 'text-gray-500'}`}>
                      {formData.quest ? <span className="flex items-center gap-2"><span>{questIcons[formData.quest]}</span> {formData.quest}</span> : 'Selecione a Quest'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isQuestMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isQuestMenuOpen && (
                    <div className="absolute left-0 right-0 top-[115%] z-[60] bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-[fadeIn_0.2s_ease-out] p-1">
                      {Object.values(Quest).map(q => {
                        const questTheme = themes[q];
                        const isSelected = formData.quest === q;
                        return (
                          <div key={q} 
                            onMouseEnter={() => setHoveredQuest(q)}
                            onMouseLeave={() => setHoveredQuest(null)}
                            onClick={() => handleQuestSelect(q)}
                            className={`relative flex items-center gap-3 p-5 transition-all cursor-pointer border-b border-white/5 last:border-none rounded-xl ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            style={{ 
                              borderColor: isSelected ? `${questTheme.color}88` : 'transparent',
                              borderWidth: isSelected ? '1px' : '0px',
                              borderStyle: 'solid',
                              boxShadow: isSelected ? `0 0 20px ${questTheme.color}33` : 'none'
                            }}
                          >
                             {isSelected ? <CheckSquare className="w-5 h-5" style={{ color: questTheme.color }} /> : <Square className="w-5 h-5 text-gray-700" />}
                             <span className="text-xl">{questIcons[q]}</span>
                             <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>{q}</span>

                             {hoveredQuest === q && questInfo[q] && (
                               <div className="absolute left-[102%] top-[-20px] w-[320px] bg-[#0d0d0f]/95 border rounded-2xl p-6 z-[100] animate-[slideInRight_0.3s_ease-out] hidden md:block backdrop-blur-2xl shadow-2xl"
                                 style={{ borderColor: `${questTheme.color}44`, boxShadow: `0 0 50px ${questTheme.color}20` }}>
                                 <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                                   <span className="text-2xl">{questIcons[q]}</span>
                                   <h4 className="font-gamer font-bold text-white text-xs uppercase tracking-wider">{q}</h4>
                                 </div>
                                 <div className="space-y-5">
                                   <div>
                                     <div className="flex items-center gap-2 text-[9px] font-gamer text-gray-500 uppercase mb-3">
                                       <FileText className="w-3 h-3" /> Requerimentos:
                                     </div>
                                     <div className="space-y-2 pl-1">
                                       {questInfo[q].requirements.map((req, i) => (
                                         <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300 font-medium">
                                           <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: questTheme.color }}></div>
                                           {req}
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                   <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                                     {questInfo[q].vocations.map((voc, i) => (
                                       <div key={i} className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{voc}</div>
                                     ))}
                                   </div>
                                   {questInfo[q].note && <div className="text-[10px] text-gray-400 italic border-l-2 pl-3" style={{ borderColor: questTheme.color }}>{questInfo[q].note}</div>}
                                   <div className="pt-3 border-t border-white/10">
                                      <div className="text-[9px] font-gamer uppercase mb-2" style={{ color: '#FFD700' }}>Recompensa Principal</div>
                                      {questInfo[q].rewards.map((rew, i) => <div key={i} className="text-[11px] text-white font-bold">{rew}</div>)}
                                   </div>
                                 </div>
                               </div>
                             )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CompactCard>
              </div>

              {/* LEVEL */}
              <div className="z-10">
                <CompactCard icon={<Zap />} label="LEVEL DO SEU CHAR *" color={fieldColor || "#39ff14"}>
                  <input required type="text" name="charLevel" placeholder="Ex: 800" value={formData.charLevel} onChange={handleChange}
                    className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700" />
                </CompactCard>
              </div>

              {/* VOCAÇÃO */}
              <div className={`relative ${isVocationMenuOpen ? 'z-50' : 'z-20'}`} ref={vocationDropdownRef}>
                <CompactCard icon={<Shield />} label="VOCAÇÃO DO SEU NOVO CHAR *" color={fieldColor || "#fbbf24"}>
                  <div onClick={() => setIsVocationMenuOpen(!isVocationMenuOpen)} className="w-full flex items-center justify-between cursor-pointer py-1">
                    <span className={`text-sm font-bold ${formData.vocation ? 'text-white' : 'text-gray-500'}`}>
                      {formData.vocation ? <span className="flex items-center gap-2"><span>{vocationIcons[formData.vocation as Vocation]}</span> {formData.vocation}</span> : 'Selecione a Vocação'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isVocationMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isVocationMenuOpen && (
                    <div className="absolute left-0 right-0 top-[115%] z-[60] bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                      {Object.values(Vocation).map(v => (
                        <div key={v} onClick={() => { setFormData(p => ({ ...p, vocation: v })); setIsVocationMenuOpen(false); }}
                          className="flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none">
                           {formData.vocation === v ? <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#fbbf24' }} /> : <Square className="w-5 h-5 text-gray-700" />}
                           <span className="text-xl">{vocationIcons[v]}</span>
                           <span className="text-sm font-bold text-gray-300">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CompactCard>
              </div>

              {/* PAGAMENTO */}
              <div className={`relative ${isPaymentMenuOpen ? 'z-50' : 'z-20'}`} ref={paymentDropdownRef}>
                <CompactCard icon={<Coins />} label="FORMA DE PAGAMENTO *" color={fieldColor || "#00f2ff"}>
                  <div onClick={() => setIsPaymentMenuOpen(!isPaymentMenuOpen)} className="w-full flex items-center justify-between cursor-pointer py-1">
                    <span className={`text-sm font-bold ${formData.paymentMethod ? 'text-white' : 'text-gray-500'}`}>
                      {formData.paymentMethod ? <span className="flex items-center gap-2"><span>{paymentIcons[formData.paymentMethod as PaymentMethod]}</span> {formData.paymentMethod}</span> : 'Selecione o Pagamento'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isPaymentMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isPaymentMenuOpen && (
                    <div className="absolute left-0 right-0 top-[115%] z-[60] bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                      {Object.values(PaymentMethod).map(p => (
                        <div key={p} onClick={() => { setFormData(prev => ({ ...prev, paymentMethod: p })); setIsPaymentMenuOpen(false); }}
                          className="flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none">
                           {formData.paymentMethod === p ? <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#00f2ff' }} /> : <Square className="w-5 h-5 text-gray-700" />}
                           <span className="text-xl">{paymentIcons[p as PaymentMethod]}</span>
                           <span className="text-sm font-bold text-gray-300">{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CompactCard>
              </div>

              {/* LOCAL */}
              <div className={`relative ${isLocationMenuOpen ? 'z-50' : 'z-20'}`} ref={locationDropdownRef}>
                <CompactCard icon={<MapIcon />} label="LOCAL DO SERVICE *" color={fieldColor || "#bc13fe"}>
                  <div onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)} className="w-full flex items-center justify-between cursor-pointer py-1">
                    <span className={`text-sm font-bold ${formData.serviceLocation ? 'text-white' : 'text-gray-500'}`}>
                      {formData.serviceLocation ? <span className="flex items-center gap-2"><span>{locationIcons[formData.serviceLocation as ServiceLocation]}</span> {formData.serviceLocation}</span> : 'Selecione o Local'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isLocationMenuOpen && (
                    <div className="absolute left-0 right-0 top-[115%] z-[60] bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                      {Object.values(ServiceLocation).map(l => (
                        <div key={l} onClick={() => { setFormData(prev => ({ ...prev, serviceLocation: l })); setIsLocationMenuOpen(false); }}
                          className="flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none">
                           {formData.serviceLocation === l ? (
                             <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#bc13fe' }} />
                           ) : (
                             <Square className="w-5 h-5 text-gray-700" />
                           )}
                           <span className="text-xl">{locationIcons[l as ServiceLocation]}</span>
                           <span className="text-sm font-bold text-gray-300">{l}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CompactCard>
              </div>

              {/* NOME RL */}
              <div className="z-10">
                <CompactCard icon={<Sparkles />} label="QUAL É O SEU NOME RL? *" color={fieldColor || "#39ff14"}>
                  <input required type="text" name="realLifeName" placeholder="Seu nome real" value={formData.realLifeName} onChange={handleChange}
                    className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700" />
                </CompactCard>
              </div>

              {/* TELEFONE */}
              <div className="z-10">
                <CompactCard icon={<Phone />} label="TELEFONE DE CONTATO? *" color={fieldColor || "#ffffff"}>
                  <input required type="tel" name="phone" placeholder="Ex: 551199999-9999" value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700" />
                </CompactCard>
              </div>

              {/* NOME CHAR */}
              <div className="z-10">
                <CompactCard icon={<User />} label="NOME DO SEU CHAR *" color={fieldColor || "#bc13fe"}>
                  <input required type="text" name="charName" placeholder="Ex: Ragha Wizard" value={formData.charName} onChange={handleChange}
                    className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700" />
                </CompactCard>
              </div>

            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              {!isFormValid() && formData.quest && (
                <div className="flex items-center gap-2 text-amber-500 font-gamer text-[10px] uppercase tracking-widest animate-pulse">
                  <AlertCircle className="w-3 h-3" /> Preencha todos os campos obrigatórios (*) para enviar
                </div>
              )}
              
              <button type="submit" disabled={isSubmitting || !isFormValid()}
                className="w-full py-6 rounded-[2rem] transition-all duration-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed shadow-2xl font-gamer text-black font-black tracking-[0.4em] uppercase text-xl relative overflow-hidden group"
                style={{ backgroundColor: currentTheme.color, boxShadow: isFormValid() ? `0 0 40px ${currentTheme.color}44` : 'none' }}>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                {isSubmitting ? 'PROCESSANDO...' : 'ENVIAR SOLICITAÇÃO'}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

interface CompactCardProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  color: string;
}

const CompactCard: React.FC<CompactCardProps> = ({ icon, label, children, color }) => {
  return (
    <div 
      className="bg-[#0a0a0c]/60 backdrop-blur-md border p-6 rounded-[2rem] flex flex-col gap-4 group transition-all shadow-xl h-full"
      style={{ 
        borderColor: color !== '#ffffff' ? `${color}44` : 'rgba(255, 255, 255, 0.05)',
        boxShadow: color !== '#ffffff' ? `0 0 25px ${color}11` : 'none'
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-black/40 border-2 transition-all duration-700 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: `${color}44`, color: color, boxShadow: `0 0 15px ${color}22` }}>
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
        </div>
        <label className="text-xs font-gamer font-bold tracking-widest text-gray-400 uppercase leading-tight select-none opacity-80">
          {label}
        </label>
      </div>
      <div className="relative bg-black/40 border border-white/5 rounded-2xl p-4 focus-within:border-white/20 transition-all flex items-center min-h-[60px] backdrop-blur-sm">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default RegistrationForm;
