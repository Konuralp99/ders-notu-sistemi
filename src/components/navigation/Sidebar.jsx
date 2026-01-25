import React from 'react';
import { BookOpen, Search, Sidebar as SidebarIcon, ChevronRight, Hash, Sun, Moon } from 'lucide-react';
import { COURSES } from '../../data/courses';

export default function Sidebar({
    isOpen,
    setIsOpen,
    selectedCourseId,
    setSelectedCourseId,
    selectedCard,
    setSelectedCard,
    searchTerm,
    setSearchTerm,
    isDarkMode,
    setIsDarkMode,
    filteredCards,
    isZenMode
}) {

    // Close on Escape key
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setIsOpen]);

    // Prevent body scroll when mobile sidebar is open
    React.useEffect(() => {
        if (window.innerWidth < 768 && isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Backdrop - High Z-index with Blur */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar Container */}
            <aside className={`
        fixed md:relative z-50 h-full
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0 md:translate-x-0 md:w-0 overflow-hidden'}
        ${isZenMode ? 'hidden' : 'flex flex-col'}
      `}>
                <div className={`p-6 h-full flex flex-col ${!isOpen && 'md:opacity-0 md:pointer-events-none'} transition-opacity duration-200`}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <BookOpen size={24} />
                        </div>
                        <div className="flex flex-col whitespace-nowrap overflow-hidden">
                            <h1 className="text-lg font-outfit font-bold tracking-tight text-slate-900 dark:text-white">Ders Notlarım</h1>
                            <span className="text-xs text-slate-500 font-medium">v2.0 Master</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Ders Seç</label>
                        <div className="relative">
                            <SidebarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <select
                                value={selectedCourseId}
                                onChange={(e) => {
                                    setSelectedCourseId(e.target.value);
                                    setSelectedCard(null);
                                }}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary focus:border-primary block pl-9 p-2.5 appearance-none cursor-pointer font-medium"
                            >
                                {COURSES.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={14} />
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Konularda ara (örn: osilatör, histeresis)..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Başlıklar</div>
                        {filteredCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => setSelectedCard(card)}
                                className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3 ${selectedCard?.id === card.id ? 'bg-primary/10 text-primary dark:text-blue-400 font-semibold' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                                <Hash size={16} className={selectedCard?.id === card.id ? 'text-primary dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'} />
                                <span className="truncate">{card.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span>Sınav odaklı v2.0</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                                title={isDarkMode ? "Aydınlık Mod" : "Karanlık Mod"}
                            >
                                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
