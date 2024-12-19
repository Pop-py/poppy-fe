import { Input } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <ChevronHeader title="알림 설정" edit={false} />
      <div className="px-16 mt-16">
        <Input label="닉네임" existingName={'가나다'} />
      </div>
    </div>
  );
};

export default Page;
