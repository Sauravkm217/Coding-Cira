import type { Metadata } from 'next';
import './globals.css';
import AiTutor from '@/components/AiTutor';
import Navbar from '@/components/Navbar';
import { GamificationProvider } from '@/components/GamificationContext';

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
        <GamificationProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: '80px' }}>
            {children}
            <AiTutor />
          </main>
        </GamificationProvider>
      </body>
    </html>
  );
}
