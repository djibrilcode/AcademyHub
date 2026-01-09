import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (confirmNewPass !== newPassword) {
            setError('votre mot de passe ne correspondent pas');
        }

        try {
            await axios.post('http://localhost:5000/api/auth/reset-password',{ newPassword });
            alert('votre mot de passe a été modifié');  
        } catch (error) {
            console.error(error);
            setError('erreur lors de la renitialisation')
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                        <div className="w-1 h-1 bg-rose-600 rounded-full animate-pulse" /> {error}
                    </div>
                )}
                <div className="space-y-1.5">
                    <label htmlFor="password" className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input
                            type="password"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            />
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmpassword">confirmer le mot de passe</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input
                            type="password"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                            placeholder="••••••••"
                            value={confirmNewPass}
                            onChange={(e) => setConfirmNewPass(e.target.value)}
                            required
                            />
                    </div>
                </div>
                <button 
                    type='submit' 
                    disabled={loading}
                    className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 group"             
                > 
                    {loading ? 'Réinitialisation...' : 'Reinitialiser'} 
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;