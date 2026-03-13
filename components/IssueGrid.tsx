"use client";

import React from 'react';
import IssueCard from './IssueCard';
import { motion } from 'framer-motion';

const DUMMY_ISSUES = [
  {
    id: '1',
    title: 'Major Pothole near Hitech City',
    location: 'Madhapur',
    status: 'Pending' as const,
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=80&w=600',
    description: 'Deep pothole causing traffic congestion near Cyber Towers. Multiple bikers reported near misses.'
  },
  {
    id: '2',
    title: 'Broken Divider on ORR',
    location: 'Gachibowli',
    status: 'In Progress' as const,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', // Note: Using random high quality city photos since I don't have real pothole assets handy
    description: 'Dangerous broken divider segment posing collision risk for high speed vehicles.'
  },
  {
    id: '3',
    title: 'Drainage Overflow after Rains',
    location: 'Banjara Hills',
    status: 'Resolved' as const,
    image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=600',
    description: 'Severe water logging and drainage overflow reported at Road No. 12.'
  },
  {
    id: '4',
    title: 'Streetlight Failure Zone',
    location: 'Jubilee Hills',
    status: 'Pending' as const,
    image: 'https://images.unsplash.com/photo-1445108849320-9118c7ea3b71?auto=format&fit=crop&q=80&w=600',
    description: 'Entire block of streetlights are inactive since 3 days. Safety concerns for pedestrians.'
  }
];

const IssueGrid = () => {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl font-extrabold text-slate-900 mb-2"
            >
                Recent Issues
            </motion.h2>
            <p className="text-slate-500 font-medium">Real-time reports from citizens across Hyderabad.</p>
          </div>
          <button className="text-primary font-bold hover:underline">View All Issues</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DUMMY_ISSUES.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <IssueCard {...issue} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IssueGrid;
