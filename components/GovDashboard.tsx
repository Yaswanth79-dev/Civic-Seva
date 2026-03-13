"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    FileText, 
    CheckCircle2, 
    Clock, 
    Filter, 
    Download, 
    MoreHorizontal,
    ArrowUpRight,
    Search
} from 'lucide-react';

const GovDashboard = () => {
    return (
        <section className="min-h-screen pt-24 pb-24 bg-slate-50">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Municipal Administration Panel</h1>
                        <p className="text-slate-500 font-medium">Real-time oversight for Hyderabad Civic Services.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl font-bold text-slate-600 border border-slate-200 swiggy-shadow transition-all hover:bg-slate-50">
                            <Download size={18} />
                            Export Data
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary rounded-xl font-bold text-white swiggy-shadow transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                            Apply Actions
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <StatCard label="Total Complaints" value="2,482" trend="+12% this week" icon={<FileText />} color="bg-primary" />
                    <StatCard label="Pending Review" value="842" trend="High priority: 124" icon={<Clock />} color="bg-amber-500" />
                    <StatCard label="Resolved" value="1,520" trend="+42 today" icon={<CheckCircle2 />} color="bg-green-500" />
                    <StatCard label="Active Citizens" value="12.8k" trend="Top 5% active" icon={<Users />} color="bg-blue-600" />
                </div>

                {/* Main Content Area: Map & Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Complaints Table (8 columns) */}
                    <div className="lg:col-span-8 bg-white rounded-[32px] swiggy-shadow-hover border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Complaint Management</h3>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Search cases..." 
                                        className="bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 ring-primary/20 outline-none"
                                    />
                                </div>
                                <button className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:text-primary transition-colors">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Case / Details</th>
                                        <th className="px-8 py-5">Department</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <IssueRow 
                                        id="#CIV-2041"
                                        title="Deep Pothole at Banjara Rd"
                                        date="2 hours ago"
                                        dept="Roads Dept"
                                        status="Pending"
                                        img="https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=40&w=100"
                                    />
                                    <IssueRow 
                                        id="#CIV-2039"
                                        title="Drainage Leak at Jubilee"
                                        date="5 hours ago"
                                        dept="Water Board"
                                        status="In Progress"
                                        img="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=40&w=100"
                                    />
                                    <IssueRow 
                                        id="#CIV-2038"
                                        title="Street Lights Off (Zone 4)"
                                        date="Yesterday"
                                        dept="Electrical"
                                        status="Pending"
                                        img="https://images.unsplash.com/photo-1445108849320-9118c7ea3b71?auto=format&fit=crop&q=40&w=100"
                                    />
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 text-center border-t border-slate-50">
                            <button className="text-primary font-bold text-sm hover:underline">View All 2,482 Logs</button>
                        </div>
                    </div>

                    {/* Department Performance (4 columns) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="bg-white rounded-[32px] p-8 swiggy-shadow border border-slate-100 flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">Department Load</h3>
                            <div className="space-y-6">
                                <DeptBar label="Road Construction" value={78} color="bg-primary" />
                                <DeptBar label="Water & Sanitation" value={45} color="bg-blue-400" />
                                <DeptBar label="Electricity Board" value={92} color="bg-amber-500" />
                                <DeptBar label="City Beautification" value={23} color="bg-green-500" />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[32px] p-8 swiggy-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 text-white transition-opacity group-hover:opacity-40">
                                <ArrowUpRight size={80} />
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">AI Insights</h3>
                            <p className="text-slate-400 text-sm mb-6 relative z-10">
                                Prediction: 15% increase in rain-related drainage issues expected in Zone 4 this weekend.
                            </p>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all border border-white/10 relative z-10">
                                Review AI Report
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const StatCard = ({ label, value, trend, icon, color }: any) => (
    <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white p-8 rounded-[32px] swiggy-shadow border border-slate-100 relative overflow-hidden group"
    >
        <div className={`absolute -right-4 -bottom-4 p-8 opacity-5 text-black`}>{icon}</div>
        <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/5`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{value}</p>
        <p className="text-xs font-bold text-slate-500">{trend}</p>
    </motion.div>
);

const IssueRow = ({ id, title, date, dept, status, img }: any) => (
    <tr className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
        <td className="px-8 py-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                    <img src={img} alt="issue" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-xs font-bold text-primary mb-0.5">{id}</p>
                    <p className="text-sm font-extrabold text-slate-900">{title}</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{date}</p>
                </div>
            </div>
        </td>
        <td className="px-8 py-6">
            <span className="text-sm font-bold text-slate-600">{dept}</span>
        </td>
        <td className="px-8 py-6">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest
                ${status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
            `}>
                {status}
            </span>
        </td>
        <td className="px-8 py-6">
            <button className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-primary hover:text-white transition-all">
                <MoreHorizontal size={18} />
            </button>
        </td>
    </tr>
);

const DeptBar = ({ label, value, color }: any) => (
    <div>
        <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-slate-600">{label}</span>
            <span className="text-slate-900">{value}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                className={`h-full ${color}`} 
            />
        </div>
    </div>
);

export default GovDashboard;
