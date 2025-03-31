'use client';
import Drawer from '@/components/common/Drawer';
import SidebarRow from '@/components/common/SidebarRow';
import DeleteIcon from '@/components/icons/DeleteIcon';
import LanguageIcon from '@/components/icons/LanguageIcon';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { signify } from 'react-signify';

type SettingDrawer = {
  isShow: boolean;
};
export const sSettingDrawer = signify<SettingDrawer>({ isShow: false });

export const useSettingDrawer = () => ({
  open: () => sSettingDrawer.set((n) => (n.value.isShow = true)),
  close: () => sSettingDrawer.set((n) => (n.value.isShow = false)),
});

const SettingDrawer = () => {
  const [selected, setSelected] = useState('');
  const { isShow } = sSettingDrawer.use();
  const { close } = useSettingDrawer();

  const { theme, setTheme } = useTheme();

  return (
    <Drawer isOpen={isShow} onOpenChange={close}>
      <div className='w-[320px] h-screen z-50 bg-card'>
        <div className='px-3 py-6 h-full flex flex-col'>
          <div className='flex relative'>
            <h2 className='text-xl font-semibold'>Settings</h2>
            <div className='hover:bg-slate-100 duration-300 absolute top-1 right-1 rounded-full w-8 h-8 flex items-center justify-center'>
              <DeleteIcon className='size-6' />
            </div>
          </div>
          <hr className=' bg-gray-300 my-6' />
          <div className='flex-1 px-3 pt-3  flex flex-col gap-2'>
            <SidebarRow
              icon={<LanguageIcon />}
              title='Cài đặt ngôn ngữ'
              selected={selected === 'Cài đặt ngôn ngữ'}
              onClick={() => {
                setSelected('Cài đặt ngôn ngữ');
              }}
            />

            <SidebarRow
              icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
              title={
                theme === 'light'
                  ? 'Chuyển sang chế độ tối'
                  : 'Chuyển sang chế độ sáng'
              }
              selected={selected === theme}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SettingDrawer;
