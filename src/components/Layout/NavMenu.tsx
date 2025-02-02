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
        <div className="relative lg:grid lg:grid-cols-3 gap-4 w-[400px]">
            {menuItems.map((item, index) => (
                <div
                    key={item.id}
                    className="relative cursor-pointer flex justify-center hover:bg-gray-100/80 rounded-lg py-2"
                    onClick={() => setSelected(index)}
                >
                    {item.icon}
                    {selected === index && (
                        <motion.div
                            layoutId="active"
                            className="absolute bottom-0 w-full h-[2.5px] bg-primary-500 rounded-full"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavMenu;
