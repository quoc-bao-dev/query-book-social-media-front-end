'use client';
import { useState } from 'react';
import FilterOptions from '../../partials/FilterOptions';
import PostList from './PostList';
import SearchBar from './SearchBar';
import UserList from './UserList';

// Fake dữ liệu user
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/50?img=1',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/50?img=2',
    location: 'New York, NY',
  },
  {
    id: 3,
    name: 'Alice Brown',
    title: 'Project Manager',
    avatar: 'https://i.pravatar.cc/50?img=3',
    location: 'London, UK',
  },
  {
    id: 4,
    name: 'Alice Red',
    title: 'Project Manager',
    avatar: 'https://i.pravatar.cc/50?img=3',
    location: 'Berlin, Germany',
  },
  {
    id: 5,
    name: 'Bob Johnson',
    title: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/50?img=4',
    location: 'Toronto, Canada',
  },
];

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

const MainContentSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [showMorePosts, setShowMorePosts] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // Mặc định sắp xếp theo ngày
  const [order, setOrder] = useState('newest'); // Mặc định mới nhất trước

  // Lọc user theo từ khóa
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sắp xếp user theo bảng chữ cái
  filteredUsers.sort((a, b) => {
    if (sortBy === 'name') {
      return order === 'az'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Lọc post theo từ khóa
  let filteredPosts = postsData.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Nếu không có bài post nào, lấy bài post của user tìm thấy
  if (filteredPosts.length === 0 && filteredUsers.length > 0) {
    const userIds = filteredUsers.map((user) => user.id);
    filteredPosts = postsData.filter((post) => userIds.includes(post.authorId));
  }
  filteredPosts.sort((a, b) => {
    if (sortBy === 'date') {
      return order === 'newest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className='p-6 w-full mx-auto bg-card min-h-screen'>
      {/* Thanh tìm kiếm */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Bộ lọc */}
      <FilterOptions
        onSortChange={(sortBy, order) => {
          setSortBy(sortBy);
          setOrder(order);
        }}
      />

      {/* Danh sách Users */}
      <UserList
        users={filteredUsers}
        showMore={showMoreUsers}
        setShowMore={setShowMoreUsers}
      />

      {/* Danh sách Posts */}
      <PostList
        posts={filteredPosts}
        showMore={showMorePosts}
        setShowMore={setShowMorePosts}
      />
    </div>
  );
};

export default MainContentSearchPage;
