import React from 'react';

export function SheetLayout({ children }: { children: React.ReactNode }) {
  return <div className={`flex flex-col px-4 mx-auto w-full h-full min-w-mobile`}>{children}</div>;
}
