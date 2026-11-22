import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'RIXON Private Limited | 3D Digital Studio',
  description: 'Explore RIXON services, selected concepts, company information and book your website in one immersive experience.',
};

const themeInitialization = `(function(){var theme='dark';try{var saved=window.localStorage.getItem('rixon-theme');if(saved==='dark'||saved==='light'){theme=saved;}else if(window.matchMedia('(prefers-color-scheme: light)').matches){theme='light';}}catch(error){theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=theme;})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="rixon-theme-initialization" strategy="beforeInteractive">
          {themeInitialization}
        </Script>
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
