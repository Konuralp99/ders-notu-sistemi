import React from 'react';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import ExamDashboard from '../components/ExamDashboard';
import { useApp } from '../context/AppContext';

export default function MainLayout({ children }) {
    const {
        isSidebarOpen, setIsSidebarOpen,
        isZenMode, setIsZenMode,
        isRecallMode, setIsRecallMode,
        showExamDashboard, setShowExamDashboard,
        selectedCourseId, setSelectedCourseId,
        selectedCard, setSelectedCard,
        searchTerm, setSearchTerm,
        isDarkMode, setIsDarkMode,
        activeCourse, filteredCards
    } = useApp();

    return (
        <div className={`flex h-screen bg-background dark:bg-slate-950 font-worksans text-slate-900 dark:text-slate-100 overflow-hidden ${isZenMode ? 'justify-center' : ''}`}>

            {/* Dashboard Overlay */}
            {showExamDashboard && (
                <ExamDashboard
                    content={activeCourse.content}
                    onClose={() => setShowExamDashboard(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                selectedCourseId={selectedCourseId}
                setSelectedCourseId={setSelectedCourseId} // Direct state update wrapper handled in Sidebar or here? AppContext has logic.
                // Let's pass the wrapper from logic if needed, but context handles it. 
                // Sidebar expects setters. Let's pass them directly.
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                filteredCards={filteredCards}
                isZenMode={isZenMode}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    isZenMode={isZenMode}
                    setIsZenMode={setIsZenMode}
                    isRecallMode={isRecallMode}
                    setIsRecallMode={setIsRecallMode}
                    setShowExamDashboard={setShowExamDashboard}
                    selectedCard={selectedCard}
                />

                <div className={`flex-1 overflow-y-auto ${isZenMode ? 'flex justify-center' : ''}`}>
                    {children}
                </div>
            </main>
        </div>
    );
}
