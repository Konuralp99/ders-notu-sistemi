import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Özel Markdown Renderers
const CustomBlockquote = ({ children }) => {
    const { isRecallMode } = useApp();
    // React çocuklarını stringe çevirerek kontrol et
    const text = React.Children.toArray(children).map(child => {
        if (typeof child === 'string') return child;
        if (child.props && child.props.children) return child.props.children;
        return '';
    }).join(' ').toLowerCase();

    const [isVisible, setIsVisible] = useState(false);

    if (text.includes('hoca') || text.includes('puan') || text.includes('kırar') || text.includes('tuzak')) {
        return (
            <div className="my-6 p-4 rounded-r-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500 text-red-700 dark:text-red-200 flex gap-3 items-start shadow-sm">
                <AlertTriangle className="shrink-0 mt-1" size={20} />
                <div
                    className={`font-medium duration-300 ${isRecallMode && !isVisible ? 'recall-blur' : 'recall-visible'}`}
                    onClick={() => isRecallMode && setIsVisible(true)}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r italic mb-6 dark:border-blue-500 dark:bg-blue-900/20 dark:text-slate-200">
            <div
                className={`duration-300 ${isRecallMode && !isVisible ? 'recall-blur' : 'recall-visible'}`}
                onClick={() => isRecallMode && setIsVisible(true)}
            >
                {children}
            </div>
        </blockquote>
    );
};

const CustomParagraph = ({ children }) => {
    const { isRecallMode } = useApp();
    const hasMath = React.Children.toArray(children).some(child =>
        child?.type?.name === 'Math' ||
        (child?.props?.className && child.props.className.includes('math'))
    );

    const [isVisible, setIsVisible] = useState(false);

    if (isRecallMode && hasMath && !isVisible) {
        return (
            <div className="recall-math-hidden" onClick={() => setIsVisible(true)}></div>
        )
    }

    return <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300 transition-all">{children}</p>;
};

const CustomStrong = ({ children }) => {
    const { isRecallMode } = useApp();
    const [isVisible, setIsVisible] = useState(false);
    return (
        <strong
            className={`font-bold text-slate-900 dark:text-white ${isRecallMode && !isVisible ? 'recall-blur px-1 bg-slate-200 dark:bg-slate-700 text-transparent' : 'transition-all duration-500'}`}
            onClick={() => isRecallMode && setIsVisible(true)}
        >
            {children}
        </strong>
    );
};

const markdownComponents = {
    blockquote: CustomBlockquote,
    p: CustomParagraph,
    strong: CustomStrong
};

export default function HomePage() {
    const { selectedCard, isZenMode, setIsDarkMode, isDarkMode } = useApp(); // Removed isRecallMode here as it is used mainly in components

    return (
        <>
            {selectedCard ? (
                <div className={`${isZenMode ? 'max-w-4xl w-full py-16 px-12' : 'max-w-3xl py-12 px-12'} transition-all duration-500`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                        <span className="bg-primary/10 px-2 py-1 rounded">{selectedCard.category}</span>
                        <div className="text-slate-300">»</div>
                        <span className="text-slate-400">{selectedCard.title}</span>
                    </div>

                    <h2 className="text-4xl font-outfit font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">{selectedCard.title}</h2>

                    {selectedCard.keywords && (
                        <div className="flex flex-wrap gap-2 mb-8 mt-4">
                            {selectedCard.keywords.split(',').map((tag, i) => (
                                <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter border border-slate-200 dark:border-slate-700">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-outfit prose-headings:font-bold prose-p:text-slate-600 dark:prose-p:text-slate-300 mt-8">
                        <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={markdownComponents}
                        >
                            {selectedCard.content}
                        </ReactMarkdown>
                    </div>

                    {isZenMode && (
                        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 italic text-sm">
                            Odaklanma Modu • Elektronik II Çalışma Rehberi
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center min-h-[50vh]">
                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
                        <BookOpen size={48} className="text-slate-200 dark:text-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Çalışmaya Başla</h3>
                    <p className="max-w-md mx-auto">Sol menüden bir konu seçerek detaylı notlara, formüllere ve sınav ipuçlarına ulaşabilirsin.</p>
                    <div className="mt-8 flex gap-4">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-xs font-semibold text-primary hover:underline">
                            {isDarkMode ? 'Aydınlık Modu Dene' : 'Karanlık Modu Dene'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
