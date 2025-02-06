'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getLoginToken, saveFCMToken } from '@/src/widgets/login';

import React from 'react';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, setRefreshToken } = useLoginStore();
  const { setUserInfo, userInfoData } = useUserInfo();
  const code = searchParams.get('code'); // code state

  // 네이버 로그인 이벤트
  const handleButtonClick = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}/oauth2/authorization/naver`;
  };

  // URL의 쿼리 파라미터로부터 토큰 및 사용자 정보 처리
  const { data, error, isLoading } = useQuery(['loginToken', code], () => getLoginToken(code || ''), {
    enabled: !!code, // code가 있을 때만 실행
    onSuccess: res => {
      console.log(res.data.userId);
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setUserInfo({
        userId: res.data.userId,
        userEmail: res.data.userEmail,
        userNickname: res.data.nickname,
      });

      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage('GET_FCMTOKEN');
      }

      router.push('/home');
    },
    onError: (error: any) => {
      console.error('Failed to fetch login token:', error.message);
    },
  });

  React.useEffect(() => {
    // RN에서 웹으로 데이터를 전송했을때 message이벤트가 실행됩니다.
    document.addEventListener('message', e => {
      alert(e.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* header logo */}
      <header className="w-full flex h-[48px] mb-[40px] items-center justify-center">
        <Image width={80} height={24} src="/login/img-login-logo.svg" alt="login-logo" />
      </header>

      {/* market img */}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div>
          <div className="">
            <Image width={240} height={240} src="/login/img-login-1.svg" alt="login-img" />
          </div>

          <p className="text-center text-gray-900 text-h2 mb-[8px]">오늘은 어디서 Pop?</p>
          <p className="text-center text-gray-800 text-b3">
            놓치기 싫은 팝업스토어,
            <br />
            지금 Poppy에서 만나보세요.
          </p>
        </div>

        <div className=" mb-[64px] w-full">
          <div className="w-full px-[16px]">
            <button
              type="button"
              className="w-full h-[48px] rounded-xl bg-naver relative flex items-center justify-center"
              onClick={handleButtonClick}>
              <Image
                className="absolute top-[4px] left-[8px] "
                width={40}
                height={40}
                src="/login/img-login-naver.svg"
                alt="login-img"
              />
              <span className="text-white text-h3">네이버로 시작하기</span>
            </button>
          </div>

          <div className="text-center mt-[20px] text-gray-300 text-c2 ">
            계속 진행함에 따라 POPPY의 &nbsp;
            <Link className="text-gray-500 underline" href="">
              이용약관
            </Link>
            과<br />
            <Link className="text-gray-500 underline" href="">
              개인정보 수집 · 이용
            </Link>
            에 동의합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
