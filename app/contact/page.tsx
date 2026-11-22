import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <section className="pagehead">
        <div className="eyebrow">Contact the studio</div>
        <h1>Tell us what you&apos;re <span className="blue">working on.</span></h1>
        <p>Have a question or an early idea? Reach out directly, or send a project enquiry and we&apos;ll take it from there.</p>
      </section>
      <section className="section">
        <div className="grid">
          <article className="card">
            <div className="icon">☎</div>
            <h3>Call us</h3>
            <p>+91 7305855341</p>
            <a className="arrow" href="tel:+917305855341">Call RIXON ↗</a>
          </article>
          <article className="card">
            <div className="icon">✉</div>
            <h3>Email us</h3>
            <p>rixonprivatelimited@gmail.com</p>
            <a className="arrow" href="mailto:rixonprivatelimited@gmail.com">Send an email ↗</a>
          </article>
          <article className="card">
            <div className="icon">◉</div>
            <h3>WhatsApp</h3>
            <p>Start a direct conversation about your project.</p>
            <a className="arrow" href="https://wa.me/917305855341" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          </article>
        </div>
        <div className="actions"><Link className="button" href="/book">Book a website ↗</Link></div>
      </section>
    </>
  );
}
