'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '@/utils/WhatsAppButton';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfgGoyFCC737i6_9kHCwuSo5ZVPND-Os6Oqbl2p_zh41WdyjA/viewform?embedded=true';

export default function JoinUs() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white pt-24">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-24">

        {/* Form iframe — no loader, show immediately */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid rgba(37,99,235,0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* header bar */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-0.5">
                Membership Form
              </p>
              <p className="text-white text-sm font-semibold">IEEE DTU Student Branch</p>
            </div>
            <img src="/images/logo.png" alt="IEEE DTU" className="h-8 w-auto object-contain" />
          </div>

          {/* iframe — always visible, browser handles loading */}
          <iframe
            src={FORM_URL}
            title="IEEE DTU Membership Form"
            width="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            style={{ display: 'block', minHeight: 700, background: '#fff' }}
          />
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-white/40 text-sm mb-3">— or reach us directly —</p>
          <WhatsAppButton />
        </motion.div>

      </div>
    </main>
  );
}
