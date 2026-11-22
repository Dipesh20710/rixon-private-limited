'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const admin = path.startsWith('/admin');
  const home = path === '/';

  return (
    <>
      {!admin && (
        <header className="topbar">
          <Link href="/#home" className="brand">
            <Image
              src="/images/rixon-logo.png"
              alt="RIXON Private Limited"
              width={150}
              height={100}
              sizes="(max-width: 760px) 44px, 56px"
              priority={home}
            />
            <span>RIXON <small>PRIVATE LIMITED</small></span>
          </Link>
          <nav aria-label="Primary">
            <a href={home ? '#services' : '/#services'}>Services</a>
            <a href={home ? '#work' : '/#work'}>Work</a>
            <a href={home ? '#about' : '/#about'}>About</a>
            <a href={home ? '#track' : '/#track'}>Track</a>
            <a href={home ? '#contact' : '/#contact'}>Contact</a>
            <ThemeToggle />
          </nav>
          <a className="button small" href={home ? '#booking' : '/#booking'}>Let&apos;s Talk <b>↗</b></a>
        </header>
      )}
      {admin && (
        <header className="topbar adminbar">
          <Link href="/" className="brand">
            <Image src="/images/rixon-logo.png" alt="RIXON" width={92} height={62} sizes="(max-width: 760px) 44px, 56px" />
            <span>RIXON <small>CONTROL ROOM</small></span>
          </Link>
          <Link href="/" className="muted">← View website</Link>
        </header>
      )}
      <main>{children}</main>
      {!admin && (
        <>
          <footer className="footer">
            <div>
              <div className="brand footerbrand">
                <Image src="/images/rixon-logo.png" alt="RIXON Private Limited" width={126} height={84} sizes="50px" />
                <span>RIXON <small>PRIVATE LIMITED</small></span>
              </div>
              <p>Digital experiences, engineered with intention.</p>
            </div>
            <div>
              <strong>Explore</strong>
              <a href="/#services">Services</a>
              <a href="/#work">Work</a>
              <a href="/#about">About</a>
              <a href="/#estimate">Website estimate</a>
              <a href="/#track">Track a project</a>
              <a href="/#booking">Book a website</a>
              <Link href="/admin/login">Admin</Link>
            </div>
            <div>
              <strong>Contact</strong>
              <a href="tel:+917305855341">+91 7305855341</a>
              <a href="mailto:rixonprivatelimited@gmail.com">rixonprivatelimited@gmail.com</a>
              <a href="https://wa.me/917305855341" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
            <div className="copyright">© {new Date().getFullYear()} RIXON PRIVATE LIMITED. All rights reserved.</div>
          </footer>
          <a
            className="whatsapp"
            href="https://wa.me/917305855341?text=Hello%20RIXON%2C%20I%20am%20interested%20in%20a%20website."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with RIXON on WhatsApp"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M5.2 4.5a2 2 0 0 1 2.1-.7l2.2.6a2 2 0 0 1 1.4 1.7l.2 1.8a2 2 0 0 1-.6 1.6l-1.2 1.2a14 14 0 0 0 5.8 5.8l1.2-1.2a2 2 0 0 1 1.6-.6l1.8.2a2 2 0 0 1 1.7 1.4l.6 2.2a2 2 0 0 1-.7 2.1l-1 .9c-.8.7-1.8 1-2.8.8A21.2 21.2 0 0 1 4.5 8.4c-.2-1 .1-2 .8-2.8l.9-1Z" />
            </svg>
          </a>
        </>
      )}
    </>
  );
}
