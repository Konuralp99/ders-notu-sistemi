import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';

export default function CoursePage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-6">
                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                    <span>Ana Sayfaya Dön</span>
                </Link>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 text-blue-800 dark:text-blue-200 mb-8">
                <Info className="shrink-0 mt-0.5" size={20} />
                <p>Routing sistemi geliştirilme aşamasındadır. Şu an için ana sayfa üzerinden konu seçimi yapınız.</p>
            </div>

            <h2 className="text-2xl font-bold">Ders Detayı</h2>
            {/* Future: Load specific course content here based on ID */}
        </div>
    );
}
