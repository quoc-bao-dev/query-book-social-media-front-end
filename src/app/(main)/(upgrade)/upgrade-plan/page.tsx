import CheckBadgeIcon from '@/components/icons/CheckBadgeIcon';

const page = () => {
    return (
        <div className="w-full h-full">
            {/* container */}
            <div className="w-[1200px] mx-auto">
                {/* options */}
                <div className="grid grid-cols-3 gap-5 mt-16">
                    {/* option card */}
                    <div className="w-full h-full p-6 border border-neutral-200 rounded-lg">
                        <h2 className="font-semibold text-2xl text-neutral-900">
                            Medium
                        </h2>
                        <p className="mt-5 text-sm text-neutral-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odio, illum nihil fuga qui pariatur voluptatem
                            illo, ad neque ipsum ratione laudantium dolore
                            voluptatum labore iste odit
                        </p>
                        <p className="mt-8 font-semibold text-4xl">Free</p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <button className="mt-3 w-full flex items-center justify-center px-3 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg">
                            Current plan
                        </button>
                        <div className="my-5">
                            <hr />
                        </div>
                        <h3 className="text-neutral-900 font-semibold text-xl ">
                            Features
                        </h3>
                        {/* feature */}
                        <div className="mt-3 flex flex-col gap-2">
                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}
                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}

                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}
                        </div>
                        {/* feature */}
                    </div>
                    {/* option card */}

                    {/* option card */}
                    <div className="w-full h-full p-6 border border-neutral-200 rounded-lg">
                        <h2 className="font-semibold text-2xl text-neutral-900">
                            Medium
                        </h2>
                        <p className="mt-5 text-sm text-neutral-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odio, illum nihil fuga qui pariatur voluptatem
                            illo, ad neque ipsum ratione laudantium dolore
                            voluptatum labore iste odit
                        </p>
                        <p className="mt-8 font-semibold text-4xl">Free</p>
                        <p className="mt-2 text-sm text-neutral-500">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <button className="mt-3 w-full flex items-center justify-center px-3 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg">
                            Current plan
                        </button>
                        <div className="my-5">
                            <hr />
                        </div>
                        <h3 className="text-neutral-900 font-semibold text-xl ">
                            Features
                        </h3>
                        {/* feature */}
                        <div className="mt-3 flex flex-col gap-2">
                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}
                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}

                            {/* row */}
                            <div className="flex items-center gap-2 ">
                                <div className="text-info-500">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            {/* row */}
                        </div>
                        {/* feature */}
                    </div>
                    {/* option card */}
                    <div className="w-full h-full bg-gray-300"></div>
                </div>
                {/* options */}
            </div>
            {/* container */}
        </div>
    );
};

export default page;
