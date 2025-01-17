'use client';

import axiosClient from '@/httpClient';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosClient.get('/users/me');
                console.log(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    return (
        <div className="h-screen bg-primary-500">
            Home page
            <div className="h-6 bg-info-400"></div>
            <div className="h-6 bg-red-400"></div>
            <div className="h-6 bg-green-400"></div>
        </div>
    );
}
