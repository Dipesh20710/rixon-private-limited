'use client';

import { useEffect, useState } from 'react';
import {
  formatPrice,
  PROJECT_ESTIMATE_EVENT,
  PROJECT_TYPES,
  ProjectEstimateDetails,
} from '@/lib/project-estimate';

const contactFields = [
  ['name', 'Your name', 'text', true],
  ['email', 'Email address', 'email', true],
  ['phone', 'Phone / WhatsApp number', 'tel', true],
  ['business', 'Business / brand name', 'text', false],
] as const;

export function BookingForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [budget, setBudget] = useState('');
  const [brief, setBrief] = useState('');

  useEffect(() => {
    const applyEstimate = (event: Event) => {
      const { detail } = event as CustomEvent<ProjectEstimateDetails>;
      const estimateRange = `Indicative estimate: ${formatPrice(detail.minimum)} – ${formatPrice(detail.maximum)}`;
      const plannerDetails = [
        'Project Planner selections:',
        `Website type: ${detail.projectType}`,
        `Approximate pages: ${detail.pages}`,
        `Booking or third-party integrations: ${detail.integrations ? 'Yes' : 'No'}`,
        `Content and copywriting support: ${detail.contentSupport ? 'Yes' : 'No'}`,
        estimateRange,
      ].join('\n');

      setWebsiteType(detail.projectType);
      setBudget(estimateRange);
      setBrief((current) => {
        const marker = 'Project Planner selections:';
        const markerIndex = current.indexOf(marker);
        const existingBrief = markerIndex >= 0
          ? current.slice(0, markerIndex).trim()
          : current.trim();
        return [existingBrief, plannerDetails].filter(Boolean).join('\n\n');
      });
    };

    window.addEventListener(PROJECT_ESTIMATE_EVENT, applyEstimate);
    return () => window.removeEventListener(PROJECT_ESTIMATE_EVENT, applyEstimate);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not submit your request.');
      setReference(result.reference);
      form.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div className="success" role="status">
        <span className="eyebrow">Request received</span>
        <h2>Thank you. Let&apos;s build something great.</h2>
        <p>Your reference number is <strong>{reference}</strong>. RIXON will review your requirements and contact you using the details provided.</p>
        <p className="formnote">You can also reach us directly through WhatsApp or email.</p>
        <div className="actions">
          <a
            className="button"
            href={`https://wa.me/917305855341?text=${encodeURIComponent(`Hello RIXON, I submitted project enquiry ${reference}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue on WhatsApp ↗
          </a>
          <a className="button secondary" href="mailto:rixonprivatelimited@gmail.com">Email RIXON</a>
        </div>
      </div>
    );
  }

  return (
    <form className="formcard" onSubmit={submit}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="formgrid">
        {contactFields.map(([name, label, type, required]) => (
          <div className="field" key={name}>
            <label htmlFor={name}>{label}{required ? ' *' : ''}</label>
            <input id={name} name={name} type={type} required={required} maxLength={120} />
          </div>
        ))}
        <div className="field">
          <label htmlFor="websiteType">What do you need? *</label>
          <select id="websiteType" name="websiteType" required value={websiteType} onChange={(event) => setWebsiteType(event.target.value)}>
            <option value="" disabled>Select website type</option>
            {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
            <option>Custom web application</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="style">Preferred design style</label>
          <select id="style" name="style" defaultValue="Open to suggestions">
            <option>Open to suggestions</option>
            <option>Modern &amp; minimal</option>
            <option>Premium &amp; luxury</option>
            <option>Bold &amp; creative</option>
            <option>Corporate</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">Estimated budget *</label>
          <select id="budget" name="budget" required value={budget} onChange={(event) => setBudget(event.target.value)}>
            <option value="" disabled>Select a range</option>
            {budget.startsWith('Indicative estimate:')
              ? <option value={budget}>Project Planner · {budget}</option>
              : null}
            <option>Below ₹5,000</option>
            <option>₹5,000 – ₹10,000</option>
            <option>₹10,000 – ₹25,000</option>
            <option>₹25,000 – ₹50,000</option>
            <option>₹50,000+</option>
            <option>Need guidance</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeline">Expected timeline</label>
          <select id="timeline" name="timeline" defaultValue="Flexible">
            <option>Urgent (1–2 weeks)</option>
            <option>2–4 weeks</option>
            <option>1–2 months</option>
            <option>Flexible</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="brief">Tell us about your project *</label>
          <textarea
            id="brief"
            name="brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            required
            minLength={15}
            maxLength={3000}
            placeholder="What does your business do? What should the website help you achieve? Include any features you need."
          />
        </div>
      </div>
      {error && <p className="notice" role="alert">{error}</p>}
      <p className="formnote">By submitting, you agree that RIXON may contact you about this enquiry. Please do not include passwords or sensitive information.</p>
      <button className="button" disabled={busy}>{busy ? 'Submitting…' : 'Submit project enquiry →'}</button>
    </form>
  );
}
