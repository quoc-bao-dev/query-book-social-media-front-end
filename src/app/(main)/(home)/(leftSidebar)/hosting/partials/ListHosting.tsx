'use client';

import { useHostingQuery } from '@/queries/hosting';
import CreateHostingCard from './CreateHostingCard';
import HostingCard from './HostingCard';

const ListHosting = () => {
    const { data } = useHostingQuery();

    const lsHosting = data?.data.data;

    return (
        <div className="grid grid-cols-3 gap-4">
            {lsHosting?.map((_hosting) => (
                <HostingCard
                    key={_hosting.url}
                    subDomain={_hosting.subDomain}
                    url={_hosting.url}
                />
            ))}
            <CreateHostingCard isPro />
        </div>
    );
};

export default ListHosting;
