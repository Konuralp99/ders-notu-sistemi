import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {
    AlertTriangle, Calculator, ListChecks, FileText, BrainCircuit,
    X, Lightbulb, Target, Shield, Crosshair, Radar, Activity, Zap
} from 'lucide-react';
import { analyzeCourseContent } from '../utils/analyzer';

export default function ExamDashboard({ content, onClose }) {
    const [activeTab, setActiveTab] = useState('warnings');

    // Analiz verisi (Memoize edildi)
    const data = useMemo(() => analyzeCourseContent(content), [content]);

    // Toplam risk ve hazırlık skoru (Simüle edilmiş basit metrik)
    const totalIntel = Object.values(data.stats).reduce((a, b) => a + b, 0);
    const riskLevel = data.stats.warningCount > 5 ? 'CRITICAL' : data.stats.warningCount > 2 ? 'HIGH' : 'MODERATE';

    const tabs = [
        {
            id: 'warnings',
            label: 'İSTİHBARAT',
            icon: AlertTriangle,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20',
            desc: 'Hoca Hataları & Puan Tuzakları',
            count: data.stats.warningCount
        },
        {
            id: 'strategies',
            label: 'STRATEJİ',
            icon: Crosshair,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            desc: 'Sınav Başlangıç Hamleleri',
            count: data.stats.strategyCount
        },
        {
            id: 'recipes',
            label: 'REÇETELER',
            icon: ListChecks,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            desc: 'Adım Adım Çözüm Yolları',
            count: data.stats.recipeCount
        },
        {
            id: 'formulas',
            label: 'CEPHANE',
            icon: Calculator,
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20',
            desc: 'Formüller & Denklemler',
            count: data.stats.formulaCount
        },
        {
            id: 'theories',
            label: 'TEORİ',
            icon: Radar,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            desc: 'Kritik Konsept Analizi',
            count: data.stats.theoryCount
        },
        {
            id: 'cheatsheet',
            label: 'KARTLAR',
            icon: BrainCircuit,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
            border: 'border-violet-500/20',
            desc: 'Hızlı Ezber Kartları',
            count: data.stats.cheatSheetCount
        },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300 font-sans selection:bg-rose-500/30">

            {/* --- HUD HEADER --- */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shadow-2xl relative overflow-hidden shrink-0">
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20"></div>

                <div className="flex items-center gap-4 z-10">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 shadow-inner">
                        <Shield className="text-rose-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-widest font-outfit uppercase">WAR ROOM</h1>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            SYSTEM_ONLINE • {content.length} BYTES • INTEL: {totalIntel}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 z-10">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">THREAT LEVEL</span>
                        <div className="flex items-center gap-2">
                            <Activity size={14} className={riskLevel === 'CRITICAL' ? 'text-rose-500' : 'text-slate-400'} />
                            <span className={`text-sm font-bold font-mono ${riskLevel === 'CRITICAL' ? 'text-rose-500' :
                                riskLevel === 'HIGH' ? 'text-orange-500' : 'text-green-500'
                                }`}>{riskLevel}</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-transparent hover:border-slate-700 group"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </header>

            {/* --- MAIN INTERFACE --- */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* --- SIDEBAR NAVIGATION --- */}
                <nav className="w-20 md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 z-20">
                    <div className="flex-1 overflow-y-auto py-6 px-2 md:px-4 space-y-2">
                        <div className="hidden md:block px-4 mb-4 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Tactical Modules</div>

                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 p-3 rounded-r-none md:rounded-lg border-r-2 md:border-r-0 md:border border-transparent transition-all duration-200 group relative overflow-hidden
                                    ${activeTab === tab.id
                                        ? `bg-slate-800 ${tab.color} border-l-rose-500 md:border-slate-700 shadow-lg shadow-black/20`
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                    }
                                `}
                            >
                                <div className={`
                                     relative z-10 p-2 rounded-md transition-all duration-300
                                     ${activeTab === tab.id ? 'bg-slate-900 shadow-inner' : 'bg-slate-800/50 group-hover:bg-slate-800'}
                                 `}>
                                    <tab.icon size={20} className={activeTab === tab.id ? tab.color : 'text-slate-500 group-hover:text-slate-300'} />
                                </div>

                                <div className="hidden md:flex flex-col items-start z-10 flex-1">
                                    <span className={`text-sm font-bold tracking-wide ${activeTab === tab.id ? 'text-white' : ''}`}>{tab.label}</span>
                                    <span className="text-[10px] opacity-60 font-medium truncate w-full text-left">{tab.desc}</span>
                                </div>

                                {/* Counter Badge */}
                                {tab.count > 0 && (
                                    <span className={`hidden md:flex z-10 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${activeTab === tab.id
                                        ? 'bg-slate-950 border-slate-700 text-white shadow-lg'
                                        : 'bg-slate-800 border-transparent text-slate-500'
                                        }`}>
                                        {tab.count.toString().padStart(2, '0')}
                                    </span>
                                )}

                                {/* Active Glow Background */}
                                {activeTab === tab.id && (
                                    <div className={`absolute inset-0 opacity-5 ${tab.color.replace('text-', 'bg-')}`}></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Bottom Status */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 hidden md:block">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>V-3.1.0</span>
                            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></div> LIVE LINK</span>
                        </div>
                    </div>
                </nav>

                {/* --- CONTENT DECK --- */}
                <main className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)] pointer-events-none"></div>

                    {/* Tab Header (Mobile/Context) */}
                    <div className="px-8 py-6 z-10 flex items-end justify-between border-b border-white/5 bg-slate-950/50 backdrop-blur-sm sticky top-0">
                        <div>
                            <h2 className={`text-2xl font-black tracking-tight font-outfit uppercase flex items-center gap-3 ${activeTabData?.color}`}>
                                <activeTabData.icon size={28} />
                                {activeTabData?.label}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1 font-medium pl-10 border-l-2 border-slate-800 ml-3">
                                {activeTabData?.desc}
                            </p>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scroll-smooth">
                        <div className="max-w-5xl mx-auto space-y-6 pb-20 fade-in">

                            {/* Empty State */}
                            {activeTabData?.count === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-800 border-dashed mb-4">
                                        <activeTabData.icon size={32} className="text-slate-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-500">NO INTEL FOUND</h3>
                                    <p className="text-slate-600 text-sm">System scan returned 0 results for this module.</p>
                                </div>
                            )}

                            {/* WARNINGS MODULE */}
                            {activeTab === 'warnings' && data.warnings.map((warn, i) => (
                                <div key={i} className="group relative bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)]">
                                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-rose-900"></div>
                                    <div className="p-6 pl-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-rose-500/10 text-rose-500 text-[10px] font-bold px-2 py-1 rounded border border-rose-500/20 uppercase tracking-wider animate-pulse">
                                                    {warn.title}
                                                </span>
                                            </div>
                                            <span className="text-slate-600 font-mono text-[10px]">INTEL_ID_#{i + 1}042</span>
                                        </div>
                                        <div className="text-slate-300 leading-relaxed font-medium prose prose-invert prose-p:text-slate-300 prose-strong:text-rose-400 max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                                {warn.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* RECIPES MODULE */}
                            {activeTab === 'recipes' && data.recipes.map((recipe, i) => (
                                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                                    <div className="bg-slate-800/50 p-4 border-b border-slate-700/50 flex items-center gap-3">
                                        <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg border border-emerald-500/10">
                                            <ListChecks size={20} />
                                        </div>
                                        <h3 className="font-bold text-white text-lg">{recipe.title}</h3>
                                    </div>
                                    <div className="p-6 md:p-8 prose prose-invert prose-p:text-slate-400 prose-headings:text-slate-200 prose-strong:text-emerald-400 prose-li:marker:text-emerald-500 max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                            {recipe.steps}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}

                            {/* FORMULAS MODULE */}
                            {activeTab === 'formulas' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.formulas.map((form, i) => (
                                        <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Calculator className="text-indigo-500" size={16} />
                                            </div>
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></span>
                                                {form.name}
                                            </div>
                                            <div className="text-lg text-indigo-100 font-medium py-2 overflow-x-auto no-scrollbar">
                                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                                    {form.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* THEORIES MODULE */}
                            {activeTab === 'theories' && data.theories.map((theory, i) => (
                                <div key={i} className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-dashed border-slate-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
                                        <Radar size={200} />
                                    </div>
                                    <h3 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-3">
                                        <Lightbulb size={24} /> {theory.title}
                                    </h3>
                                    <div className="prose prose-invert prose-p:text-slate-300 prose-strong:text-white max-w-none relative z-10">
                                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                            {theory.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}

                            {/* STRATEGIES module */}
                            {activeTab === 'strategies' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {data.strategies.map((strategy, i) => (
                                        <div key={i} className="relative bg-gradient-to-b from-blue-900/20 to-slate-900 border border-blue-900/30 p-6 rounded-2xl">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-bold text-blue-400 text-lg">{strategy.title}</h3>
                                                <Target className="text-blue-500/50" />
                                            </div>
                                            <div className="space-y-4">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}
                                                    components={{
                                                        ol: ({ ...props }) => <ol className="list-decimal pl-4 space-y-2 marker:text-blue-500 marker:font-bold" {...props} />,
                                                        li: ({ ...props }) => <li className="text-sm text-slate-700 dark:text-slate-300 pl-1" {...props} />
                                                    }}
                                                >
                                                    {strategy.steps}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CHEATSHEET MODULE */}
                            {activeTab === 'cheatsheet' && (
                                <div className="grid gap-3">
                                    {data.cheatSheets.map((cheat, i) => (
                                        <div key={i} className="group bg-slate-900 hover:bg-slate-800 p-4 rounded-xl border border-slate-800 hover:border-violet-500/30 transition-all flex flex-col md:flex-row md:items-center gap-4 cursor-default">
                                            <div className="md:w-1/4 shrink-0">
                                                <div className="text-violet-400 font-bold text-sm bg-violet-500/10 px-3 py-1.5 rounded-lg inline-block md:block md:text-center border border-violet-500/10">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkMath]}
                                                        rehypePlugins={[rehypeKatex]}
                                                        components={{ p: 'span' }}
                                                    >
                                                        {cheat.term}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                            <div className="hidden md:block w-px h-8 bg-slate-800"></div>
                                            <div className="md:w-3/4 text-slate-400 text-sm group-hover:text-slate-200 transition-colors">
                                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                                    {cheat.answer}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
