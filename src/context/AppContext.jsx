import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { parseMarkdownToCards } from '../utils/parser';
import { COURSES } from '../data/courses';

const AppContext = createContext();

export function AppProvider({ children }) {
    // --- UI States ---
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
        return false;
    });
    const [isZenMode, setIsZenMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
    const [showExamDashboard, setShowExamDashboard] = useState(false);
    const [isRecallMode, setIsRecallMode] = useState(false);

    // --- Data States ---
    const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    // --- Effects ---
    // Dark Mode Toggle
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Derived Data (Course & Cards)
    const activeCourse = useMemo(() => COURSES.find(c => c.id === selectedCourseId) || COURSES[0], [selectedCourseId]);
    const cards = useMemo(() => parseMarkdownToCards(activeCourse.content), [activeCourse]);

    const filteredCards = useMemo(() => {
        if (!searchTerm) return cards;

        const fuse = new Fuse(cards, {
            keys: [
                { name: 'title', weight: 0.5 },
                { name: 'keywords', weight: 0.3 },
                { name: 'content', weight: 0.2 }
            ],
            threshold: 0.4,
            ignoreLocation: true
        });

        return fuse.search(searchTerm).map(result => result.item);
    }, [searchTerm, cards]);

    // Actions
    const handleCourseChange = (courseId) => {
        setSelectedCourseId(courseId);
        setSelectedCard(null);
    };

    const value = {
        // UI
        isDarkMode, setIsDarkMode,
        isZenMode, setIsZenMode,
        isSidebarOpen, setIsSidebarOpen,
        showExamDashboard, setShowExamDashboard,
        isRecallMode, setIsRecallMode,

        // Data
        activeCourse,
        cards,
        filteredCards,
        selectedCourseId,
        handleCourseChange,
        searchTerm, setSearchTerm,
        selectedCard, setSelectedCard
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
