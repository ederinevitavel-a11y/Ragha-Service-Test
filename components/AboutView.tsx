
import React from 'react';
import { ChevronLeft, Trophy, FileText, CheckCircle2, Shield, Swords, Sparkles, Coins, MessageSquare } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

// Defined QuestItem interface to handle optional properties in the quests array and fix TS errors
interface QuestItem {
  icon: string;
  name: string;
  color: string;
  price: string;
  requirements: string[];
  vocations: string[];
  rewards: string[];
  note?: string;
  footerNote?: string;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  const quests: QuestItem[] = [
    {
      icon: '🩸',
      name: 'Rotten Blood Quest',
      color: '#ff0000',
      price: '2.000 TC',
      requirements: [
        '5kk para a entrada da Quest ou 2 Bloody Tears',
        '3kk por tentativa (Refill)'
      ],
      vocations: [
        '⚔️ EK 650+',
        '❄️ ED 450+',
        '🔥 MS 450+',
        '🏹 RP 550+',
        '🥊 EM 500+'
      ],
      rewards: ['1️⃣ Sanguine Item bis (aleatório) Com pequena chance de Double Bag']
    },
    {
      icon: '👾',
      name: 'Primal Ordeal Quest',
      color: '#fbbf24',
      price: '1.500 TC',
      requirements: [
        'Within The Tides Quest (Requisito mínimo as missões: Of Feathers and Flowers / Star-Crossed Lovers)',
        '6kk para os 12 dias (Refill)'
      ],
      vocations: [
        '⚔️ EK 500+',
        '❄️ ED 400+',
        '🔥 MS 400+',
        '🏹 RP 400+',
        '🥊 EM 450+'
      ],
      rewards: ['1️⃣ Primal Item bis (aleatório)']
    },
    {
      icon: '👻',
      name: 'Soul War Quest',
      color: '#a855f7',
      price: '1.500 TC',
      requirements: [
        'Ter completado a Feaster of Souls Quest (Ter as 3 missões completas)',
        '5kk (Refill)'
      ],
      vocations: [
        '⚔️ EK 500+',
        '❄️ ED 300+',
        '🔥 MS 300+',
        '🏹 RP 300+',
        '🥊 EM 450+'
      ],
      rewards: ['1️⃣ Soul Item bis (aleatório)']
    },
    {
      icon: '⚰️',
      name: 'The Roost of the Graveborn Quest',
      color: '#00f2ff',
      price: '350 TC',
      requirements: [
        '2kk (Refill)'
      ],
      vocations: [
        '⚔️ EK 700+',
        '❄️ ED 700+',
        '🔥 MS 700+',
        '🏹 RP 700+',
        '🥊 EM 700+'
      ],
      rewards: [
        '1️⃣ Crypt Rune (aleatória) - (Fiery, Icy, Deathly, Ancient, Necromantic)'
      ],
      note: 'Acesso a Draconia e hunts exclusivas.',
      footerNote: 'Observação: Necessária pra trocar por um dos itens Bis Crypt (lembrando que precisa de 5 Crypts Runes diferentes pra trocar por um item aleatório). Acesso a Draconia e as hunts: Outer Crypt, Inner Crypt e Unhallowed Crypt'
    }
  ];

  const whatsappUrl = "https://wa.me/553592451052?text=Oi%20Ragha%2C%20cheguei%20pelo%20app%21";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">ANOTA <span className="text-[#00f2ff]">AI!</span></h2>
          <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1">Guia de Quests e Serviços</p>
        </div>
      </div>

      {/* Hero Service Box */}
      <div className="bg-gradient-to-r from-black/80 to-[#bc13fe]/10 border border-[#bc13fe]/30 p-8 md:p-12 rounded-[2.5rem] mb-16 shadow-[0_0_60px_rgba(188,19,254,0.15)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
           <Swords className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#bc13fe]/20 border border-[#bc13fe]/40 rounded-full text-[#bc13fe] text-[10px] font-gamer uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> Proposta Especial
          </div>
          <h3 className="text-3xl md:text-5xl font-gamer font-bold text-white mb-6 leading-tight uppercase tracking-tighter">
            Quer ver seu <span className="text-[#39ff14] neon-glow-green">main char 1000+</span> na rotação?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 leading-relaxed">
            Participe das bags em todos os main chars nas quests. Fale direto com a gente que temos uma <span className="text-white font-bold underline decoration-[#bc13fe]">proposta boa pra você!!!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366]/10 border border-[#25D366]/40 rounded-2xl text-[#25D366] font-gamer font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#25D366]/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(37,211,102,0.15)] group/wa"
            >
              <MessageSquare className="w-5 h-5 group-hover/wa:rotate-12 transition-transform" />
              Falar no WhatsApp
            </a>

            <div className="flex gap-3">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-gamer tracking-widest text-gray-500 uppercase">
                #SOULWAR
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-gamer tracking-widest text-gray-500 uppercase">
                #ROTTENBLOOD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quests.map((quest, idx) => (
          <div 
            key={idx}
            className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{quest.icon}</span>
                <h4 className="text-xl font-gamer font-bold text-white uppercase tracking-tight" style={{ color: quest.color }}>
                  {quest.name}
                </h4>
              </div>
            </div>

            <div className="space-y-8">
              {/* Requirements */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-gamer text-gray-500 uppercase tracking-[0.2em] mb-4">
                  <FileText className="w-3.5 h-3.5" /> Requerimentos
                </div>
                <div className="space-y-3">
                  {quest.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                      <div className="mt-0.5 w-4 h-4 rounded border border-white/10 flex items-center justify-center bg-white/5">
                        <CheckCircle2 className="w-3 h-3" style={{ color: quest.color }} />
                      </div>
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vocations/Levels */}
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                {quest.vocations.map((voc, i) => (
                  <div key={i} className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    {voc}
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="bg-black/60 border border-white/10 p-5 rounded-2xl relative overflow-hidden group/price">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <Coins className="w-12 h-12" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-gamer text-gray-500 uppercase tracking-[0.2em] mb-2">
                   <Coins className="w-4 h-4" /> Valor do Service
                </div>
                <div className="text-3xl font-gamer font-black tracking-tighter transition-all duration-500" style={{ color: quest.color, textShadow: `0 0 15px ${quest.color}66` }}>
                  {quest.price}
                </div>
              </div>

              {/* Note if exists */}
              {quest.note && (
                <div className="bg-[#39ff14]/5 border border-[#39ff14]/20 p-4 rounded-2xl italic text-xs text-gray-300 leading-relaxed">
                  {quest.note}
                </div>
              )}

              {/* Rewards */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-gamer uppercase tracking-[0.2em] mb-4" style={{ color: '#FFD700' }}>
                  <Trophy className="w-3.5 h-3.5" /> Recompensa Principal
                </div>
                <div className="space-y-3">
                  {quest.rewards.map((reward, i) => (
                    <div key={i} className="text-sm text-gray-100 font-bold bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: quest.color }}></div>
                      {reward}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              {quest.footerNote && (
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      {quest.footerNote}
                   </p>
                </div>
              )}
            </div>

            {/* Background Glow */}
            <div 
              className="absolute -bottom-24 -right-24 w-64 h-64 blur-[120px] opacity-10 pointer-events-none"
              style={{ backgroundColor: quest.color }}
            ></div>
          </div>
        ))}
      </div>

      {/* Final Action Button */}
      <div className="mt-16 flex justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-gamer tracking-widest text-gray-400 hover:text-white hover:border-white transition-all"
        >
          Voltar ao Topo
        </button>
      </div>
      <style>{`
        .neon-glow-green {
          text-shadow: 0 0 10px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AboutView;
