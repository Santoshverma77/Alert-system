import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, t, languageOptions } = useLanguage();

    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        if (location.pathname === '/') {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/#${targetId}`);
        }
    };

    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const dark =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);

        document.documentElement.classList.toggle('dark', dark);
        setIsDarkMode(dark);
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.theme = newMode ? 'dark' : 'light';
        setIsDarkMode(newMode);
    };

    const isDashboard = location.pathname === '/dashboard';
    const isAuthPage = ['/login', '/signup', '/register', '/forgot-password']
        .some(p => location.pathname.startsWith(p));

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1224]/90 dark:bg-slate-950/90 border-b border-white/10 transition-all duration-300">
            <div className="relative z-50 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt={t('brandLogoAlt')}
                        className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="font-bold text-lg text-white leading-tight">
                            {t('brandName')}
                        </h1>
                        <span className="text-xs text-white/70">
                            {t('civicTagline')}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                {!isDashboard && (
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                        <Link to="/" className="hover:text-white">{t('home')}</Link>
                        <a onClick={(e) => handleNavigation(e, 'features')} className="cursor-pointer hover:text-white">{t('features')}</a>
                        <a onClick={(e) => handleNavigation(e, 'whatsapp')} className="cursor-pointer hover:text-white">{t('whatsapp')}</a>
                        <a onClick={(e) => handleNavigation(e, 'about')} className="cursor-pointer hover:text-white">{t('about')}</a>
                    </div>
                )}

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/40"
                        title={t('language')}
                    >
                        {languageOptions.map((opt) => (
                            <option key={opt.code} value={opt.code} className="bg-slate-800 text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        title="Toggle Theme"
                    >
                        {isDarkMode ? '🌞' : '🌙'}
                    </button>

                    {!isDashboard && !isAuthPage && (
                        <Link
                            to="/report"
                            className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/30 transition"
                        >
                            Report Issue
                        </Link>
                    )}

                    {!isDashboard && !isAuthPage && (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                        >
                            {t('login')}
                        </Link>
                    )}

                    {isDashboard && (
                        <Link
                            to="/"
                            className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        >
                            {t('logout')}
                        </Link>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 z-40 bg-[#0b1224] dark:bg-slate-950 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-28 px-6 pb-10 overflow-y-auto">

                    <div className="flex flex-col gap-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm"
                        >
                            {languageOptions.map((opt) => (
                                <option key={opt.code} value={opt.code} className="bg-slate-800 text-white">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="p-4 rounded-xl hover:bg-white/5 text-lg font-medium border-b border-white/5 text-white"
                        >
                            {t('home')}
                        </Link>
                        <button
                            onClick={(e) => { handleNavigation(e, 'features'); setIsMenuOpen(false); }}
                            className="p-4 rounded-xl hover:bg-white/5 text-lg font-medium border-b border-white/5 text-left w-full text-white bg-transparent"
                        >
                            {t('features')}
                        </button>
                        <button
                            onClick={(e) => { handleNavigation(e, 'whatsapp'); setIsMenuOpen(false); }}
                            className="p-4 rounded-xl hover:bg-white/5 text-lg font-medium border-b border-white/5 text-left w-full text-white bg-transparent"
                        >
                            {t('whatsapp')}
                        </button>
                        <button
                            onClick={(e) => { handleNavigation(e, 'about'); setIsMenuOpen(false); }}
                            className="p-4 rounded-xl hover:bg-white/5 text-lg font-medium border-b border-white/5 text-left w-full text-white bg-transparent"
                        >
                            {t('about')}
                        </button>
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                        <button
                            onClick={toggleTheme}
                            className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center gap-3 transition-colors text-white"
                        >
                            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                        </button>

                        {!isAuthPage && !isDashboard && (
                            <Link
                                to="/report"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center font-bold shadow-lg"
                            >
                                Report Issue
                            </Link>
                        )}

                        {!isAuthPage && !isDashboard && (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/5 text-center transition-colors text-white"
                            >
                                {t('login')}
                            </Link>
                        )}

                        {isDashboard && (
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-center font-bold"
                            >
                                {t('logout')}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}