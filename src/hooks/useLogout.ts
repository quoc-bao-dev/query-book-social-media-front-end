import axiosClient from '@/httpClient';
import { authActions } from '@/store/authSignal';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
    const router = useRouter();
    return async () => {
        authActions.logout();
        await axiosClient.post('/api/auth/logout', {}, { baseURL: '' });
        router.push('/login');
    };
};
