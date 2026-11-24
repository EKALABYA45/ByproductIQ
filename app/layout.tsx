import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { RecycledCursor } from '@/components/cursor/RecycledCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.scss';

const bricolage = localFont({
  src: '../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
  weight: '200 800',
  variable: '--font-display',
  display: 'swap',
});

const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
});

const spaceMono = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ByproductIQ — Every byproduct has a possibility.',
  description:
    'Two-sided waste-to-product platform with an AI suggestion engine. Discover. Create. Evaluate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="public"
      data-color-mode="light"
      className={`${bricolage.variable} ${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider>
          <SmoothScrollProvider>
            <div className="film-grain" aria-hidden="true" />
            <RecycledCursor />
            <Navbar />
            <main id="main-content">
              <MotionProvider>{children}</MotionProvider>
            </main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
