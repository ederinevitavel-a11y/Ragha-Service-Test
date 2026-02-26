
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Package, Sparkles, User, 
  Phone, CheckCircle2, 
  RefreshCw, AlertCircle, Loader2, Search, Info
} from 'lucide-react';
import { OrderData } from '../types';
import { fetchAvailability, submitOrderToGoogleSheets } from '../services/sheetsService';

interface OrdersViewProps {
  onBack: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
}

const shopItems: ShopItem[] = [
  { id: 'ali1', name: 'ALICORN HEADGUARD', description: 'O elmo divino para Royal Paladins. Proteção e Distance BiS.', price: '24,000', image: 'https://i.imgur.com/DmSk97Y.png', tag: 'LEGENDARY' },
  { id: 'ali3', name: 'ALICORN QUIVER', description: 'Aljava infinita de luz. O acessório definitivo para arqueiros.', price: '18,000', image: 'https://i.imgur.com/tJPczV7.png', tag: 'LEGENDARY' },
  { id: 'ali2', name: 'ALICORN RING', description: 'Anel de pureza divina. Regeneração e skills para Paladins.', price: '65,000', image: 'https://i.imgur.com/QPmS9LQ.png', tag: 'LEGENDARY' },
  { id: 'arb1', name: 'ARBOREAL CROWN', description: 'A coroa mística das profundezas da floresta ancestral. Concede sabedoria e bônus de skills elementais.', price: '22,000', image: 'https://i.imgur.com/jz7oVzm.png', tag: 'LEGENDARY' },
  { id: 'arc3', name: 'ARCANOMANCER FOLIO', description: 'Grimório de segredos proibidos. Amplifica feitiços elementais.', price: '22,000', image: 'https://i.imgur.com/Zk4Hrpn.png', tag: 'LEGENDARY' },
  { id: 'arc2', name: 'ARCANOMANCER REGALIA', description: 'Vestimenta de gala dos grandes magos. Proteção e mana.', price: '30,000', image: 'https://i.imgur.com/M1eSjMb.png', tag: 'LEGENDARY' },
  { id: 'arc1', name: 'ARCANOMANCER SIGIL', description: 'Selo de maestria arcana. Bônus de Magic Level insano.', price: '62,000', image: 'https://i.imgur.com/L04I5rS.png', tag: 'LEGENDARY' },
  { id: 'eth1', name: 'ETHEREAL CONED HAT', description: 'O chapéu místico das dimensões etéreas. Amplificação de Magic Level.', price: '55,000', image: 'https://i.imgur.com/T8cHDF9.png', tag: 'LEGENDARY' },
  { id: 'eth2', name: 'ETHEREAL RING', description: 'Um anel que ressoa com o plano espiritual. Concede bônus de skills.', price: '60,000', image: 'https://i.imgur.com/nveChSJ.png', tag: 'LEGENDARY' },
  { id: 'soul6', name: 'PAIR OF SOULSTALKERS', description: 'Botas de rastreador de almas para Paladins ágeis.', price: '40,000', image: 'https://i.imgur.com/UgzIXIW.png', tag: 'LEGENDARY' },
  { id: 'soul7', name: 'PAIR OF SOULWALKERS', description: 'Botas de Knight focadas em defesa física pesada.', price: '38,000', image: 'https://i.imgur.com/ZusXE70.png', tag: 'LEGENDARY' },
  { id: 'sang6', name: 'SANGUINE BATTLEAXE', description: 'Machado de duas mãos para Knights. Esmaga qualquer defesa.', price: '42,000', image: 'https://i.imgur.com/LBozI41.png', tag: 'LEGENDARY' },
  { id: 'sang1', name: 'SANGUINE BLADE', description: 'A espada BiS de uma mão para Knights. Poder ofensivo devastador.', price: '45,000', image: 'https://i.imgur.com/6dyQPXE.png', tag: 'LEGENDARY' },
  { id: 'sang11', name: 'SANGUINE BLUDGEON', description: 'Clava pesada de Rotten Blood. Impacto espiritual massivo.', price: '41,000', image: 'https://i.imgur.com/7x6vkq4.png', tag: 'LEGENDARY' },
  { id: 'sang10', name: 'SANGUINE BOOTS', description: 'Botas de metal banhadas em sangue para Knights.', price: '26,000', image: 'https://i.imgur.com/L6rK3jl.png', tag: 'LEGENDARY' },
  { id: 'sang3', name: 'SANGUINE BOW', description: 'Arco BiS para Royal Paladins. Precisão cirúrgica e dano massivo.', price: '72,000', image: 'https://i.imgur.com/U02WbSJ.png', tag: 'LEGENDARY' },
  { id: 'sang12', name: 'SANGUINE CLAWS', description: 'Garras de combate para ataques rápidos e sangrentos.', price: '33,000', image: 'https://i.imgur.com/w8FKCov.png', tag: 'LEGENDARY' },
  { id: 'sang8', name: 'SANGUINE COIL', description: 'O amuleto místico de Rotten Blood. Proteção contra as trevas.', price: '25,000', image: 'https://i.imgur.com/HpFADxB.png', tag: 'LEGENDARY' },
  { id: 'sang7', name: 'SANGUINE CROSSBOW', description: 'Besta pesada de elite. Perfuração de alma em cada disparo.', price: '65,000', image: 'https://i.imgur.com/Q2Jb64Z.png', tag: 'LEGENDARY' },
  { id: 'sang13', name: 'SANGUINE CUDGEL', description: 'Clava de uma mão para combatentes de elite.', price: '34,000', image: 'https://i.imgur.com/Wu69fOw.png', tag: 'LEGENDARY' },
  { id: 'sang5', name: 'SANGUINE GALOSHES', description: 'Botas de Rotten Blood. Velocidade e proteção elemental superior.', price: '28,000', image: 'https://i.imgur.com/UdkdeCR.png', tag: 'LEGENDARY' },
  { id: 'sang4', name: 'SANGUINE GREAVES', description: 'Proteção de pernas para Paladins. Atributos BiS.', price: '38,000', image: 'https://i.imgur.com/2wjnBsK.png', tag: 'LEGENDARY' },
  { id: 'sang14', name: 'SANGUINE HATCHET', description: 'Machadinha veloz imbuída com energia de Rotten Blood.', price: '31,000', image: 'https://i.imgur.com/zyp1jTV.png', tag: 'LEGENDARY' },
  { id: 'sang9', name: 'SANGUINE LEGS', description: 'As calças mais fortes do jogo para Knights. Defesa absoluta.', price: '30,000', image: 'https://i.imgur.com/zQABaNx.png', tag: 'LEGENDARY' },
  { id: 'sang15', name: 'SANGUINE RAZOR', description: 'Lâmina afiada para cortes precisos e hemorragia crítica.', price: '35,000', image: 'https://i.imgur.com/wAUlLlO.png', tag: 'LEGENDARY' },
  { id: 'sang2', name: 'SANGUINE ROD', description: 'O cajado supremo para Druids. Amplificação mística.', price: '32,000', image: 'https://i.imgur.com/L2M4rls.png', tag: 'LEGENDARY' },
  { id: 'sang16', name: 'SANGUINE TROUSERS', description: 'Calças leves com alto poder de regeneração mágica.', price: '29,000', image: 'https://i.imgur.com/9KqgJ8Y.png', tag: 'LEGENDARY' },
  { id: 'soul4', name: 'SOULBASTION', description: 'O escudo que bloca o impensável. Essencial para blocar bosses.', price: '35,000', image: 'https://i.imgur.com/RKvowa2.png', tag: 'LEGENDARY' },
  { id: 'soul15', name: 'SOULBITER', description: 'Uma clava de duas mãos pesada que ressoa com almas.', price: '31,000', image: 'https://i.imgur.com/EmishyU.png', tag: 'LEGENDARY' },
  { id: 'soul1', name: 'SOULBLEEDER', description: 'O arco de almas. Precisão letal que ignora defesas físicas.', price: '75,000', image: 'https://i.imgur.com/ekZ6x0D.png', tag: 'LEGENDARY' },
  { id: 'soul13', name: 'SOULCRUSHER', description: 'A clava de uma mão mais poderosa. Esmaga ossos e almas.', price: '33,000', image: 'https://i.imgur.com/8ddkSzE.png', tag: 'LEGENDARY' },
  { id: 'soul14', name: 'SOULCUTTER', description: 'A espada de uma mão preferida pelos duelistas ágeis.', price: '34,000', image: 'https://i.imgur.com/ceEPRMl.png', tag: 'LEGENDARY' },
  { id: 'soul12', name: 'SOULEATER (AXE)', description: 'Machado de uma mão veloz que drena a vida dos oponentes.', price: '34,000', image: 'https://i.imgur.com/5fsOUW0.png', tag: 'LEGENDARY' },
  { id: 'soul18', name: 'SOULGARB', description: 'Traje cerimonial de alma com altíssima proteção elemental.', price: '39,000', image: 'https://i.imgur.com/JM9c2gH.png', tag: 'LEGENDARY' },
  { id: 'soul5', name: 'SOULHEXER', description: 'O cajado supremo para mestres das artes negras.', price: '42,000', image: 'https://i.imgur.com/EOiUh2x.png', tag: 'LEGENDARY' },
  { id: 'soul16', name: 'SOULKAMAS', description: 'Lâminas exóticas com poder espiritual latente.', price: '28,000', image: 'https://i.imgur.com/GK6lCYP.png', tag: 'LEGENDARY' },
  { id: 'soul3', name: 'SOULMANTLE', description: 'Capa mística de proteção espiritual para magos de elite.', price: '42,000', image: 'https://i.imgur.com/Lf9jRGr.png', tag: 'LEGENDARY' },
  { id: 'soul11', name: 'SOULPIERCER', description: 'A besta definitiva para Royal Paladins. Perfuração total.', price: '68,000', image: 'https://i.imgur.com/xIEmnmn.png', tag: 'LEGENDARY' },
  { id: 'soul8', name: 'SOULSHANKS', description: 'Calças de alma para Knights. Bônus de skills massivo.', price: '36,000', image: 'https://i.imgur.com/kRM8E2e.png', tag: 'LEGENDARY' },
  { id: 'soul10', name: 'SOULSHELL', description: 'A armadura pesada do Soul War para Knights de elite.', price: '40,000', image: 'https://i.imgur.com/HYdXLxz.png', tag: 'LEGENDARY' },
  { id: 'soul2', name: 'SOULSHREDDER', description: 'Machado de duas mãos que dilacera o espírito do inimigo.', price: '55,000', image: 'https://i.imgur.com/n7W3yWA.png', tag: 'LEGENDARY' },
  { id: 'soul19', name: 'SOULSHROUD', description: 'Manto das sombras para proteção mística absoluta.', price: '37,000', image: 'https://i.imgur.com/6yg0yQy.png', tag: 'MYTHIC' },
  { id: 'soul17', name: 'SOULSOLES', description: 'Botas de magos que permitem mobilidade mágica absoluta.', price: '30,000', image: 'https://i.imgur.com/ulUK6Tm.png', tag: 'LEGENDARY' },
  { id: 'soul9', name: 'SOULSTRIDER', description: 'Calças místicas para magos. Poder arcano em cada fibra.', price: '32,000', image: 'https://i.imgur.com/4ocXQoG.png', tag: 'LEGENDARY' },
  { id: 'soul20', name: 'SOULTAINTER', description: 'O cajado que corrompe a realidade. Poder absoluto para MS.', price: '48,000', image: 'https://i.imgur.com/icbhn8X.png', tag: 'LEGENDARY' },
  { id: 'spirit1', name: 'SPIRITTHORN ARMOR', description: 'A armadura de espinhos sagrados. Defesa e contra-ataque.', price: '55,000', image: 'https://i.imgur.com/W1xhnUf.png', tag: 'MYTHIC' },
  { id: 'spirit2', name: 'SPIRITTHORN HELMET', description: 'Elmo ancestral de Knights. Atributos de skills massivos.', price: '45,000', image: 'https://i.imgur.com/lRZ8XiE.png', tag: 'MYTHIC' },
  { id: 'spirit3', name: 'SPIRITTHORN RING', description: 'Anel místico de espinhos. O melhor anel defensivo para EK.', price: '68,000', image: 'https://i.imgur.com/0zOMXYC.png', tag: 'MYTHIC' }
];

const OrdersView: React.FC<OrdersViewProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [availableItems, setAvailableItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<OrderData>({
    itemName: '',
    charName: '',
    phone: ''
  });

  useEffect(() => {
    const loadStock = async () => {
      setIsLoadingStock(true);
      const stock = await fetchAvailability();
      setAvailableItems(stock);
      setIsLoadingStock(false);
    };
    loadStock();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = (item: ShopItem) => {
    setFormData(prev => ({ 
      ...prev, 
      itemName: item.name,
    }));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFormValid = () => {
    return Object.values(formData).every(val => (val as string).trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    const success = await submitOrderToGoogleSheets(formData);
    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
    }
  };

  const isItemAvailable = (name: string) => {
    const normalizedName = name.toUpperCase().trim();
    return availableItems.some(available => 
      normalizedName.includes(available) || available.includes(normalizedName)
    );
  };

  const filteredItems = shopItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getItemTheme = (name: string) => {
    const upperName = name.toUpperCase();
    if (upperName.includes('SANGUINE')) return {
      hoverBorder: 'hover:border-red-600/60',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]',
      hoverText: 'group-hover:text-red-500'
    };
    
    const yellowKeywords = ['PRIMAL', 'ARBOREAL', 'SPIRITTHORN', 'ETHEREAL', 'ARCANOMANCER', 'ALICORN'];
    if (yellowKeywords.some(kw => upperName.includes(kw))) return {
      hoverBorder: 'hover:border-yellow-400/60',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]',
      hoverText: 'group-hover:text-yellow-400'
    };

    if (upperName.includes('SOUL')) return {
      hoverBorder: 'hover:border-purple-500/60',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
      hoverText: 'group-hover:text-purple-400'
    };
    
    return {
      hoverBorder: 'hover:border-blue-500/40',
      hoverShadow: 'hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]',
      hoverText: 'group-hover:text-blue-400'
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={showForm ? () => setShowForm(false) : onBack} className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all backdrop-blur-md">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-gamer font-black text-white uppercase tracking-tighter">
              SISTEMA DE <span className="text-[#39ff14] neon-glow-green">ENCOMENDAS</span>
            </h2>
            <p className="text-[9px] font-gamer text-gray-500 uppercase tracking-widest mt-0.5 opacity-60">
              {showForm ? 'Solicitação de Proposta' : 'Premium Gear Selection'}
            </p>
          </div>
        </div>

        {!showForm && !isSuccess && (
          <div className="flex items-center gap-4">
            {isLoadingStock && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <Loader2 className="w-4 h-4 text-[#00f2ff] animate-spin" />
                <span className="text-[10px] font-gamer text-gray-400 uppercase tracking-widest">Sincronizando Estoque...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {isSuccess ? (
        <div className="max-w-xl mx-auto text-center py-16 animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-6 inline-flex items-center justify-center p-6 rounded-full bg-[#39ff14]/5 border border-[#39ff14]/20 shadow-[0_0_40px_rgba(57,255,20,0.1)]">
            <CheckCircle2 className="w-16 h-16 text-[#39ff14]" />
          </div>
          <h3 className="text-3xl font-gamer font-bold text-white mb-3 uppercase tracking-tighter">SUCESSO!</h3>
          <p className="text-gray-400 mb-10 text-base font-medium">Sua encomenda foi registrada com prioridade máxima.</p>
          <button 
            onClick={() => { setIsSuccess(false); setShowForm(false); }}
            className="px-8 py-4 bg-[#39ff14] text-black font-gamer font-bold rounded-xl flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] text-xs uppercase tracking-widest"
          >
            <RefreshCw className="w-4 h-4" /> Voltar à Vitrine
          </button>
        </div>
      ) : showForm ? (
        <div className="max-w-2xl mx-auto animate-[slideInUp_0.4s_ease-out]">
           <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 md:p-10 mb-10 shadow-2xl">
              <h3 className="text-lg font-gamer font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-2.5 border-b border-white/5 pb-4">
                <Package className="text-[#39ff14] w-5 h-5" /> Registro de Interesse
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <OrderField icon={<Package />} label="ITEM DESEJADO *" color="#39ff14">
                  <input 
                    required 
                    readOnly
                    name="itemName" 
                    placeholder="Ex: Sanguine Blade" 
                    value={formData.itemName} 
                    className="w-full bg-transparent text-white/70 font-bold placeholder:text-gray-700 focus:outline-none text-sm cursor-not-allowed" 
                  />
                </OrderField>

                <OrderField icon={<User />} label="NOME DO SEU CHAR *" color="#bc13fe">
                  <input required name="charName" placeholder="Ex: Ragha Knight" value={formData.charName} onChange={handleChange}
                    className="w-full bg-transparent text-white font-bold placeholder:text-gray-700 focus:outline-none text-sm" />
                </OrderField>

                <OrderField icon={<Phone />} label="WHATSAPP PARA CONTATO *" color="#25D366">
                  <input required name="phone" placeholder="Ex: 553592451052" value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent text-white font-bold placeholder:text-gray-700 focus:outline-none text-sm" />
                </OrderField>

                <div className="flex flex-col items-center gap-5 mt-8">
                  {!isFormValid() && (
                    <div className="flex items-center gap-2 text-amber-500 font-gamer text-[8px] uppercase tracking-[0.2em] animate-pulse">
                      <AlertCircle className="w-2.5 h-2.5" /> Preencha todos os campos obrigatórios
                    </div>
                  )}
                  <button 
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className="w-full py-6 bg-[#39ff14] text-black font-gamer font-black text-xl tracking-[0.3em] uppercase rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-20 disabled:grayscale shadow-[0_0_40px_rgba(57,255,20,0.2)] relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                    {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR ENCOMENDA'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 font-gamer text-[9px] uppercase tracking-[0.2em] hover:text-white transition-colors py-2">
                    Voltar para a vitrine
                  </button>
                </div>
              </form>
           </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Info Banner */}
          <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-[#39ff14]/20 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group max-w-5xl mx-auto">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                <Sparkles className="w-6 h-6 text-[#39ff14] animate-pulse" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-300 font-gamer tracking-wider leading-relaxed opacity-90">
                  "O botão Encomendas <span className="text-[#39ff14] font-bold">garante a você acesso prioritário aos itens desejados</span>. Registre seu interesse antecipadamente e, assim que o produto estiver disponível em nosso estoque, <span className="text-[#39ff14] font-bold">você terá preferência na compra</span>. Nossa equipe entrará em contato para negociar condições exclusivas e apresentar uma <span className="text-[#39ff14] font-bold">oferta personalizada.</span>"
                </p>
              </div>
            </div>
          </div>

          {/* Destaque de Segurança de Encomenda */}
          <div className="max-w-5xl mx-auto animate-[fadeIn_0.8s_ease-out]">
            <div className="bg-gradient-to-r from-[#39ff14]/10 via-[#39ff14]/5 to-transparent border-l-4 border-[#39ff14] p-5 rounded-r-2xl flex items-start gap-4 shadow-lg group">
              <div className="p-2.5 rounded-lg bg-[#39ff14]/10 text-[#39ff14] flex-shrink-0 group-hover:scale-110 transition-transform">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-sm md:text-base text-gray-100 font-medium leading-relaxed">
                <span className="text-[#39ff14] font-gamer font-bold tracking-widest uppercase text-xs block mb-1">Fique tranquilo!</span>
                Ao encomendar um item você <span className="text-[#39ff14] font-bold">não gera obrigação de compra</span>, apenas queremos saber o que os nossos clientes precisam para oferecer as melhores oportunidades!
              </p>
            </div>
          </div>

          {/* Filtro de Pesquisa - Alinhado à DIREITA acima dos cards */}
          <div className="flex justify-end pt-4 animate-[fadeIn_0.6s_ease-out]">
            <div className="max-w-md w-full relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00f2ff] transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="BUSCAR ITEM NA VITRINE..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-gamer text-white focus:outline-none focus:border-[#00f2ff]/50 focus:ring-2 focus:ring-[#00f2ff]/10 transition-all w-full tracking-widest placeholder:text-gray-700"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-gamer text-gray-600 uppercase">
                  {filteredItems.length} Result.
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
              {filteredItems.map((item) => {
                const available = isItemAvailable(item.name);
                const theme = getItemTheme(item.name);
                return (
                  <div 
                    key={item.id} 
                    className={`bg-[#0b0e14] border border-white/5 rounded-2xl overflow-hidden group flex flex-col h-full transition-all duration-300 relative ${theme.hoverBorder} ${theme.hoverShadow}`}
                  >
                    
                    {/* Stock Badge */}
                    {available && (
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#39ff14]/10 border border-[#39ff14]/40 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(57,255,20,0.2)] animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]"></div>
                        <span className="text-[7px] font-gamer font-bold text-[#39ff14] uppercase tracking-widest">PRONTA ENTREGA</span>
                      </div>
                    )}

                    {/* Header Card */}
                    <div className="p-5 pb-0">
                      <div className={`text-[8px] font-gamer font-bold px-2.5 py-1 rounded tracking-widest inline-block mb-8 ${item.tag === 'MYTHIC' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500' : 'bg-[#ff4d00]/10 border border-[#ff4d00]/30 text-[#ff4d00]'}`}>
                        {item.tag}
                      </div>
                      
                      {/* Moldura de Item */}
                      <div className="relative h-40 w-40 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden bg-black/20 group-hover:bg-black/40 transition-colors">
                           <div className={`absolute inset-2 ${available ? 'bg-[#39ff14]/5' : 'bg-blue-500/5'} rounded-full blur-[30px] group-hover:opacity-100 transition-opacity`}></div>
                           <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(0,242,255,0.2)]" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://www.tibiawiki.com.br/images/a/af/Tibia_Icon.gif';
                              }}
                           />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 mt-6 flex-grow flex flex-col items-center text-center">
                      <h4 className={`font-gamer font-bold text-white text-base tracking-tighter mb-2 transition-colors duration-300 uppercase ${theme.hoverText}`}>
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed font-medium mb-6 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Card */}
                    <div className="p-5 pt-4 border-t border-white/5 mt-auto bg-black/10 flex justify-center">
                      <button 
                        onClick={() => handleBuyNow(item)}
                        className={`w-full max-w-[160px] py-2.5 ${available ? 'bg-gradient-to-br from-[#39ff14] to-green-600 text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'bg-gradient-to-br from-blue-600 to-blue-500 text-white'} font-gamer font-bold text-[8px] tracking-widest rounded-lg hover:scale-105 active:scale-95 transition-all uppercase`}
                      >
                        {available ? 'COMPRAR JÁ' : 'ENCOMENDAR'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center animate-[fadeIn_0.5s_ease-out]">
              <div className="p-6 rounded-full bg-white/5 border border-white/10 inline-flex mb-6">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h4 className="font-gamer font-bold text-white text-xl uppercase tracking-widest mb-2">Nenhum item encontrado</h4>
              <p className="text-gray-500 text-sm">Tente buscar por um termo diferente ou limpe o filtro.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-[#00f2ff] font-gamer text-[10px] uppercase tracking-widest hover:underline"
              >
                Limpar Filtro
              </button>
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const OrderField: React.FC<{ icon: React.ReactNode, label: string, color: string, children: React.ReactNode }> = ({ icon, label, color, children }) => (
  <div className="bg-[#0a0a0c]/40 border border-white/5 p-5 rounded-xl flex flex-col gap-2.5 group transition-all focus-within:bg-[#0a0a0c]/60"
    style={{ borderColor: `${color}11` }}>
    <div className="flex items-center gap-2.5">
      <div className="p-2 rounded-lg bg-black/40 border border-current flex items-center justify-center opacity-70" style={{ color: color }}>
        {React.cloneElement(icon as React.ReactElement, { size: 14 })}
      </div>
      <label className="text-[8px] font-gamer font-bold tracking-widest text-gray-500 uppercase leading-tight">{label}</label>
    </div>
    <div className="bg-black/30 border border-white/5 rounded-lg p-3.5 min-h-[44px] flex items-center focus-within:border-white/20 transition-all">
      {children}
    </div>
  </div>
);

export default OrdersView;
