"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Info } from 'lucide-react';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Note: Actual Google Maps implementation would go here
  // For now, providing a high-quality stylized visual placeholder 
  // with markers to demonstrate the UI intent.

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 text-primary px-4 py-1.5 rounded-full inline-flex items-center gap-2 font-bold text-sm mb-4"
            >
              <MapIcon size={16} />
              <span>Interactive City View</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Visualize Public Issues <br />In Real-Time
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Explore the interactive map of Hyderabad to see reported issues, their categories, 
              and their current resolution status. Transparency is the key to a better city.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <StatBox label="Active Markers" value="1,280" />
            <StatBox label="Recent Fixes" value="452" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden swiggy-shadow-hover border border-slate-200 aspect-video md:aspect-[21/9] bg-slate-100"
        >
          {/* Stylized Simulated Map Map */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-20" />
          
          {/* Animated Overlay Markers */}
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <div className="w-full h-full relative border-2 border-primary/20 rounded-2xl bg-white/40 backdrop-blur-sm shadow-inner overflow-hidden">
                {/* Simulated Marker 1 */}
                <Marker x="20%" y="30%" color="bg-red-500" label="Pothole" />
                <Marker x="50%" y="45%" color="bg-amber-500" label="Street Light" />
                <Marker x="75%" y="20%" color="bg-primary" label="Drainage" />
                <Marker x="40%" y="70%" color="bg-green-500" label="Resolved" />
                
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl swiggy-shadow border border-slate-100 max-w-xs">
                    <div className="flex gap-3">
                        <Info size={20} className="text-primary" />
                        <p className="text-sm font-medium text-slate-700">
                            Markers are color-coded by issue category. Click them to view details.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marker = ({ x, y, color, label }: { x: string, y: string, color: string, label: string }) => (
  <motion.div 
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    style={{ left: x, top: y }}
    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
  >
    <div className={`w-4 h-4 rounded-full ${color} shadow-lg shadow-black/20 animate-pulse relative z-10`} />
    <div className={`absolute left-1/2 -top-1 -translate-x-1/2 -translate-y-full px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
        {label}
    </div>
  </motion.div>
);

const StatBox = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900">{value}</p>
  </div>
);

export default MapSection;
