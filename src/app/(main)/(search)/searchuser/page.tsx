import React from 'react';
import MainContentSearchUser from './partials/MainContentSearchUser';

export const metadata = {
  title: 'Search Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentSearchUser />;
};

export default page;
