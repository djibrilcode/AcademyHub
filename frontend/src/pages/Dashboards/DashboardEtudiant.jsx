import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
    FaClipboardList, FaMoneyBillWave, FaUniversity, 
    FaHourglassHalf, FaCheckCircle, FaTimesCircle,
    FaArrowRight, FaBell, FaFileAlt
} from 'react-icons/fa';

const DashboardEtudiant = () => {
    const { user } = useAuth()
    
    const stats = [
        { 
            id: 1, 
            title: "Bourses", 
            subtitle: "En attente de revue",
            value: "1", 
            icon: <FaMoneyBillWave />,
            color: "text-amber-600",
            bg: "bg-amber-50 dark:bg-amber-500/10",
            border: "border-amber-100 dark:border-amber-500/20"
        },
        { 
            id: 2, 
            title: "Candidatures", 
            subtitle: "Écoles & Universités",
            value: "3", 
            icon: <FaUniversity />,
            color: "text-indigo-600",
            bg: "bg-indigo-50 dark:bg-indigo-500/10",
            border: "border-indigo-100 dark:border-indigo-500/20"
        },
        { 
            id: 3, 
            title: "Actions", 
            subtitle: "Documents à fournir",
            value: "2", 
            icon: <FaClipboardList />,
            color: "text-rose-600",
            bg: "bg-rose-50 dark:bg-rose-500/10",
            border: "border-rose-100 dark:border-rose-500/20"
        },
    ];

    const demandesRecentes = [
        { id: 'B001', type: 'Bourse Nationale', date: '10 Oct 2025', statut: 'pending' },
        { id: 'C125', type: 'Candidature École X', date: '01 Nov 2025', statut: 'approved' },
        { id: 'C126', type: 'Candidature École Y', date: '15 Nov 2025', statut: 'rejected' },
    ];

    const renderStatusBadge = (statut) => {
        const styles = {
            pending: { text: 'En cours', icon: <FaHourglassHalf />, css: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' },
            approved: { text: 'Validée', icon: <FaCheckCircle />, css: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
            rejected: { text: 'Rejetée', icon: <FaTimesCircle />, css: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' }
        };
        const s = styles[statut] || styles.pending;
        return (
            <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${s.css}`}>
                {s.icon} {s.text}
            </span>
        );
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#fcfcfd] dark:bg-slate-950 min-h-screen transition-colors duration-300">
            
            {/* 1. EN-TÊTE ACCUEILLANT */}
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Ravi de vous revoir, <span className="text-indigo-600">{user?.name}</span> 👋
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                        Vous avez <span className="font-bold text-slate-700 dark:text-slate-200">2 notifications</span> importantes aujourd'hui.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-all">
                        <FaFileAlt /> Mes documents
                    </button>
                </div>
            </header>

            {/* 2. STATS DYNAMIQUES */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map(stat => (
                    <div key={stat.id} className={`p-6 rounded-3xl border ${stat.border} ${stat.bg} transition-transform hover:scale-[1.02] duration-300 shadow-sm`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                                <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
                            </div>
                            <div className={`p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${stat.color} text-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* 3. ALERTE CRITIQUE (URGENT) */}
            <section className="mb-12">
                <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-xl shadow-rose-500/20">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                <FaBell className="text-2xl animate-bounce" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black italic">Action Requise Immédiate</h4>
                                <p className="text-rose-100">Votre demande de bourse est incomplète (2 documents manquants).</p>
                            </div>
                        </div>
                        <a href="/demande-bourse" className="group flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-2xl font-black hover:bg-rose-50 transition-all active:scale-95 shadow-lg">
                            Finaliser maintenant <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                    {/* Décoration d'arrière-plan */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                </div>
            </section>

            {/* 4. TABLEAU DE SUIVI MODERNE */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Suivi des candidatures</h2>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Voir tout</button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50 dark:border-slate-800">
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Référence</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Type de demande</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">État</th>
                                    <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {demandesRecentes.map(demande => (
                                    <tr key={demande.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-8 py-6 text-sm font-bold text-slate-400">#{demande.id}</td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{demande.type}</span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500 dark:text-slate-400 font-medium">{demande.date}</td>
                                        <td className="px-8 py-6">{renderStatusBadge(demande.statut)}</td>
                                        <td className="px-8 py-6 text-right">
                                            <button className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                                demande.statut === 'rejected' 
                                                ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' 
                                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:text-indigo-400'
                                            }`}>
                                                {demande.statut === 'rejected' ? 'MOTIF DU REFUS' : 'VOIR DÉTAILS'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DashboardEtudiant;