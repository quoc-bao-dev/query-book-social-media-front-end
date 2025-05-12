'use client';

import { useState } from 'react';
import FilterOptions from '../../partials/FilterOptions';
import CardUser from './CardUser';
import SearchBarUser from './SearchBarUser';

const users = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    username: 'an1234',
    email: 'an.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/50?img=1',
    location: 'Hà Nội, Việt Nam',
    position: 'Frontend Developer',
  },
  {
    id: 2,
    name: 'Trần Thị Bích',
    username: 'bichtran',
    email: 'bich.tran@example.com',
    avatar: 'https://i.pravatar.cc/50?img=2',
    location: 'TP.HCM, Việt Nam',
    position: 'UI/UX Designer',
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    username: 'cuonglv',
    email: 'cuong.le@example.com',
    avatar: 'https://i.pravatar.cc/50?img=3',
    location: 'Đà Nẵng, Việt Nam',
    position: 'Backend Developer',
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    username: 'dungpham',
    email: 'dung.pham@example.com',
    avatar: 'https://i.pravatar.cc/50?img=4',
    location: 'Cần Thơ, Việt Nam',
    position: 'Project Manager',
  },
  {
    id: 5,
    name: 'Vũ Hồng Đạt',
    username: 'datvu',
    email: 'dat.vu@example.com',
    avatar: 'https://i.pravatar.cc/50?img=5',
    location: 'Hà Nội, Việt Nam',
    position: 'Fullstack Developer',
  },
  {
    id: 6,
    name: 'Hoàng Minh Khang',
    username: 'khanghm',
    email: 'khang.hoang@example.com',
    avatar: 'https://i.pravatar.cc/50?img=6',
    location: 'TP.HCM, Việt Nam',
    position: 'Mobile Developer',
  },
  {
    id: 7,
    name: 'Đặng Thu Hiền',
    username: 'hiendung',
    email: 'hien.dang@example.com',
    avatar: 'https://i.pravatar.cc/50?img=7',
    location: 'Hải Phòng, Việt Nam',
    position: 'QA Engineer',
  },
  {
    id: 8,
    name: 'Bùi Văn Nam',
    username: 'nambui',
    email: 'nam.bui@example.com',
    avatar: 'https://i.pravatar.cc/50?img=8',
    location: 'Huế, Việt Nam',
    position: 'DevOps Engineer',
  },
  {
    id: 9,
    name: 'Ngô Thị Lan',
    username: 'lanngo',
    email: 'lan.ngo@example.com',
    avatar: 'https://i.pravatar.cc/50?img=9',
    location: 'Bắc Ninh, Việt Nam',
    position: 'Software Architect',
  },
  {
    id: 10,
    name: 'Dương Văn Tùng',
    username: 'tung1234',
    email: 'tung.duong@example.com',
    avatar: 'https://i.pravatar.cc/50?img=10',
    location: 'Hà Nội, Việt Nam',
    position: 'Data Scientist',
  },
];

const MainContentSearchUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('az');

  // Hàm xử lý sắp xếp
  const handleSortChange = (sortBy: string, order: string) => {
    setSortBy(sortBy);
    setOrder(order);
  };

  // Lọc và sắp xếp danh sách user
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'az'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className='p-6 w-full mx-auto bg-card min-h-screen'>
      <SearchBarUser onSearch={setSearchQuery} />
      <FilterOptions onSortChange={handleSortChange} />
      <CardUser users={filteredUsers} />
    </div>
  );
};

export default MainContentSearchUser;
