'use client';

import '../styles/globals.css';
import localFont from 'next/font/local';
import { ReactQueryProvider } from './ReactQueryProvider';
import { Toaster } from '@/src/shared/ui/toaster';
import React from 'react';
import { toast } from '@/src/shared/hooks/use-toast';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = React.useRef<StompJs.Client>(null);
  const { token } = useLoginStore();
  const { userInfoData } = useUserInfo();

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';

    const connect = () => {
      console.log('[WebSocket]', 'Connecting...');
      client.current = new StompJs.Client({
        webSocketFactory: () =>
          new SockJS(wsUrl, null, {
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
          }),
        connectHeaders: {
          Authorization: `${token}`,
        },
        reconnectDelay: 10000,
        onConnect: frame => {
          console.log('[WebSocket]', 'Subscribing...');
          console.log('[+] headers >>', frame.headers);
          console.log('[+] body >>', frame.body);
          console.log('[+] command >>', frame.command);

          client.current?.subscribe(`/user/queue/notifications`, function (message) {
            // 알림 수신 시 처리
            const notification = JSON.parse(message.body);
            toast({
              variant: 'informative',
              title: notification.popupStoreName,
              description: notification.message,
            });
          });

          client.current?.subscribe('/topic/notifications', message => {
            const notification = JSON.parse(message.body);
            console.log('[WebSocket]', 'Received notification:', notification);
            // toast({
            //   variant: 'informative',
            //   title: notification.popupStoreName,
            //   description: notification.message,
            // })
          });
        },
        onWebSocketError: error => {
          console.log('[WebSocket]', 'Error with websocket', error);
        },
        onStompError: frame => {
          console.dir('[WebSocket]', `Broker reported error: ${frame.headers.message}`);
          console.dir('[WebSocket]', `Additional details: ${frame}`);
        },
        onDisconnect: frame => {
          console.log('[WebSocket]', 'Disconnected.');
          console.log('[+] headers >>', frame.headers);
          console.log('[+] body >>', frame.body);
          console.log('[+] command >>', frame.command);
        },
      });
      console.log('[WebSocket]', 'Activating...');
      client.current.activate();
    };
    if (token && userInfoData.userId > 0) connect();
  }, [token, userInfoData.userId]);
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
