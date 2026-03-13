"use client";

import Navbar from "@/components/Navbar";
import GovDashboard from "@/components/GovDashboard";

export default function GovernmentPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <GovDashboard />
    </main>
  );
}
