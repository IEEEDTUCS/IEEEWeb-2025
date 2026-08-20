'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '@/utils/WhatsAppButton';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfgGoyFCC737i6_9kHCwuSo5ZVPND-Os6Oqbl2p_zh41WdyjA/viewform?embedded=true';

export default function JoinUs() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white pt-24">
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-24">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-5">
            <img src="/images/logo.png" alt="IEEE DTU" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            Membership
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Join IEEE DTU
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            DTU's oldest & largest engineering society since 1983.
            Fill the form below or reach us directly on WhatsApp.
          </p>
        </motion.div>

        {/* Form iframe */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid rgba(37,99,235,0.2)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* iframe header bar */}
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
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(37,99,235,0.18)', color: '#93c5fd' }}
            >
              Open
            </span>
          </div>

          {/* loader */}
          <div className="relative" style={{ background: '#fff' }}>
            {!loaded && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: '#fff', minHeight: 520, zIndex: 1 }}
              >
                <div
                  className="w-9 h-9 rounded-full border-[3px] animate-spin"
                  style={{ borderColor: '#dbeafe', borderTopColor: '#2563eb' }}
                />
                <p className="text-gray-400 text-sm">Loading form…</p>
              </div>
            )}
            <iframe
              src={FORM_URL}
              title="IEEE DTU Membership Form"
              width="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              onLoad={() => setLoaded(true)}
              style={{
                display: 'block',
                minHeight: 680,
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-white/40 text-sm mb-3">— or reach us directly —</p>
          <WhatsAppButton />
        </motion.div>

      </div>
    </main>
  );
}
