import React from 'react';
import MainContentSearchPage from './partials/MainContentSearchPage';

export const metadata = {
  title: 'Search Page',
  description: 'Frequently asked questions about our products and services.',
  keywords: ['questions', 'faq', 'help'],
};
const page = () => {
  return <MainContentSearchPage />;
};

export default page;
