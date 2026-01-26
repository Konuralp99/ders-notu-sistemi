import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar as SidebarIcon, Maximize2, Minimize2, AlertTriangle, Eye, EyeOff, Pen } from 'lucide-react';

export default function Header({
    isSidebarOpen,
    setIsSidebarOpen,
    isZenMode,
    setIsZenMode,
    isRecallMode,
    setIsRecallMode,
    setShowExamDashboard,
    selectedCard
}) {
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const timeoutRef = React.useRef(null);

    useEffect(() => {
        const showControls = () => {
            setIsControlsVisible(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsControlsVisible(false), 2000);
        };

        window.addEventListener('mousemove', showControls);
        window.addEventListener('touchstart', showControls);
        window.addEventListener('click', showControls);

        showControls();

        return () => {
            window.removeEventListener('mousemove', showControls);
            window.removeEventListener('touchstart', showControls);
            window.removeEventListener('click', showControls);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <>
            {!isZenMode && (
                <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
                    <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar pr-4 mask-fade-right">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
                        >
                            {isSidebarOpen ? <Menu size={20} /> : <SidebarIcon size={20} />}
                        </button>

                        <button
                            onClick={() => {
                                const newZenMode = true;
                                setIsZenMode(newZenMode);
                                setIsSidebarOpen(!newZenMode);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
                        >
                            <Maximize2 size={14} /> Odaklan
                        </button>

                        <Link
                            to="/notebook"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-105 whitespace-nowrap shrink-0"
                        >
                            <Pen size={14} /> Dijital Defter
                        </Link>

                        {/* WAR ROOM BUTTON */}
                        <button
                            onClick={() => setShowExamDashboard(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-rose-600 text-white shadow-lg shadow-rose-600/30 hover:bg-rose-700 hover:scale-105 animate-pulse whitespace-nowrap shrink-0"
                        >
                            <AlertTriangle size={14} /> Sınav Harekat Merkezi
                        </button>

                        {/* Recall Mode Toggle */}
                        <button
                            onClick={() => setIsRecallMode(!isRecallMode)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${isRecallMode ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 ring-2 ring-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                            title="Active Recall Modu: Terimleri ve formülleri gizle"
                        >
                            {isRecallMode ? <EyeOff size={14} /> : <Eye size={14} />}
                            {isRecallMode ? 'Sınav Modu AÇIK' : 'Sınav Modu'}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {selectedCard && (
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                                {selectedCard.title}
                            </span>
                        )}
                        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/20">
                            E2
                        </div>
                    </div>
                </header>
            )}

            {isZenMode && (
                <button
                    onClick={() => {
                        setIsZenMode(false);
                        setIsSidebarOpen(false);
                    }}
                    className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-bold bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 transition-all duration-500 ${isControlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                >
                    <Minimize2 size={18} /> Çık
                </button>
            )}
        </>
    );
}
