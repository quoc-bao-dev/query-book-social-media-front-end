'use client';
import Sparkles from '@/components/icons/Sparkles';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const UpgradeAccount = () => {
  const t = useTranslations('Sidebar');
  return (
    <div className='hidden lg:block'>
      <div>
        <div className='p-4 rounded-3xl bg-gradient-to-tl from-neutral-950 to-neutral-800 dark:from-neutral-100 dark:to-neutral-50'>
          <p className='text-xl font-semibold text-white mt-2'>
            {t('updateTitle')}
          </p>
          <p className='text-neutral-400 text-sm mt-2'>
            {t('updateDescription')}
          </p>

          <Link href={'payment'}>
            <button className='mt-4 py-2 px-3 rounded-lg flex gap-2 justify-center bg-primary-500 text-white w-full font-semibold'>
              {t('update')} <Sparkles />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpgradeAccount;
