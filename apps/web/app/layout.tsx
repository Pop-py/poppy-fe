'use client';

import '../styles/globals.css';
import localFont from 'next/font/local';
import { ReactQueryProvider } from './ReactQueryProvider';
import { Toaster } from '@/src/shared/ui/toaster';
import React from 'react';
import { toast } from '@/src/shared/hooks/use-toast';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLoginStore } from 'store/login/loginStore';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = React.useRef<StompJs.Client>(null);
  const { token } = useLoginStore();
  console.log('token: ', token);

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';

    const connect = () => {
      console.log('Connecting...');
      client.current = new StompJs.Client({
        webSocketFactory: () =>
          new SockJS('https://pop-py.duckdns.org/ws', null, {
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
          }),
        debug: msg => {
          console.log(msg);
        },
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnectDelay: 10000,
        onConnect: () => {
          console.log('connected');
          // subscribeError();
          // subscribe();
        },
        onWebSocketError: error => {
          console.log('Error with websocket', error);
        },
        onStompError: frame => {
          console.dir(`Broker reported error: ${frame.headers.message}`);
          console.dir(`Additional details: ${frame}`);
        },
      });
      console.log('Activating...');
      client.current.activate();
    };
    if (token) connect();
  }, [token]);
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
