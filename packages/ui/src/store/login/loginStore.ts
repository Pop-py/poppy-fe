import { create } from 'zustand';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

interface LoginState {
  token: string | undefined;
  refreshToken: string | undefined;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearToken: () => void;
}

export const useLoginStore = create<LoginState>(set => ({
  // 초기 값은 쿠키에서 가져옴
  token: typeof window !== 'undefined' ? (getCookie('token') as string) : undefined,
  refreshToken: typeof window !== 'undefined' ? (getCookie('refreshToken') as string) : undefined,
  // 토큰 저장
  setToken: token => {
    setCookie('token', token, { maxAge: 60 * 30 }); // 30 동안 유효
    set({ token });
  },
  setRefreshToken: refreshToken => {
    setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 7 }); // 7일 동안 유효
    set({ refreshToken });
  },

  // 토큰 삭제
  clearToken: () => {
    deleteCookie('token'); // 쿠키 삭제
    set({ token: undefined });
  },
}));

// user 정보
interface UserInfoData {
  userId: number;
  userEmail: string;
  userNickname?: string;
}

interface UseUserInfoStore {
  userInfoData: UserInfoData; // 단일 객체로 수정
  setUserInfo: (data: UserInfoData) => void; // 데이터 업데이트 함수
}

export const useUserInfo = create<UseUserInfoStore>(set => ({
  userInfoData: { userId: 0, userEmail: '' }, // Initialize with required property
  setUserInfo: data => {
    set({ userInfoData: data });
  },
}));

// nickName check

interface NickNameStore {
  nickNameCheck: boolean;
  setNickNameCheck: (data: boolean) => void;
}

export const useNickNameCheck = create<NickNameStore>(set => ({
  nickNameCheck: false,
  setNickNameCheck: data => set({ nickNameCheck: data }),
}));
