import { Button } from '@/components/common/Button';
import Image from 'next/image';
import FormLogin from './partials/FormLogin';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="min-h-screen h-screen">
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-1 h-full hidden md:flex bg-gray-100  justify-center items-center">
                    <div className="py-[42px]">
                        <div className="text-center py-9">
                            <h1 className="text-3xl font-bold text-neutral-950">
                                Hi, Welcome back
                            </h1>
                            <h5 className="text-gray-800 pt-4">
                                More effectively with optimized workflows.
                            </h5>
                        </div>

                        <div className="flex justify-center items-center">
                            <Image
                                src={'/images/login.png'}
                                alt=""
                                className=""
                                width={3000}
                                height={3000}
                            />
                        </div>

                        <div className="text-center py-9">
                            <Link href="/sign-up">
                                <Button className="w-[200px] h-[40px]">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 md:col-span-2 px-4 md:px-0 h-full bg-card flex justify-center items-center">
                    <div className="w-[450px]">
                        <FormLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
