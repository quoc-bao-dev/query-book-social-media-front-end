import { signify } from 'react-signify';

export type CurUserProfileSignal = {
    user: any;
};

export const sCurUserProfileSignal = signify<CurUserProfileSignal>({
    user: null,
});
