import { useState, useRef, useEffect, useCallback } from 'react';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVerticalIcon';
import Flag from '@/components/icons/flag';
import ReportReasonList from './ReportReasonList';

const PostOptionsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setIsReportOpen(false);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAll();
      }
    },
    [closeAll],
  );

  useEffect(() => {
    if (isMenuOpen || isReportOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isReportOpen, handleClickOutside]);

  return (
    <div className='relative'>
      {/* Nút mở menu */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='p-1 rounded-full hover:bg-gray-200 transition-all duration-200'
        aria-haspopup='true'
        aria-expanded={isMenuOpen}
      >
        <EllipsisVerticalIcon />
      </button>

      {/* Menu dropdown */}
      {isMenuOpen && !isReportOpen && (
        <div
          ref={menuRef}
          className='absolute right-0 mt-2 w-64 bg-card shadow-xl rounded-lg p-1 z-50 transition-all duration-200 ease-out transform origin-top-right backdrop-blur-lg'
        >
          <ul className='divide-y divide-gray-200'>
            <li
              className='p-2 flex items-center gap-2 text-neutral-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-all'
              onClick={() => {
                setIsReportOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <Flag />
              <span className='pl-1'>Báo cáo trang cá nhân</span>
            </li>
          </ul>
        </div>
      )}

      {/* Danh sách lý do báo cáo */}
      {isReportOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-card p-6 rounded-lg shadow-xl w-[648px] max-w-full'>
            <ReportReasonList onClose={closeAll} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostOptionsMenu;
