import FormActiveAccount from './partials/FormActiveAccount';
import Image from 'next/image';
import Timer from './partials/Timer';

export const metadata = {
    title: 'Active Account',
    description: 'Active Account',
};

const Page = () => {
    return (
        <main className="h-screen">
            <div className="flex justify-center items-center h-full">
                <div className="w-[300px]">
                    <h1 className="text-2xl text-center font-bold">
                        Active Account
                    </h1>
                    <div className="pt-6 text-gray-700">
                        <p>Active your account, please check your email</p>
                    </div>
                    <div className="pt-6 flex justify-center flex-col gap-5">
                        <Timer />
                        <FormActiveAccount />
                    </div>
                    <div className="pt-6 text-gray-700">
                        <p>
                            If you don&apos;t receive the email check your spam
                            or
                            <span className="text-primary-500"> Resend</span>
                        </p>
                    </div>
                    <div className="flex justify-center p-6">
                        <Image
                            src="/images/logo_QBook.png"
                            alt=""
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;
