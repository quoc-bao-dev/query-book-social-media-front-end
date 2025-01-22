import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import FormOnboarding from './partials/FormOnboarding';
import Bell from '@/components/icons/Bell';
import ProcessItem from './partials/ProcessItem';
import { cn } from '@/lib/utils';

type PageProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata = {
    title: 'Welcome',
    description: 'Welcome to Query Book!',
};

const Page = async ({ searchParams }: PageProps) => {
    const stepProp = await searchParams?.step;
    const step = Number(stepProp);
    return (
        <>
            <div className="h-screen ">
                <div className="mx-auto relative h-full">
                    {!stepProp && (
                        <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                            <h1 className="text-4xl text-center font-semibold  text-neutral-900 truncate">
                                Welcome to Query Book
                            </h1>
                            <Image
                                className="mt-2 w-full"
                                src={'/images/logo_QBook.png'}
                                alt=""
                                width={300}
                                height={300}
                            />
                            <div className="flex justify-center">
                                <Link href={'/welcome?step=1'}>
                                    <Button size="lg">Started</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {!!stepProp && (
                        <div className="grid grid-cols-12 h-full">
                            <div className="col-span-3 h-full bg-gray-200 px-6 py-8 ">
                                <div className="flex flex-col h-full">
                                    <Image
                                        src={'/images/logo_QBook.png'}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                    <div className="pt-10 flex flex-col">
                                        <div className="">
                                            <ProcessItem
                                                selected
                                                title="Step 1"
                                                icon={<Bell />}
                                                description="Welcome to Query Book"
                                            />
                                            <ProcessItem
                                                title="Step 2"
                                                icon={<Bell />}
                                                description="Welcome to Query Book"
                                            />
                                            <ProcessItem
                                                title="Step 3"
                                                icon={<Bell />}
                                                description="Welcome to Query Book"
                                                isEnd
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-auto flex justify-between">
                                        <button className="flex items-center gap-3 text-gray-900 font-semibold">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                                                />
                                            </svg>
                                            <p>Back</p>
                                        </button>
                                        <button className="flex items-center gap-3 text-gray-900 font-semibold">
                                            <p>Sign In</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-9 h-full px-6 py-8 relative">
                                <div className="flex items-center justify-center w-full">
                                    <div className="pt-16">
                                        <div className="flex justify-center">
                                            <Image
                                                src={'/images/logo_QBook.png'}
                                                alt=""
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <h1 className="text-center font-semibold text-3xl">
                                            Welcome to Query Book
                                        </h1>
                                        <div className="pt-10">
                                            <FormOnboarding step={step} />
                                        </div>
                                    </div>

                                    <div className="absolute left-[50%] translate-x-[-50%] bottom-8">
                                        <div className="flex gap-3">
                                            {[1, 2, 3, 4].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={cn(
                                                        'w-[80px] h-3 rounded-full bg-gray-400 transition-all duration-300',
                                                        {
                                                            'bg-primary-500':
                                                                step >=
                                                                index + 1,
                                                        }
                                                    )}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
