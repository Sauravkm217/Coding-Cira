import type { Metadata } from 'next';
import './globals.css';
import AiTutor from '@/components/AiTutor';

export const metadata: Metadata = {
  title: 'Coding Cira — Sparks Curiosity',
  description: 'A modern, interactive, and gamified learning platform to make coding fun!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
          {children}
          <AiTutor />
        </main>
      </body>
    </html>
  );
}
