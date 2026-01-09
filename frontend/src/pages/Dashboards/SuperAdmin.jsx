import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard, Users, GraduationCap, FileText, MessageSquare,
  Settings, LogOut, Pencil, Trash2, Plus, Search, Download,
  Bell, ShieldCheck, CheckCircle2, AlertCircle, TrendingUp, ArrowUpRight
} from 'lucide-react';

const SuperAdmin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: "Utilisateurs", value: users.length, growth: "+12%", icon: Users, color: "indigo" },
    { label: "Étudiants", value: "980", growth: "+5%", icon: GraduationCap, color: "blue" },
    { label: "Contenus", value: "245", growth: "+18%", icon: FileText, color: "emerald" },
    { label: "Alertes", value: "23", growth: "-2%", icon: AlertCircle, color: "rose" },
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'students', label: 'Étudiants', icon: GraduationCap },
    { id: 'posts', label: 'Contenus', icon: FileText },
    { id: 'comments', label: 'Modération', icon: MessageSquare },
    { id: 'settings', label: 'Configuration', icon: Settings }
  ];

  // --- SUB-COMPONENTS ---
  const StatCard = ({ stat }) => (
    <div className=" bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-600`}>
          <stat.icon size={24} />
        </div>
        <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
          <TrendingUp size={12} /> {stat.growth}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatCard key={i} stat={s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Flux d'activité système</h3>
            <button className="text-xs font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-xl uppercase tracking-widest">Temps Réel</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <CheckCircle2 size={20} />
                    </div>
                    {i === 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full animate-ping"></span>}
                </div>
                <div className="flex-1 border-b border-slate-50 dark:border-slate-800 pb-4">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-slate-900 dark:text-white font-bold tracking-tight">Mise à jour du protocole de sécurité</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">12:45</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Action exécutée par <span className="text-indigo-500 font-bold">Système</span> • ID: #ADMIN-992</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2">Centre de Contrôle</h3>
                    <p className="text-indigo-100 text-sm mb-6">Gérez les accès globaux et générez des rapports d'audit.</p>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all font-bold text-sm backdrop-blur-md border border-white/10">
                            Générer Rapport PDF <ArrowUpRight size={18} />
                        </button>
                        <Link to="/create-user" className="w-full flex items-center justify-between bg-white text-indigo-600 p-4 rounded-2xl transition-all font-black text-sm shadow-lg active:scale-95">
                            Nouvel Utilisateur <Plus size={18} />
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6">
                <h4 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500"/> État du Serveur
                </h4>
                <div className="space-y-4">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilisation CPU : 85%</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Annuaire des Utilisateurs</h2>
            <p className="text-sm font-bold text-slate-400 mt-1">Total: {users.length} comptes enregistrés</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par nom, email, rôle..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Profil</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Rôle & Permission</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Dernière Connexion</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{u.name}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1.5">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-wider ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    En Ligne
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                        <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                            <Pencil size={16} />
                        </button>
                        <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#fcfcfd] dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* SIDEBAR */}
      <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col hidden lg:flex">
        <div className="p-10 text-center">
            <div className="inline-flex items-center gap-3 bg-indigo-600 p-3 rounded-[1.5rem] shadow-xl shadow-indigo-500/20 mb-4">
                <ShieldCheck size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">OS <span className="text-indigo-600">ADMIN</span></h2>
            <div className="mt-1 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Online</span>
            </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all duration-300 group ${
                  isActive 
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xl shadow-slate-900/10 dark:shadow-indigo-500/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className={`text-sm tracking-tight ${isActive ? 'font-black' : 'font-bold'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6">
                <p className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest text-center">Support Dev</p>
                <button className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black hover:shadow-md transition-all">Documentation API</button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-10 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contrôle global du système</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
                <button className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"><Search size={20}/></button>
                <button className="relative p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                </button>
            </div>
            <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800"></div>
            <button onClick={logout} className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <LogOut size={18}/> Quitter
            </button>
          </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SuperAdmin;