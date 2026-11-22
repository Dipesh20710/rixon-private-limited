import Link from 'next/link';

export default async function Confirmation({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;

  return (
    <section className="pagehead" style={{ maxWidth: 900 }}>
      <div className="success">
        <div className="eyebrow">RIXON / ENQUIRY RECEIVED</div>
        <h1 style={{ fontSize: 'clamp(34px, 8vw, 48px)' }}>
          Thank you. <span className="blue">We&apos;ve got your brief.</span>
        </h1>
        <p>
          Your project enquiry has been saved.{' '}
          {ref ? <>Your reference is <strong>{ref}</strong>.</> : 'Your reference number is shown on the booking form.'}
          {' '}Our team will review the details and contact you using the information you provided.
        </p>
        <p className="formnote">This is an enquiry confirmation, not a confirmed project booking or payment receipt.</p>
        <div className="actions">
          <a
            className="button"
            href={`https://wa.me/917305855341?text=${encodeURIComponent(`Hello RIXON, I submitted project enquiry ${ref || ''}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on WhatsApp ↗
          </a>
          <a className="button secondary" href="mailto:rixonprivatelimited@gmail.com">Email RIXON</a>
          <Link className="button secondary" href="/">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
