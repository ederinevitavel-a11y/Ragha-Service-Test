
import React from 'react';
import { ChevronLeft, Handshake, ExternalLink, Shield, Zap, Star, MessageSquare } from 'lucide-react';

interface PartnersViewProps {
  onBack: () => void;
}

const PartnersView: React.FC<PartnersViewProps> = ({ onBack }) => {
  const partners = [
    {
      name: 'Schwe Healer',
      description: 'Acessos/Quest/Bestiary no Tibia de forma rápida e organizada.',
      icon: <img src="https://i.imgur.com/LPeyeNc.png" alt="Schwe Healer Logo" className="w-full h-48 object-cover rounded-2xl mb-6" referrerPolicy="no-referrer" />,
      link: '#',
      tag: '',
      color: '#39ff14',
      whatsapp: '558184419929'
    },
    {
      name: 'Fadinha Service',
      description: 'Bestiary, Weekly Tasks, Bounty Tasks e Quests/Acessos no Tibia.',
      icon: <img src="https://i.imgur.com/aegJpZM.png" alt="Fadinha Service Logo" className="w-full h-48 object-cover rounded-2xl mb-6" referrerPolicy="no-referrer" />,
      link: '#',
      tag: '',
      color: '#ff00ff',
      whatsapp: '5512988014662'
    },
    {
      name: 'Anuncie Aqui!!!',
      description: 'Quer anunciar conosco ? Procure o nosso time!',
      icon: <img src="https://i.imgur.com/GRTjCVW.png" alt="Anuncie Aqui Logo" className="w-full h-48 object-contain rounded-2xl mb-6" referrerPolicy="no-referrer" />,
      link: '#',
      tag: '',
      color: '#00f2ff',
      whatsapp: '558184419929'
    }
  ];


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">NOSSOS <span className="text-[#bc13fe]">PARCEIROS</span></h2>
          <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1">Alianças que fortalecem o Ragha Service</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners.map((partner, idx) => (
          <div 
            key={idx}
            className="group relative bg-[#0a0a0c]/80 backdrop-blur-xl border rounded-3xl p-8 transition-all hover:scale-[1.02] overflow-hidden flex flex-col"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = partner.color + '80';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Handshake className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10 flex-grow">
              <div className={`${(partner.name === 'Schwe Healer' || partner.name === 'Fadinha Service' || partner.name === 'Anuncie Aqui!!!') ? '' : 'mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:border-[#bc13fe]/30 transition-colors'}`}>
                {partner.icon}
              </div>
              
              {partner.tag && (
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-gamer tracking-widest text-gray-400 uppercase mb-4">
                  {partner.tag}
                </div>
              )}
              
              <h3 
                className={`${partner.name === 'Anuncie Aqui!!!' ? 'text-4xl' : 'text-2xl'} font-gamer font-bold mb-4 transition-colors flex items-center gap-2`}
                style={{ color: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = partner.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
              >
                {partner.name}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {partner.description}
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              {partner.link !== '#' && (
                <a 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-gamer tracking-widest text-gray-400 uppercase hover:bg-white/10 hover:text-white transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visitar Site
                </a>
              )}
              
              {partner.name !== 'Anuncie Aqui!!!' && (
                <a 
                  href={`https://wa.me/${partner.whatsapp}?text=Contato%20via%20Ragha%20Service!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl text-[10px] font-gamer tracking-widest text-[#25D366] uppercase hover:bg-[#25D366]/20 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Contato WhatsApp
                </a>
              )}
            </div>

            {/* Background Glow */}
            <div 
              className="absolute -bottom-12 -right-12 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
              style={{ backgroundColor: partner.color }}
            ></div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-black/80 to-[#00f2ff]/10 border border-[#00f2ff]/20 p-10 rounded-[2.5rem] text-center">
        <h3 className="text-2xl font-gamer font-bold text-white mb-4 uppercase">Quer ser nosso parceiro?</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Estamos sempre em busca de novas alianças que agreguem valor à nossa comunidade. Entre em contato e vamos conversar!
        </p>
        <a 
          href="https://wa.me/5511984759506?text=Olá!%20Gostaria%20de%20anunciar%20com%20vocês."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#00f2ff] text-black font-gamer font-bold tracking-widest uppercase rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
        >
          ENTRAR EM CONTATO
        </a>
      </div>
    </div>
  );
};

export default PartnersView;
