import Image from 'next/image';

export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-label="Loading RIXON" aria-live="polite">
      <div className="loader-scene" aria-hidden="true">
        <span className="loader-orbit loader-orbit-one" />
        <span className="loader-orbit loader-orbit-two" />
        <div className="loader-logo">
          <Image src="/images/rixon-logo.png" alt="" width={180} height={122} priority />
        </div>
      </div>
      <svg className="loader-spinner" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="loader-spinner-track" cx="12" cy="12" r="9" />
        <circle className="loader-spinner-active" cx="12" cy="12" r="9" />
      </svg>
      <span className="loader-label">Preparing your experience</span>
    </div>
  );
}
