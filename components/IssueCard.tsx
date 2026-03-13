"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface IssueCardProps {
  id: string;
  title: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  image: string;
  description: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ title, location, status, image, description }) => {
  const statusColors = {
    'Pending': 'bg-amber-100 text-amber-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Resolved': 'bg-green-100 text-green-700'
  };

  return (
    <motion.div
      whileHover={{ scale: 0.98, y: -5 }}
      whileTap={{ scale: 0.96 }}
      className="bg-white rounded-[24px] overflow-hidden swiggy-shadow hover:swiggy-shadow-hover transition-all border border-slate-100 group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 p-3 rounded-full text-slate-900 translate-y-4 group-hover:translate-y-0 transition-transform">
                <ArrowUpRight size={24} />
            </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
            {title}
            </h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-3">
          <MapPin size={16} className="text-primary/70" />
          <span>{location}, Hyderabad</span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <span>View Details</span>
            <div className="w-6 h-[2px] bg-primary rounded-full group-hover:w-10 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCard;
