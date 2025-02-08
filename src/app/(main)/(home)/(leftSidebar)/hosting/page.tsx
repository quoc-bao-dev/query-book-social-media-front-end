import ListHosting from './partials/ListHosting';

export const metadata = {
    title: 'Hosting',
    description: 'Welcome to Query Book!',
};

const page = () => {
    return (
        <div className="py-4 h-full">
            <div className="p-4 h-full rounded-md border border-gray-200 bg-neutral-100/50">
                <ListHosting />
            </div>
        </div>
    );
};

export default page;
