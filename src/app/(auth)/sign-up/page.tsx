import { Button } from '@/components/common/Button';
import Image from 'next/image';
import RegisterFrom from './partials/RegisterFrom';

const SignUp = () => {
    return (
        <div className="h-screen min-h-screen">
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 h-full bg-card flex justify-center items-center">
                    <div className="w-[450px]">
                        <RegisterFrom />
                    </div>
                </div>
                <div className="col-span-1 h-full bg-gray-100 flex justify-center items-center">
                    <div className="py-[42px]">
                        <div className="text-center py-8">
                            <h1 className="text-3xl font-bold text-neutral-950">
                                Welcome back
                            </h1>
                            <h5 className="text-gray-800 pt-3">
                                To keep connected with us please login <br />{' '}
                                with your personal info
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

                        <div className="text-center py-8">
                            <Button className="w-[200px] h-[40px]">
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
