'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquarePlus, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WelcomeToastModal({
  user,
  t,
}: {
  user: any;
  t: (key: string) => string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);

      const autoMinimize = setTimeout(() => {
        setShowModal(false);
        setMinimized(true);
      }, 5000);

      return () => clearTimeout(autoMinimize);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setMinimized(true);
  };

  const handleOpen = () => {
    setShowModal(true);
    setMinimized(false);
  };

  return (
    <>
      {/* Animated Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='fixed top-20 right-6 z-50 max-w-md w-full bg-card border border-border rounded-xl p-5 shadow-lg text-foreground space-y-3'
          >
            <div className='flex justify-between items-start'>
              <div className='flex-1 space-y-2'>
                <p className='text-base md:text-lg font-semibold'>
                  {t('welcomeback')}{' '}
                  <span className='text-primary'>{user?.fullName}</span> !
                </p>
                <p className='text-sm md:text-base text-muted-foreground'>
                  {t('doyouhavequestion')}
                </p>
                <Link
                  href='/myquestion?mode=ask'
                  className='inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:underline transition'
                >
                  <MessageSquarePlus className='w-5 h-5' />
                  {t('askaquestion')}
                </Link>
              </div>
              <button
                onClick={handleClose}
                className='ml-4 text-muted-foreground hover:text-foreground'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <AnimatePresence>
        {minimized && !showModal && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpen}
            className='fixed top-20 right-6 z-50 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition'
            title='Open welcome message'
          >
            <MessageSquarePlus className='w-5 h-5' />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
