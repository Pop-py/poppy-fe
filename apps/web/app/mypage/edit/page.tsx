'use client';

import { changeNickName } from '@/src/entities';
import { Input, PrimaryButton } from '@/src/shared';
import { toast } from '@/src/shared/hooks/use-toast';
import { ChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLoginStore, useNickNameCheck, useUserInfo } from 'store/login/loginStore';

const Page = () => {
  const router = useRouter();

  const { token } = useLoginStore();

  const [active, setActive] = React.useState(false);
  const userData = useUserInfo();

  const nickname = React.useRef<string>('');

  const handleOnClick = async () => {
    if (token) {
      await changeNickName(userData.userInfoData.userId, nickname.current, token).then(res => {
        if (res && res.code === 200) {
          userData.setUserInfo({ ...userData.userInfoData, userNickname: nickname.current });
          alert(res.message);
          router.push('/mypage');
        } else {
          // 중복된 닉네임
          if (res && res.code === 500) {
            toast({
              variant: 'destructive',
              title: '닉네임 변경 실패',
              description: `${nickname.current}은 이미 사용중인 닉네임입니다.`,
            });
          } else {
            alert('닉네임 변경에 실패했습니다.');
          }
        }
      });
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <div>
      <ChevronHeader title="알림 설정" edit={false} />
      <div className="px-16 mt-16">
        <Input
          label="닉네임"
          defaultText={userData.userInfoData.userNickname}
          onChange={val => {
            nickname.current = val.target.value;
          }}
          setValidName={valid => {
            setActive(valid);
          }}
        />
      </div>
      <div className="fixed bottom-0 w-full p-16 bg-white border-t border-gray-100">
        <PrimaryButton variant={active ? 'enabled' : 'disabled'} onClick={active ? handleOnClick : undefined}>
          저장하기
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Page;
