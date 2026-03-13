"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, Mic, MapPin, Send, AlertTriangle } from 'lucide-react';

const ReportForm = () => {
    const [step, setStep] = useState(1);
    const [dragActive, setDragActive] = useState(false);

    return (
        <section className="min-h-screen pt-32 pb-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Report an Issue</h1>
                    <p className="text-slate-500 font-medium">Your data helps prioritize community repairs.</p>
                </div>

                <motion.div 
                    layout
                    className="bg-white rounded-[40px] swiggy-shadow-hover p-8 md:p-12 border border-slate-100"
                >
                    <form className="space-y-8">
                        {/* Drag & Drop Image */}
                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Evidence Photo
                            </label>
                            <div 
                                className={`relative group h-64 border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden
                                    ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'}
                                `}
                                onDragOver={() => setDragActive(true)}
                                onDragLeave={() => setDragActive(false)}
                            >
                                <div className="bg-slate-50 p-4 rounded-full text-slate-400 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                    <ImagePlus size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-slate-700">Drag & Drop Image</p>
                                    <p className="text-sm text-slate-400">or click to browse files</p>
                                </div>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Issue Category" icon={<AlertTriangle size={18} />}>
                                <select className="w-full bg-transparent font-bold text-slate-900 outline-none appearance-none cursor-pointer">
                                    <option>Select Category</option>
                                    <option>Pothole</option>
                                    <option>Street Light</option>
                                    <option>Water Leakage</option>
                                    <option>Drainage</option>
                                    <option>Garbage</option>
                                </select>
                            </InputField>

                            <InputField label="Location (Area)" icon={<MapPin size={18} />}>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Jubilee Hills" 
                                    className="w-full bg-transparent font-bold text-slate-900 placeholder:text-slate-300 outline-none"
                                />
                            </InputField>
                        </div>

                        {/* Description & Voice */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Description
                            </label>
                            <textarea 
                                rows={4}
                                placeholder="Tell us more about the situation..."
                                className="w-full bg-slate-50 rounded-3xl p-6 font-medium text-slate-700 outline-none focus:ring-2 ring-primary/20 transition-all border border-slate-100"
                            />
                            <button 
                                type="button"
                                className="absolute bottom-6 right-6 p-3 bg-white swiggy-shadow rounded-2xl text-primary hover:scale-110 active:scale-95 transition-all"
                                title="Use Voice Input"
                            >
                                <Mic size={24} />
                            </button>
                        </div>

                        <button className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-xl swiggy-shadow hover:swiggy-shadow-hover transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                            <Send size={24} />
                            <span>Submit Complaint</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

const InputField = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            {icon}
            {label}
        </label>
        {children}
    </div>
);

export default ReportForm;
