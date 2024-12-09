import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} font-pretendard`}>
        <div className="flex flex-col px-4 mx-auto h-screen w-mobile">{children}</div>
      </body>
    </html>
  );
}
