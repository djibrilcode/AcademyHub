import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/useUI';
import { useState, useEffect } from 'react';
import { 
  User, LogOut, LayoutDashboard, ChevronDown, Menu, X, 
  GraduationCap, Bell, Sun, Moon, Languages, Search, 
  BookOpen, Star, HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDark, toggleTheme, lang, setLang } = useUI();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Détecter le scroll pour l'effet de flou et réduire la taille
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return '/';
    const roles = {
      'student': '/dashboard-etudiant',
      'institution-user': '/dashboard-institution',
      'agency-admin': '/dashboard-agency',
      'super-admin': '/Super-Admin'
    };
    return roles[user.role] || '/dashboard-etudiant';
  };

  const t = {
    FR: { home: 'Accueil', courses: 'Mes Cours', help: 'Aide', space: 'Tableau de bord', logout: 'Déconnexion', login: 'Connexion', register: 'S\'inscrire' },
    EN: { home: 'Home', courses: 'My Courses', help: 'Help', space: 'Dashboard', logout: 'Sign Out', login: 'Login', register: 'Join Us' }
  }[lang];

  return (
    <header className="fixed top-0 w-full z-50 px-0 sm:px-4 pt-0 sm:pt-2">
      <nav className={`mx-auto max-w-7xl transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sm:rounded-2xl border-b sm:border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-indigo-500/10' 
          : 'bg-transparent py-2 border-transparent'
      }`}>
        <div className="px-4 sm:px-6">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            
            {/* LOGO & RECHERCHE RAPIDE */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-500/20">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                  Academy<span className="text-indigo-600">Hub</span>
                </span>
              </Link>

              {/* Barre de recherche discrète (Desktop) */}
              <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 group focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                <Search size={16} className="text-slate-400 group-focus-within:text-indigo-500" />
                <input 
                  type="text" 
                  placeholder="Chercher un cours..." 
                  className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* NAVIGATION PRINCIPALE */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: t.home, path: '/', icon: <Star size={14}/> },
                { name: t.courses, path: '/courses', icon: <BookOpen size={14}/> },
                { name: t.help, path: '/contact', icon: <HelpCircle size={14}/> },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                    location.pathname === link.path 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Notifications */}
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
              </button>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                >
                  <Languages size={20} />
                  <span className="text-xs font-bold uppercase">{lang}</span>
                  <ChevronDown size={12} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => { setLang('FR'); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${lang === 'FR' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => { setLang('EN'); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${lang === 'EN' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      EN
                    </button>
                  </div>
                )}
              </div>

              {/* Profil ou Auth */}
              {isAuthenticated ? (
                <div className="relative ml-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-transparent hover:border-indigo-500/50 transition-all"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-black shadow-inner">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-xs font-bold dark:text-slate-200 max-w-[80px] truncate">{user?.name}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 animate-in fade-in slide-in-from-top-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-2">
                        <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Espace Étudiant</p>
                        <p className="text-sm font-bold dark:text-white truncate">{user?.name}</p>
                      </div>
                      <Link to={getDashboardLink()} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 rounded-lg transition-colors">
                        <LayoutDashboard size={18} /> {t.space}
                      </Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 rounded-lg transition-colors">
                        <User size={18} /> Mon Profil
                      </Link>
                      <Link to="logout" className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors mt-1 border-t border-slate-100 dark:border-slate-800">
                        <LogOut size={18} /> {t.logout}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:block text-xs font-black uppercase tracking-tighter text-slate-600 dark:text-slate-400 px-4">{t.login}</Link>
                  <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-xs font-black shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">{t.register}</Link>
                </div>
              )}

              {/* Mobile Menu Trigger */}
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <Menu size={24} className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Full Screen Overlay) */}
      <div className={`fixed inset-0 bg-white dark:bg-slate-950 z-[100] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black dark:text-white">Academy<span className="text-indigo-600">Hub</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
              <X size={24} className="dark:text-white" />
            </button>
          </div>
          
          <div className="space-y-6">
            {[{name: t.home, path: '/'}, {name: t.courses, path: '/courses'}, {name: t.help, path: '/contact'}].map((l) => (
              <Link key={l.path} to={l.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-3xl font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                {l.name}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-10 left-6 right-6 space-y-4">
             <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:text-white font-bold">
                  {isDark ? <Sun size={18}/> : <Moon size={18}/>} Theme
                </button>
                <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="flex-1 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:text-white font-black">
                  {lang}
                </button>
             </div>
             {!isAuthenticated && (
               <Link to="/register" className="block w-full py-4 bg-indigo-600 text-white text-center rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/30">
                 Commencer maintenant
               </Link>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;