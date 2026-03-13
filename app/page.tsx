"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IssueGrid from "@/components/IssueGrid";
import MapSection from "@/components/MapSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary/30">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        
        <IssueGrid />

        <MapSection />

        {/* Call to Action Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                    Ready to make a difference?
                </h2>
                <p className="text-blue-100 text-xl mb-12 font-medium">
                    Your single report can trigger immediate action from the authorities. 
                    Be the eyes of your community.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="bg-white text-primary px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
                        Report Your First Issue
                    </button>
                    <button className="bg-primary-dark border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-white/10 transition-colors shadow-lg">
                        View City Map
                    </button>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm font-bold tracking-widest uppercase mb-4 opacity-50">
                    Civic Seva 2.0 • Hyderabad Smart City Initiative
                </p>
                <p>© 2026 Developed for Citizen Empowerment.</p>
            </div>
        </footer>
      </motion.div>
    </main>
  );
}
