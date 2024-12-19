'use client';

import React from 'react';
import { BackDark } from '@/public';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  edit: boolean;
  onEdit?: () => void;
  editText?: string;
};

export const ChevronHeader = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex px-16 py-12 w-full relative top-0 bg-white z-50">
      <div className="inline-flex w-40">
        <button onClick={() => router.back()}>
          <BackDark />
        </button>
      </div>
      <div className="grow text-center text-h2">{props.title}</div>
      <div className="flex w-40 justify-end items-center text-b1 text-informative">
        {props.edit ? (
          <button onClick={props.onEdit}>
            <span>{props.editText}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
