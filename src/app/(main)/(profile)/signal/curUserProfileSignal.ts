import { UserProfileResponse } from '@/types/user';
import { signify } from 'react-signify';

export type CurUserProfileSignal = {
    user: UserProfileResponse | null;
};

export const sCurUserProfileSignal = signify<CurUserProfileSignal>({
    user: null,
});


