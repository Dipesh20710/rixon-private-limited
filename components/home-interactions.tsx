'use client';

import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import {
  calculateProjectEstimate,
  formatPrice,
  getIncludedPages,
  PROJECT_ESTIMATE_EVENT,
  PROJECT_TYPES,
  ProjectEstimateDetails,
  ProjectType,
} from '@/lib/project-estimate';

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLogo() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="logo-plinth"
      animate={reduceMotion ? undefined : { y: [0, -10, 0], rotateY: [-13, -8, -13], rotateX: [7, 4, 7] }}
      transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="plinth-glow" />
      <Image
        src="/images/rixon-logo.png"
        alt="RIXON Private Limited official logo"
        width={620}
        height={420}
        sizes="(max-width: 600px) 67vw, 394px"
      />
    </motion.div>
  );
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let inViewport = true;
    let pageVisible = !document.hidden;
    const particles: { x: number; y: number; radius: number; speed: number; phase: number }[] = [];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const count = width < 600 ? 22 : 42;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.18 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
      draw(false);
    };

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        if (animate) {
          particle.y -= particle.speed;
          particle.phase += 0.01;
          particle.x += Math.sin(particle.phase) * 0.12;
          if (particle.y < -2) particle.y = height + 2;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(77, 169, 255, 0.52)';
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < 105) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(51, 142, 225, ${(1 - distance / 105) * 0.11})`;
            context.stroke();
          }
        }
      });
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = () => {
      frame = 0;
      if (reduceMotion || !inViewport || !pageVisible) return;
      draw(true);
      frame = window.requestAnimationFrame(tick);
    };

    const updateAnimation = () => {
      if (reduceMotion || !inViewport || !pageVisible) {
        stop();
      } else if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      updateAnimation();
    };

    resize();
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          inViewport = entry.isIntersecting;
          updateAnimation();
        });
    observer?.observe(canvas);
    document.addEventListener('visibilitychange', onVisibilityChange);
    updateAnimation();
    window.addEventListener('resize', resize);
    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

export function TiltCard({ children, className }: { children: ReactNode; className: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  function move(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      className={className}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.article>
  );
}

export function ConceptPreview({
  title,
  tag,
  description,
  number,
}: {
  title: string;
  tag: string;
  description: string;
  number: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <>
      <button className="concept-preview-button" type="button" onClick={() => setOpen(true)}>
        Explore this concept <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <div className="preview-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section className={`preview-dialog concept-${number}`} role="dialog" aria-modal="true" aria-labelledby={`preview-title-${number}`}>
            <button className="preview-close" type="button" onClick={() => setOpen(false)} aria-label="Close concept preview">×</button>
            <div className={`work-window work-${number}`}>
              <div className="window-bar"><span /><span /><span /><small>RIXON / CONCEPT 0{number}</small></div>
              <div className="window-art"><div className="art-line" /><div className="art-block" /><div className="art-dot" /></div>
            </div>
            <small className="eyebrow">{tag}</small>
            <h2 id={`preview-title-${number}`}>{title}</h2>
            <p>{description}</p>
            <p className="formnote">A visual direction for discussion, not a completed client project.</p>
            <a className="button" href="#booking" onClick={() => setOpen(false)}>Discuss a similar project ↗</a>
          </section>
        </div>
      )}
    </>
  );
}

export function CostEstimator() {
  const [type, setType] = useState<ProjectType>('Business website');
  const [pages, setPages] = useState(getIncludedPages('Business website'));
  const [integrations, setIntegrations] = useState(false);
  const [content, setContent] = useState(false);
  const { minimum, maximum, includedPages } = calculateProjectEstimate(type, pages, integrations, content);

  function carryEstimateToBooking() {
    const detail: ProjectEstimateDetails = {
      projectType: type,
      pages,
      integrations,
      contentSupport: content,
      minimum,
      maximum,
    };
    window.dispatchEvent(new CustomEvent(PROJECT_ESTIMATE_EVENT, { detail }));
  }

  return (
    <div className="estimator-card">
      <div className="estimator-controls">
        <div className="field">
          <label htmlFor="estimate-type">Website type</label>
          <select
            id="estimate-type"
            value={type}
            onChange={(event) => {
              const nextType = event.target.value as ProjectType;
              setType(nextType);
              setPages(getIncludedPages(nextType));
            }}
          >
            {PROJECT_TYPES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="estimate-pages">Approximate pages <strong>{pages}</strong></label>
          <input id="estimate-pages" type="range" min="1" max="12" value={pages} onChange={(event) => setPages(Number(event.target.value))} />
          <span className="formnote">Includes up to {includedPages} pages for this website type.</span>
        </div>
        <label className="check-option"><input type="checkbox" checked={integrations} onChange={(event) => setIntegrations(event.target.checked)} /> Booking or third-party integrations</label>
        <label className="check-option"><input type="checkbox" checked={content} onChange={(event) => setContent(event.target.checked)} /> Content and copywriting support</label>
      </div>
      <div className="estimate-result" aria-live="polite">
        <span className="eyebrow">INDICATIVE ESTIMATE · NOT A QUOTATION</span>
        <strong>{formatPrice(minimum)} – {formatPrice(maximum)}</strong>
        <p>
          Planning guidance only. Each page beyond the included count adjusts both estimate endpoints by 5%;
          integrations and content support each adjust them by 10%. These are disclosed scope factors, not separate fees.
          RIXON confirms the final scope and price before work begins.
        </p>
        <a className="button" href="#booking" onClick={carryEstimateToBooking}>Get a project-specific quote ↗</a>
      </div>
    </div>
  );
}

type TrackedProject = { reference: string; status: string; service: string; submittedAt: string };

const projectStatuses = ['New', 'In Review', 'Contacted', 'In Progress', 'Completed'];
const statusDetails: Record<string, string> = {
  New: 'Your enquiry has been received and is waiting for review.',
  'In Review': 'The RIXON team is reviewing your project details.',
  Contacted: 'RIXON has reached out using the contact details on your enquiry.',
  'In Progress': 'Your project is underway.',
  Completed: 'Your project has been marked complete.',
  Declined: 'This enquiry is closed. Contact RIXON if you need more information.',
};

export function ProjectTracker() {
  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState<TrackedProject | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setProject(null);
    try {
      const response = await fetch('/api/projects/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to find that project.');
      setProject(result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to check project status. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tracker-card">
      <form className="tracker-form" onSubmit={submit}>
        <p className="formnote">Enter the reference from your booking confirmation and the email address used for the enquiry.</p>
        <div className="field"><label htmlFor="track-reference">Project reference</label><input id="track-reference" value={reference} onChange={(event) => setReference(event.target.value.trimStart())} required maxLength={40} autoComplete="off" placeholder="RXN-123456-12" /></div>
        <div className="field"><label htmlFor="track-email">Booking email address</label><input id="track-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" /></div>
        {error && <p className="notice" role="alert">{error}</p>}
        <button className="button" type="submit" disabled={busy}>{busy ? 'Checking…' : 'Check project status →'}</button>
      </form>
      {project && (
        <div className="tracker-result" aria-live="polite">
          <span className="eyebrow">PROJECT {project.reference}</span>
          <h3>{project.status}</h3>
          <p>{statusDetails[project.status] || 'Your project status has been updated. Contact RIXON if you need more information.'}</p>
          <small>{project.service} · Enquiry received {new Date(project.submittedAt).toLocaleDateString()}</small>
          {project.status !== 'Declined' && (
            <ol className="status-steps">
              {projectStatuses.map((status) => {
                const current = projectStatuses.indexOf(project.status);
                const index = projectStatuses.indexOf(status);
                return <li className={index <= current ? 'complete' : ''} key={status}>{status}</li>;
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}

export function AnimatedMetric({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCount(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 850, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  return <div className="metric-item"><strong><span ref={ref}>{count}</span>{suffix}</strong><small>{label}</small></div>;
}

export function FAQList() {
  const items = [
    ['What does a website project with RIXON include?', 'Each project is scoped around your goals. It can include planning, visual design, responsive development, and agreed integrations. The exact deliverables are confirmed before work begins.'],
    ['How much does a website cost?', 'The calculator provides an indicative planning range, not a fixed quote. Final pricing depends on the requirements, content, integrations, and agreed scope.'],
    ['How do I book a project?', 'Use the project enquiry form on this page. RIXON will review your brief and contact you to discuss the next steps; submitting an enquiry does not require payment.'],
    ['How can I check my project status?', 'Use the Project Tracking section with the reference from your confirmation and the same email address used for your enquiry.'],
    ['Can I speak with someone directly?', 'Yes. Call +91 7305855341, email rixonprivatelimited@gmail.com, or use the WhatsApp contact button.'],
  ];

  return <div className="faq-list">{items.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>;
}
