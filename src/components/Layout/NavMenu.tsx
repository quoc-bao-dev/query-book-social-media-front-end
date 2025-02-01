import { useState } from 'react';
import HomeIcon from '../icons/HomeIcon';
import CodeIcon from '../icons/CodeIcon';
import BagIcon from '../icons/BagIcon';
import { motion } from 'framer-motion';

const NavMenu = () => {
    const [selected, setSelected] = useState(0);

    const menuItems = [
        {
            id: 0,
            icon: (
                <HomeIcon className="size-8 text-primary-500 stroke-[1.75]" />
            ),
        },
        {
            id: 1,
            icon: (
                <CodeIcon className="size-8 text-primary-500 stroke-[1.75]" />
            ),
        },
        {
            id: 2,
            icon: <BagIcon className="size-8 text-primary-500 stroke-[1.75]" />,
        },
    ];

    return (
        <div className="relative flex gap-20">
            {menuItems.map((item, index) => (
                <div
                    key={item.id}
                    className="relative cursor-pointer flex-1 flex justify-center"
                    onClick={() => setSelected(index)}
                >
                    {item.icon}
                </div>
            ))}
            {/* Thanh underline */}
            <motion.div
                className="absolute bottom-0 h-[2px] bg-primary-500 rounded-full"
                layout
                initial={false}
                animate={{
                    x: `calc(${selected} * (100% + 80px))`, // 100% + gap giữa các mục
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
                style={{
                    width: '50px', // Chiều rộng của thanh underline
                }}
            />
        </div>
    );
};

export default NavMenu;
