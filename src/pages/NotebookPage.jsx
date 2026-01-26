import React, { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Save, Plus, Trash2, Undo, Eraser, Pen, ChevronLeft, Image as ImageIcon, Redo } from 'lucide-react';

export default function NotebookPage() {
    const [view, setView] = useState('gallery'); // 'gallery' | 'editor'
    const [currentNote, setCurrentNote] = useState(null); // { id, title, data, createdAt }
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [eraseMode, setEraseMode] = useState(false);

    // Canvas ref
    const canvasRef = useRef(null);

    // Fetch all drawings using Dexie hook (reactive)
    const drawings = useLiveQuery(() => db.drawings.orderBy('createdAt').reverse().toArray());

    const handleNewNote = () => {
        setCurrentNote({ title: `Not ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, data: null });
        setView('editor');
    };

    const handleLoadNote = (note) => {
        setCurrentNote(note);
        setView('editor');
    };

    // Load data into canvas when editor opens and canvas is ready
    useEffect(() => {
        if (view === 'editor' && currentNote?.data && canvasRef.current) {
            // react-sketch-canvas loads paths asynchronously usually, but loadPaths returns a promise if needed
            // However, we need to wait for ref.
            // Timeout is a dirty hack but often needed if immediate loading fails
            setTimeout(() => {
                canvasRef.current?.loadPaths(currentNote.data);
            }, 100);
        }
    }, [view, currentNote]);

    const handleSave = async () => {
        if (!canvasRef.current) return;

        // Export paths (lightweight JSON)
        const paths = await canvasRef.current.exportPaths();
        const timestamp = Date.now();

        if (currentNote.id) {
            // Update existing
            await db.drawings.update(currentNote.id, {
                data: paths,
                // optional: could also exportImage for thumbnail
            });
        } else {
            // Create new
            const id = await db.drawings.add({
                title: currentNote.title,
                data: paths,
                createdAt: timestamp
            });
            setCurrentNote({ ...currentNote, id });
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (confirm('Bu notu silmek istediğine emin misin?')) {
            await db.drawings.delete(id);
        }
    };

    const toggleEraser = () => {
        setEraseMode(!eraseMode);
        // React Sketch Canvas uses eraseMode prop handling
        canvasRef.current?.eraseMode(!eraseMode);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 pb-24 md:p-8">
            {view === 'gallery' ? (
                <div className="max-w-4xl mx-auto animate-in fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Pen className="text-emerald-500" /> Dijital Defter
                        </h1>
                        <button
                            onClick={handleNewNote}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all font-medium"
                        >
                            <Plus size={20} /> Yeni Not
                        </button>
                    </div>

                    {!drawings || drawings.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <Pen size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Henüz not yok</h3>
                            <p className="text-slate-500 dark:text-slate-400">S-Pen'ini kap ve çizmeye başla!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {drawings.map(note => (
                                <div
                                    key={note.id}
                                    onClick={() => handleLoadNote(note)}
                                    className="aspect-[4/5] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all group relative"
                                >
                                    <div className="h-full flex flex-col">
                                        <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                                            <ImageIcon className="text-slate-300 dark:text-slate-700" size={32} />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">{note.title}</h4>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(e, note.id)}
                                        className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                // EDITOR VIEW
                <div className="fixed inset-0 bg-white dark:bg-slate-950 flex flex-col z-50 animate-in slide-in-from-bottom-5">
                    {/* Toolbar */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                        <button onClick={() => setView('gallery')} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                            <ChevronLeft />
                        </button>

                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            <button
                                onClick={() => { setStrokeColor('#000000'); setStrokeWidth(4); setEraseMode(false); canvasRef.current?.eraseMode(false); }}
                                className={`p-2 rounded-md ${!eraseMode && strokeColor === '#000000' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                            >
                                <Pen size={20} className="text-slate-900 dark:text-white" />
                            </button>
                            <button
                                onClick={() => { setStrokeColor('#ef4444'); setStrokeWidth(4); setEraseMode(false); canvasRef.current?.eraseMode(false); }}
                                className={`w-9 h-9 rounded-md flex items-center justify-center ${!eraseMode && strokeColor === '#ef4444' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            </button>
                            <button
                                onClick={() => { setStrokeColor('#3b82f6'); setStrokeWidth(4); setEraseMode(false); canvasRef.current?.eraseMode(false); }}
                                className={`w-9 h-9 rounded-md flex items-center justify-center ${!eraseMode && strokeColor === '#3b82f6' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            </button>
                            <button
                                onClick={toggleEraser}
                                className={`p-2 rounded-md ${eraseMode ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-500' : 'text-slate-500'}`}
                            >
                                <Eraser size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => canvasRef.current?.undo()} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <Undo size={20} />
                            </button>
                            <button onClick={() => canvasRef.current?.redo()} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <Redo size={20} />
                            </button>
                            <button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold">
                                <Save size={18} /> Kaydet
                            </button>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    {/* Canvas Area */}
                    <div
                        className="flex-1 overflow-hidden relative cursor-crosshair touch-none bg-white"
                        onPointerDownCapture={(e) => {
                            if (e.pointerType === 'touch') {
                                e.stopPropagation();
                                e.preventDefault();
                                return;
                            }
                            const isEraser = e.pointerType === 'eraser' || e.buttons === 32 || (e.buttons & 2) === 2;
                            if (isEraser) {
                                setEraseMode(true);
                                canvasRef.current?.eraseMode(true);
                            } else if (eraseMode) {
                                setEraseMode(false);
                                canvasRef.current?.eraseMode(false);
                            }
                        }}
                        onPointerMove={(e) => {
                            if (e.pointerType === 'touch') return;
                            const isEraser = e.pointerType === 'eraser' || e.buttons === 32 || (e.buttons & 2) === 2;
                            if (isEraser && !eraseMode) {
                                setEraseMode(true);
                                canvasRef.current?.eraseMode(true);
                            } else if (!isEraser && eraseMode) {
                                setEraseMode(false);
                                canvasRef.current?.eraseMode(false);
                            }
                        }}
                    >
                        <ReactSketchCanvas
                            ref={canvasRef}
                            style={{
                                border: 'none',
                                width: '100%',
                                height: '100%'
                            }}
                            strokeWidth={strokeWidth}
                            strokeColor={strokeColor}
                            canvasColor="transparent"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
