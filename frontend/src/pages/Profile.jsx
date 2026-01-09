import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Mail, Shield, Bell, Camera, 
  MapPin, Phone, GraduationCap, Save, LogOut 
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personnel');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'personnel', label: 'Informations', icon: <User size={18} /> },
    { id: 'securite', label: 'Sécurité', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pt-28 pb-20 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* EN-TÊTE PROFIL */}
        <div className="relative mb-8">
          <div className="h-48 w-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] shadow-lg shadow-indigo-500/20"></div>
          
          <div className="absolute -bottom-6 left-8 flex items-end gap-6">
            <div className="relative group">
              <div className="h-32 w-32 rounded-3xl bg-white dark:bg-slate-900 p-1.5 shadow-xl">
                <div className="h-full w-full rounded-[1.2rem] bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-4xl font-black text-indigo-600">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="pb-8">
              <h1 className="text-3xl font-black text-white drop-shadow-md">{user.name}</h1>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest border border-white/30">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-16">
          
          {/* BARRE LATÉRALE (Navigation) */}
          <aside className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
               <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
                  <LogOut size={18} /> Déconnexion
               </button>
            </div>
          </aside>

          {/* CONTENU PRINCIPAL (Formulaire) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 sm:p-10">
              
              {activeTab === 'personnel' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Informations Personnelles</h2>
                    <p className="text-slate-500 dark:text-slate-400">Mettez à jour vos coordonnées publiques</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Nom Complet</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                          type="text" 
                          defaultValue={user.name} 
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Adresse Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          defaultValue={user.email} 
                          disabled
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl cursor-not-allowed text-slate-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Téléphone</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input 
                          type="tel" 
                          placeholder="+212 600 000 000" 
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Établissement</label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Ex: Université Mohammed V" 
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
                      <Save size={18} /> Sauvegarder les modifications
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'securite' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                   <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Sécurité</h2>
                    <p className="text-slate-500 dark:text-slate-400">Gérez votre mot de passe et l'accès à votre compte</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-medium">
                      Votre mot de passe a été modifié pour la dernière fois il y a 3 mois.
                    </div>
                    <button className="px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-sm">
                      Changer le mot de passe
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;