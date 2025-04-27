import React from 'react';
import MainContentSearchPost from './partials/MainContentSearchPost';

export const metadata = {
  title: 'Search Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentSearchPost />;
};

export default page;
