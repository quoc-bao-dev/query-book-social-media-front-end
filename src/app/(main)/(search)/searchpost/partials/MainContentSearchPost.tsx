'use client';

import { useState } from 'react';
import FilterOptions from '../../partials/FilterOptions';
import SearchBarPost from './SearchBarPost';
import CardPost from './CardPost';

const postsData = [
  {
    id: 1,
    content: 'This is the first post!',
    author: 'John Doe',
    authorId: 1,
    authorAvatar: 'https://i.pravatar.cc/50?img=1',
    image:
      'https://imgcdn.zigwheels.vn/medium/gallery/exterior/9/958/honda-hr-v-18808.jpg',
    createdAt: '2024-03-18T08:30:00Z',
  },
  {
    id: 2,
    content: 'Another interesting post!',
    author: 'Jane Smith',
    authorId: 2,
    authorAvatar: 'https://i.pravatar.cc/50?img=2',
    image:
      'https://www.autoshippers.co.uk/blog/wp-content/uploads/bugatti-centodieci.jpg',
    createdAt: '2024-03-17T15:45:00Z',
  },
  {
    id: 3,
    content: 'Learning React with Next.js!',
    author: 'Alice Brown',
    authorId: 3,
    authorAvatar: 'https://i.pravatar.cc/50?img=3',
    image:
      'https://www.kbb.com/wp-content/uploads/2023/01/2024-chevrolet-corvette-e-ray-front-quarter-right.jpg?w=918',
    createdAt: '2024-03-16T10:20:00Z',
  },
  {
    id: 4,
    content: 'Learning React with Angular!',
    author: 'Alice Red',
    authorId: 4,
    authorAvatar: 'https://i.pravatar.cc/50?img=3',
    image:
      'https://www.stratstone.com/-/media/stratstone/blog/2024/top-10-best-supercars-of-2024/mclaren-750s-driving-dynamic-hero-1920x774px.ashx',
    createdAt: '2024-03-16T10:20:00Z',
  },
  {
    id: 5,
    content: 'This is a hidden post that appears when clicking See More.',
    author: 'Michael Scott',
    authorId: 5,
    authorAvatar: 'https://i.pravatar.cc/50?img=5',
    image:
      'https://www.stratstone.com/-/media/stratstone/blog/2024/top-10-best-supercars-of-2024/mclaren-750s-driving-dynamic-hero-1920x774px.ashx',
    createdAt: '2024-03-15T12:00:00Z',
  },
];

const MainContentSearchPost = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // Mặc định sắp xếp theo ngày
  const [order, setOrder] = useState('newest'); // Mặc định mới nhất

  // Xử lý sự kiện thay đổi bộ lọc
  const handleSortChange = (sortBy: string, order: string) => {
    setSortBy(sortBy);
    setOrder(order);
  };

  // Lọc bài viết theo nội dung tìm kiếm
  let filteredPosts = postsData.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sắp xếp bài viết theo tiêu chí được chọn
  filteredPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'date') {
      return order === 'newest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'name') {
      return order === 'az'
        ? a.author.localeCompare(b.author)
        : b.author.localeCompare(a.author);
    }
    return 0;
  });

  return (
    <div className='p-6 w-full mx-auto bg-card min-h-screen'>
      <SearchBarPost onSearch={setSearchQuery} />
      <FilterOptions onSortChange={handleSortChange} />
      <CardPost posts={filteredPosts} />
    </div>
  );
};

export default MainContentSearchPost;
