'use client';

import '../styles/globals.css';
import localFont from 'next/font/local';
import { ReactQueryProvider } from './ReactQueryProvider';
import { Toaster } from '@/src/shared/ui/toaster';
import React from 'react';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // React.useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:8080/ws'); // Spring Boot WebSocket 서버 주소

  //   socket.onopen = () => {
  //     console.log('Connected to WebSocket server');
  //   };

  //   socket.onmessage = event => {
  //     console.log(event.data);
  //   };

  //   socket.onerror = error => {
  //     console.error('WebSocket Error:', error);
  //   };

  //   socket.onclose = () => {
  //     console.log('WebSocket connection closed');
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`min-w-[320px] h-screen max-w-[780px] ${pretendard.variable} font-pretendard`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
