'use client';

import IdentifyIcon from '@/components/icons/IdentifyIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';
import SafeIcon from '@/components/icons/SafeIcon';
import ServerIcon from '@/components/icons/ServerIcon';
import UserIcon from '@/components/icons/UserIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LeftSidebarItem from './LeftSidebarItem';
import Sparkles from '@/components/icons/Sparkles';
import { useTranslations } from 'next-intl';
import ToolIcon from './ToolIcon';

const SideBarLeft = () => {
  const [selected, setSelected] = useState('feeds');
  const pathname = usePathname();

  const t = useTranslations('Sidebar');

  useEffect(() => {
    if (pathname === '/') {
      setSelected('feeds');
    } else if (pathname === '/me') {
      setSelected('profile');
    } else if (pathname === '/friends') {
      setSelected('friend');
    } else if (pathname === '/messages') {
      setSelected('message');
    } else if (pathname.startsWith('/hosting')) {
      setSelected('hosting');
    } else if (pathname.startsWith('/tool')) {
      setSelected('tool');
    }
  }, [pathname]);
  return (
    <>
      <div className='flex flex-col gap-2'>
        <Link href='/'>
          <LeftSidebarItem
            icon={<IdentifyIcon />}
            title={t('feed')}
            selected={selected === 'feeds'}
            onClick={() => setSelected('feeds')}
          />
        </Link>
        <Link href='/me'>
          <LeftSidebarItem
            icon={<UserIcon />}
            title={t('profile')}
            selected={selected === 'profile'}
            onClick={() => setSelected('profile')}
          />
        </Link>

        <Link href='/friends'>
          <LeftSidebarItem
            icon={<UsersIcon />}
            title={t('friend')}
            selected={selected === 'friend'}
            onClick={() => setSelected('friend')}
          />
        </Link>
        <Link href='/messages'>
          <LeftSidebarItem
            icon={<MessageIcon />}
            title={t('chat')}
            selected={selected === 'message'}
            onClick={() => setSelected('message')}
          />
        </Link>
        <Link href='/hosting'>
          <LeftSidebarItem
            icon={<ServerIcon />}
            title={t('hosting')}
            selected={selected === 'hosting'}
            onClick={() => setSelected('hosting')}
          />
        </Link>

        <Link href='/tool/json-to-type'>
          <LeftSidebarItem
            icon={<ToolIcon />}
            title={t('tool')}
            selected={selected === 'tool'}
            onClick={() => setSelected('tool')}
          />
        </Link>
      </div>

      <div className='py-4'>
        <hr className='' />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='font-semibold text-sm text-neutral-800/70 mb-2'>
          {t('resource')}
        </p>
        <LeftSidebarItem
          icon={<InfoIcon />}
          title={t('about')}
          selected={selected === 'about'}
          onClick={() => setSelected('about')}
        />
        <LeftSidebarItem
          icon={<SafeIcon />}
          title={t('privacy')}
          selected={selected === 'privacy'}
          onClick={() => setSelected('privacy')}
        />
        <LeftSidebarItem
          icon={<QuestionIcon />}
          title={t('support')}
          selected={selected === 'support'}
          onClick={() => setSelected('support')}
        />
      </div>

      <div className='py-4 hidden lg:block'>
        <hr className='' />
      </div>
    </>
  );
};

export default SideBarLeft;
