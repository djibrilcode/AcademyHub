// ...existing code...
import React, { createContext, useState, useEffect, useCallback } from 'react';

const UIContext = createContext();

const toHtmlLang = (l) => (l === 'EN' ? 'en' : 'fr');

export const UIProvider = ({ children }) => {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch (e) {
      console.error(e.message);
    }
    return false;
  };

  const getInitialLang = () => {
    try {
      return localStorage.getItem('lang') || 'FR';
    } catch (e) {
      console.error(e.message);
      return 'FR';
    }
  };

  const [isDark, setIsDark] = useState(getInitialTheme);
  const [lang, setLang] = useState(getInitialLang);

  // Apply DOM changes and persist to localStorage in a single effect
  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.error(e.message);
    }

    try {
      document.documentElement.lang = toHtmlLang(lang);
      localStorage.setItem('lang', lang);
    } catch (e) {
      console.error(e.message);
    }
  }, [isDark, lang]);

  // Sync theme/lang across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (!e.key) return;
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
      }
      if (e.key === 'lang') {
        setLang(e.newValue || 'FR');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const changeLang = useCallback((l) => {
    if (!l) return;
    const normalized = l === 'EN' ? 'EN' : 'FR';
    setLang(normalized);
  }, []);

  return (
    <UIContext.Provider value={{ isDark, toggleTheme, lang, setLang: changeLang }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext };
// ...existing code...