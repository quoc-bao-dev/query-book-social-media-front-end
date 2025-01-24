'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const { userId } = useParams();
    return <div>Page {userId}</div>;
};

export default Page;
