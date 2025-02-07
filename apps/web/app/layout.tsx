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
  console.log('token: ', token);

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || '';

    console.log('wsUrl: ', wsUrl);

    const connect = () => {
      console.log('Connecting...');
      client.current = new StompJs.Client({
        webSocketFactory: () =>
          new SockJS(wsUrl, null, {
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
          }),
        connectHeaders: {
          Authorization: `${token}`,
        },
        reconnectDelay: 10000,
        onConnect: () => {
          if (!client.current) return;
          client.current.subscribe(`/user/${userInfoData.userId}/queue/notifications`, function (message) {
            // 알림 수신 시 처리
            const notification = JSON.parse(message.body);
            console.log('Received notification:', notification);
            // toast({
            //   variant: 'informative',
            //   title: '',
            //   description: '',
            // });
            // 여기서 UI 업데이트 등 필요한 처리
          });
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
