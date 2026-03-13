"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Home, PlusCircle, LayoutDashboard, ShieldCheck, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full glass shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Civic Seva
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/" icon={<Home size={18} />} label="Home" />
            <NavLink href="/report" icon={<PlusCircle size={18} />} label="Report Issue" active />
            <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavLink href="/government" icon={<ShieldCheck size={18} />} label="Gov Panel" />
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-1.5 font-medium transition-all hover:text-primary ${active ? 'text-primary' : 'text-secondary'}`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <motion.div 
        layoutId="nav-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
      />
    )}
  </Link>
);

export default Navbar;
