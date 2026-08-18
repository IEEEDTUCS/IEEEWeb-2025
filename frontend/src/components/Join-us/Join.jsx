'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import config from './JoinUs.json';
import WhatsAppButton from '@/utils/WhatsAppButton';

const initialForm = config.sections.reduce((form, section) => {
  section.fields.forEach((field) => {
    form[field.id] = '';
  });
  return form;
}, {});

export default function JoinUs() {
  const [form, setForm] = useState(initialForm);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const section = config.sections[currentSection];
  const isLast = currentSection === config.sections.length - 1;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () =>
    section.fields.every(
      (field) => !field.required || form[field.id]?.trim()
    );

  const next = () => {
    if (!validate()) {
      alert('Please complete all required fields.');
      return;
    }

    setCurrentSection((prev) => prev + 1);
  };

  const back = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert('Please complete all required fields.');
      return;
    }

    setLoading(true);

    const data = new URLSearchParams();

    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        data.append(field.entryId, form[field.id] || '');
      });
    });

    try {
      await fetch(config.googleForm.url, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });

      setSubmitted(true);
      setForm(initialForm);
      setCurrentSection(0);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111827] text-white pt-24">
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-24">

        <motion.h1
          className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {config.page.title}
        </motion.h1>

        <motion.form
          onSubmit={submit}
          className="bg-white text-gray-900 md:mx-[10%] p-6 md:p-12 rounded-md shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {section.title && (
            <h2 className="text-2xl font-semibold mb-8">
              {section.title}
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                value={form[field.id] || ''}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            {currentSection > 0 ? (
              <button
                type="button"
                onClick={back}
                className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {isLast ? (
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="px-7 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
              >
                Next →
              </button>
            )}
          </div>
        </motion.form>

        {/* WhatsApp alternative */}
        <div className="md:mx-[10%] mt-6">
          <p className="text-center text-white/50 text-sm mb-3">— or reach us directly —</p>
          <WhatsAppButton />
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white text-gray-900 rounded-md p-8 text-center max-w-sm shadow-2xl">
            <h2 className="text-2xl font-semibold">
              Thank You!
            </h2>

            <p className="mt-3 text-gray-600">
              Your response has been submitted successfully.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ field, value, onChange }) {
  const inputClass =
    'w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

  const fullWidth = field.fullWidth || field.type === 'radio' || field.type === 'textarea';

  if (field.type === 'radio') {
    return (
      <div className={fullWidth ? 'md:col-span-2' : ''}>
        <p className="text-sm font-semibold mb-4">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </p>

        <div className="space-y-3">
          {field.options?.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name={field.id}
                value={option}
                checked={value === option}
                onChange={onChange}
                required={field.required}
                className="h-4 w-4 accent-blue-500"
              />

              <span className="text-sm">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <label className={fullWidth ? 'md:col-span-2' : ''}>
        <span className="block text-sm font-semibold mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>

        <select
          name={field.id}
          value={value}
          onChange={onChange}
          required={field.required}
          className={inputClass}
        >
          <option value="">Select {field.label}</option>

          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="md:col-span-2">
        <span className="block text-sm font-semibold mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>

        <textarea
          name={field.id}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={5}
          className={inputClass}
        />
      </label>
    );
  }

  return (
    <label>
      <span className="block text-sm font-semibold mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </span>

      <input
        name={field.id}
        type={field.type}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
        className={inputClass}
      />
    </label>
  );
}