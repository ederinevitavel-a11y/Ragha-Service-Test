
import React, { useState, useEffect } from 'react';
import { Shield, Swords, Zap, Database } from 'lucide-react';
import HomeView from './components/HomeView';
import RegistrationForm from './components/RegistrationForm';
import AboutView from './components/AboutView';
import TeamView from './components/TeamView';
import OrdersView from './components/OrdersView';
import PartnersView from './components/PartnersView';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('HOME');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col selection:bg-[#00f2ff] selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#00f2ff]/20 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('HOME')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00f2ff] to-[#bc13fe] rounded-lg flex items-center justify-center p-0.5 shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-[#050505] rounded-[6px] flex items-center justify-center">
                < Zap className="w-6 h-6 text-[#00f2ff]" />
              </div>
            </div>
            <span className="font-gamer text-xl tracking-tighter text-white group-hover:neon-glow-blue transition-all">
              RAGHA <span className="text-[#bc13fe]">SERVICE</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('HOME')}
              className={`font-gamer text-sm tracking-widest uppercase transition-all ${activeTab === 'HOME' ? 'text-[#00f2ff] neon-glow-blue' : 'text-gray-400 hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('TEAM')}
              className={`font-gamer text-sm tracking-widest uppercase transition-all ${activeTab === 'TEAM' ? 'text-[#bc13fe] neon-glow-purple' : 'text-gray-400 hover:text-white'}`}
            >
              NOSSO TIME
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-24 pb-20">
        {activeTab === 'HOME' && (
          <HomeView 
            onStart={() => setActiveTab('FORM')} 
            onAbout={() => setActiveTab('ABOUT')} 
            onOrders={() => setActiveTab('ORDERS')}
            onPartners={() => setActiveTab('PARTNERS')}
          />
        )}
        {activeTab === 'FORM' && <RegistrationForm onBack={() => setActiveTab('HOME')} />}
        {activeTab === 'ABOUT' && <AboutView onBack={() => setActiveTab('HOME')} />}
        {activeTab === 'TEAM' && <TeamView onBack={() => setActiveTab('HOME')} />}
        {activeTab === 'ORDERS' && <OrdersView onBack={() => setActiveTab('HOME')} />}
        {activeTab === 'PARTNERS' && <PartnersView onBack={() => setActiveTab('HOME')} />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                <span className="text-[10px] font-mono text-green-500 tracking-tighter uppercase flex items-center gap-1">
                  <Database className="w-3 h-3" /> Sheets Link: Established
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm font-gamer tracking-widest uppercase">
              @2026 MJR ALL RIGHTS RESERVED
            </p>

            <div className="flex justify-center gap-4">
               <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-[#00f2ff] cursor-pointer transition-colors group">
                  <Shield className="w-4 h-4 text-gray-400 group-hover:text-[#00f2ff]" />
               </div>
               <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-[#bc13fe] cursor-pointer transition-colors group">
                  <Swords className="w-4 h-4 text-gray-400 group-hover:text-[#bc13fe]" />
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
