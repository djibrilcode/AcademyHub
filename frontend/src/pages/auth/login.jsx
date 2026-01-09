import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck, Chrome } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      if (token) {
        login(userData, token, rememberMe);
        const routes = {
          'student': '/dashboard-etudiant',
          'institution-user': '/dashboard-institution',
          'agency-admin': '/dashboard-agency',
          'super-admin': '/Super-Admin'
        };
        navigate(routes[userData.role] || '/dashboard-etudiant');
      }
    } catch (error) {
      console.error(error.message);
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#F8FAFC] dark:bg-slate-950 pt-7.5 px-4 transition-colors duration-300">
      <div className="w-full max-w-[440px]">
        {/* Logo/Brand Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-indigo-200 dark:shadow-none">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Ravi de vous revoir</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Accédez à votre espace AcademyHub</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <div className="w-1 h-1 bg-rose-600 rounded-full animate-pulse" /> {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Adresse Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mot de passe</label>
                    <Link to="/forgot-password" size={16} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors uppercase tracking-widest">Oublié ?</Link>
                </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded-lg border-slate-200 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500/20 bg-slate-50 dark:bg-slate-800"
              />
              <label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">Rester connecté</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Authentification...' : 'Se connecter au terminal'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-8 text-center">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
             <span className="relative px-4 bg-white dark:bg-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ou continuer avec</span>
          </div>

          <button className="w-full py-3.5 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Chrome size={18} className="text-rose-500" /> Google Account
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Nouveau ici ? <Link to="/register" className="text-indigo-600 font-bold hover:underline underline-offset-4 tracking-tight">Créer un compte accès</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;