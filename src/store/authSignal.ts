import { tokenManager } from '@/httpClient';
import { UserProfileResponse } from '@/types/user';
import { signify } from 'react-signify';

type AuthSignal = {
  isLogin: boolean;
  user: UserProfileResponse | null;
};

export const sAuth = signify<AuthSignal>({
  isLogin: false,
  user: null,
});

export const useAuth = sAuth.use;

export const authActions = {
  setUser: (user: UserProfileResponse) => {
    sAuth.set((n) => (n.value.user = user));
  },
  login: (user: UserProfileResponse) => {
    sAuth.set({ isLogin: true, user });
  },
  logout: () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    sAuth.set({ isLogin: false, user: null });
  },
};
