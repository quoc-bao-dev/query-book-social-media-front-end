import Image from 'next/image';
import Bar3 from '../icons/Bar3';
import Bell from '../icons/Bell';
import Cog6Tooth from '../icons/Cog6Tooth';
import ChatBubbleOvalLeftEllipsis from '../icons/ChatBubbleOvalLeftEllipsis';
import Avatar from './Avatar';
import NavMenu from './NavMenu';
import SearchHeader from './SearchHeader';

const Header = () => {
    return (
        <>
            <header className="flex items-center bg-card border-b fixed top-0 left-0 w-full z-50 h-[var(--header-height)]">
                <div className="w-full mx-auto px-4 flex justify-between items-center relative">
                    {/* logo & search */}
                    <div className="flex gap-6 items-center">
                        <Image
                            src={'/images/logo_QBook.png'}
                            alt="logo-qbook"
                            className="w-[120px]"
                            width={200}
                            height={0}
                        />
                        <SearchHeader />
                    </div>
                    {/* logo & search */}

                    {/* Nav */}

                    <div className="absolute left-[50%] translate-x-[-50%] hidden lg:flex gap-20">
                        <NavMenu />
                    </div>
                    {/* Nav */}

                    {/* action buttons */}
                    <div className="flex gap-6 items-center justify-center">
                        <div className="hidden md:block">
                            <Cog6Tooth className="size-6 text-primary-500" />
                        </div>

                        <div className="hidden md:block">
                            <ChatBubbleOvalLeftEllipsis className="size-6 text-primary-500" />
                        </div>

                        <div className="hidden md:block">
                            <Bell className="size-6 text-primary-500" />
                        </div>

                        <div className="hidden lg:block">
                            <Avatar />
                        </div>

                        <div className="block md:hidden">
                            <Bar3 className="size-6 text-primary-500" />
                        </div>
                    </div>
                    {/* action buttons */}
                </div>
            </header>
        </>
    );
};

export default Header;
