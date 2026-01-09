import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  School, 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  Rocket,
  ArrowUpRight
} from 'lucide-react';

const Home = () => {
  return (
    /* 1. Fond principal : de gris très clair à bleu-nuit profond */
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 space-y-32">
        
        {/* --- SECTION 1: HÉRO --- */}
        <section className="relative text-center max-w-4xl mx-auto pt-10">
          {/* Badge : Ajustement des couleurs indigo pour le mode sombre */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Session 2025 désormais ouverte
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            Simplifiez votre <span className="text-indigo-600 dark:text-indigo-400">parcours académique.</span>
          </h1>
          
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 px-4">
            Une plateforme unique pour centraliser vos bourses, vos candidatures et vos documents officiels. Conçu pour les étudiants qui visent l'excellence, pas la paperasse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-slate-200 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Créer mon espace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              En savoir plus
            </Link>
          </div>
        </section>

        {/* --- SECTION 2: FONCTIONNALITÉS --- */}
        <section id="fonctionnalites">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Services Intégrés</h2>
            <div className="h-1.5 w-20 bg-indigo-600 dark:bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cartes : passage de bg-white à un gris foncé transparent */}
            {[
              { icon: ShieldCheck, title: "Gestion des Bourses", desc: "Centralisez vos demandes de bourses nationales avec un suivi de statut automatisé.", color: "indigo" },
              { icon: School, title: "Inscriptions Master", desc: "Postulez auprès de plusieurs établissements en une seule fois grâce à votre dossier unique.", color: "blue" },
              { icon: FileText, title: "Coffre-fort Numérique", desc: "Stockez vos relevés de notes et diplômes de manière sécurisée et certifiée.", color: "emerald" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: PROCESSUS (Déjà sombre, on l'affine pour le Dark Mode) --- */}
        <section className="bg-slate-900 dark:bg-slate-900/50 border dark:border-slate-800 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Comment ça marche ?</h2>
              <p className="text-slate-400 text-lg mb-8">
                Nous avons réduit la complexité administrative pour vous permettre de vous concentrer sur vos études.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: UserPlus, title: "Inscription Express", desc: "Créez votre profil en moins de 2 minutes." },
                  { icon: Clock, title: "Dossier Unique", desc: "Remplissez vos informations une seule fois." },
                  { icon: Rocket, title: "Envoi Automatisé", desc: "Diffusez vos demandes en un clic." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <step.icon className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <p className="text-sm text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration squelette animée */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="h-20 bg-indigo-500/20 rounded-xl border border-indigo-500/30"></div>
                    <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
                    <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-indigo-600 text-center font-bold text-white">
                    Dossier validé à 92%
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: CTA FINAL --- */}
        <section className="text-center py-10">
          <div className="max-w-2xl mx-auto p-12 rounded-[2rem] bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Rejoignez l'élite académique.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Plus de 15 000 étudiants utilisent AcademyHub pour leurs démarches. Pourquoi pas vous ?
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Démarrer gratuitement
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;