"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-white">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary to-blue-400" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Report Civic Issues.<br />
              <span className="text-primary italic">Improve Your City.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload photos of potholes, drainage problems, broken roads and help authorities resolve them faster. 
            Join thousands of citizens making Hyderabad a smarter city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="/report" 
              className="group flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg swiggy-shadow hover:swiggy-shadow-hover transition-all hover:-translate-y-1 active:scale-95"
            >
              <PlusCircle size={22} />
              <span>Report Issue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Illustration Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative mx-auto max-w-4xl"
        >
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756edd811?auto=format&fit=crop&q=80&w=1200" 
              alt="City Infrastructure" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>
          
          {/* Floating Stats Card Like Component */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl swiggy-shadow-hover border border-slate-100 animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500">Resolved Today</p>
                <p className="text-2xl font-extrabold text-slate-900">124 +</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Add Lucide ShieldCheck locally since I missed it in import earlier or just use build-in
import { ShieldCheck } from 'lucide-react';

export default Hero;
